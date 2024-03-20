"""
This module defines the auth related routes and helper functions.
"""

import random
from datetime import datetime, timedelta, timezone
from string import ascii_uppercase, digits
from threading import Thread

from emails import send_email
from flask import Blueprint, jsonify, request, session
from flask_jwt_extended import (create_access_token, create_refresh_token,
                                current_user, get_jwt_identity, jwt_required)
from werkzeug.security import check_password_hash, generate_password_hash

from ..app import db
from ..models import ClientOrganization, ResetCode, StudentParticipant

auth = Blueprint("auth", __name__)


@auth.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh_access():
    """
    Returns a new access token for continued access to protected routes.
    """
    identity = get_jwt_identity()

    new_access_token = create_access_token(identity=identity)

    return jsonify({"access_token": new_access_token})


@auth.route("/whoami", methods=["GET"])
@jwt_required()
def whoami():
    """
    Returns the current user's account details.
    """
    email = (
        current_user.email
        if current_user.role == "student"
        else current_user.org_contact_email
    )

    return jsonify(
        {
            "account_details": {
                "email": email,
                "password": current_user.password,
                "role": current_user.role,
            }
        }
    )


@auth.route("/login", methods=["POST"])
def login():
    """
    Authenticates a user and issues access and refresh tokens.
    Validates the credentials and, if successful, returns access
    and refresh JWTs.
    """
    login_data = request.json
    (email, password) = login_data.get("email", ""), login_data.get("pwd", "")

    user = (
        StudentParticipant.query.filter_by(email=email).first()
        or ClientOrganization.query.filter_by(org_contact_email=email).first()
    )

    if not user:
        return {"error": "invalid email"}

    if not check_password_hash(user.password, password):
        return {"error": "invalid password"}

    session["email"] = email

    access_token = create_access_token(identity=email)
    refresh_token = create_refresh_token(identity=email)
    return (
        jsonify(
            {
                "message": "Logged In",
                "tokens": {
                    "access_token": access_token,
                    "refresh_token": refresh_token,
                },
            }
        ),
        200,
    )


@auth.route("/logout")
def logout():
    """
    Logs out a user by clearing their session.
    (Some logout functionality also handled in AuthContext.jsx)
    """
    session.pop("email", None)
    return jsonify({"message": "Logged out successfully"}), 200


@auth.route("/signup", methods=["POST"])
def signup():
    signup_data = request.json
    email, password, role = (
        signup_data.get("email", ""),
        signup_data.get("pwd", ""),
        signup_data.get("role", ""),
    )

    # only checking for students or client dupes
    existing_user = (
        StudentParticipant.query.filter_by(email=email).first()
        or ClientOrganization.query.filter_by(org_contact_email=email).first()
    )

    if existing_user:
        return jsonify({"error": "Email already in use"}), 409

    hashed_password = generate_password_hash(password, method="pbkdf2:sha256")

    # Store the email, password, and role temporarily in session
    session["email"] = email
    session["pass"] = hashed_password
    session["role"] = role

    # Return a success message
    return jsonify({"message": "User data stored successfully"}), 201


@auth.route("/reset-password-request", methods=["GET", "POST"])
def reset_password_request():
    """
    Initiates a password reset request by generating a reset code.

    The request must include the user's email.
    If the email exists, sends a password reset code to the user's email.
    """
    email = request.json.get("email")
    existing_user = (
        StudentParticipant.query.filter_by(email=email).first()
        or ClientOrganization.query.filter_by(org_contact_email=email).first()
    )

    if not existing_user:
        return jsonify({"error": "This email is not valid"}), 204

    code = gen_reset_code()
    session["email"] = email
    session["code"] = code

    subject = "Your Cypher Password Reset Code"
    text = f"Your password reset code is: {code}"
    html = f"""\
    <html>
      <body>
        <p>Your password reset code is:<br>
           <b>{code}</b>
        </p>
        <p>Code will expire in 15 minutes.</p>
      </body>
    </html>
    """

    # replace email with your own for testing
    Thread(target=send_email, args=(email, subject, text, html)).start()

    return jsonify({"message": "Check your email"}), 200


def gen_reset_code():
    """
    Generates a unique password reset code and adds it to the
    database if it does not yet exist.
    """
    while True:
        code = "".join(random.choice(ascii_uppercase + digits) for _ in range(5))
        code_in_db = (
            db.session.query(ResetCode).filter(ResetCode.code == code).one_or_none()
        )
        if code_in_db:
            print(f"{code} already exists in the db.")
            continue
        else:
            c = ResetCode(code=code)
            db.session.add(c)
            db.session.commit()
            return c.code


@auth.route("/verify-reset-code", methods=["GET", "POST"])
def verify_reset_code():
    code = request.json.get("code")
    code_in_db = (
        db.session.query(ResetCode).filter(ResetCode.code == code).one_or_none()
    )

    if code_in_db:
        # Ensure current_time is timezone-aware (UTC)
        current_time = datetime.now(timezone.utc)

        # code will expire after 15 minutes
        code_expiration_time = code_in_db.created_at.astimezone(
            timezone.utc
        ) + timedelta(minutes=15)

        if current_time <= code_expiration_time:
            return jsonify({"success": "Code verified successfully."}), 200
        else:
            db.session.delete(code_in_db)
            db.session.commit()
            return jsonify({"error": "This code has expired."}), 400
    else:
        return jsonify({"error": "This code is not valid."}), 400


@auth.route("/change-password", methods=["POST"])
def change_password():
    """
    Allows a user to change their password using a valid reset code.
    """
    data = request.json
    email = data.get("email")
    new_password = data.get("password")
    reset_code = data.get("code")

    user = (
        StudentParticipant.query.filter_by(email=email).first()
        or ClientOrganization.query.filter_by(org_contact_email=email).first()
    )

    code_in_db = (
        db.session.query(ResetCode).filter(ResetCode.code == reset_code).one_or_none()
    )

    if user and code_in_db:
        # Update the user's password. Ensure you are hashing the password before saving it!
        user.password = generate_password_hash(new_password, method="pbkdf2:sha256")
        db.session.delete(code_in_db)
        db.session.commit()
        return jsonify({"message": "Password successfully changed."}), 200
    else:
        return jsonify({"error": "User not found or reset code is invalid."}), 204


@auth.route("/email-and-reset-code", methods=["GET"])
def get_email_code():
    """This is a hack"""
    email = session.get("email")
    code = session.get("code")
    if email:
        return jsonify({"email": email, "code": code}), 200
    else:
        return jsonify({"error": "Email not found in session"}), 204
