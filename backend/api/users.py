from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt
from .models import (
    StudentParticipant,
    ClientOrganization,
)
from .schemas import StudentUserSchema, ClientUserSchema

user_bp = Blueprint(
    "users",
    __name__
)

# Defining routes to retrieve student and client users, with authentication required.
# RBAC is utilized here, determining user access based on their role.
@user_bp.route("/student-users", methods=["GET"])
@jwt_required()
def get_student_users():
    claims = get_jwt()

    if claims.get("is_student") == True:
        page = request.args.get('page', default=1, type=int)

        per_page = request.args.get('per_page', default=3, type=int)

        studentUsers = StudentParticipant.query.paginate(
            page = page,
            per_page = per_page
        )

        result = StudentUserSchema().dump(studentUsers, many=True)

        return jsonify({
            "StudentUser": result
        }), 200
    
    return jsonify({"message": "You are not authorized to access this"}), 401

@user_bp.route("/client-users", methods=["GET"])
@jwt_required()
def get_client_users():
    claims = get_jwt()

    if claims.get("is_client") == True:
        page = request.args.get('page', default=1, type=int)

        per_page = request.args.get('per_page', default=3, type=int)

        clientUsers = ClientOrganization.query.paginate(
            page = page,
            per_page = per_page
        )

        result = ClientUserSchema().dump(clientUsers, many=True)

        return jsonify({
            "ClientUsers": result
        }), 200
    
    return jsonify({"message": "You are not authorized to access this"}), 401
