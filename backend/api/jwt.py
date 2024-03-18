from flask import jsonify
from .models import StudentParticipant, ClientOrganization

def setup_jwt_callbacks(jwt):
    """
    Sets up JWT callbacks for user lookup, additional claims, and error handling.

    Parameters:
    - jwt: JWTManager instance for handling JWT-related operations.

    Callbacks:
    - user_lookup_callback: Looks up user based on JWT identity.
    - make_additional_claims: Adds additional claims to JWT based on user role.
    - expired_token_callback: Handles expired token errors.
    - invalid_token_callback: Handles invalid token errors.
    - missing_token_callback: Handles missing token errors.
    """
    @jwt.user_lookup_loader
    def user_lookup_callback(jwt_headers, jwt_data ):
        identity = jwt_data['sub']

        user = (StudentParticipant.query.filter_by(email=identity).first() or 
            ClientOrganization.query.filter_by(org_contact_email=identity).first())
        
        return user

    @jwt.additional_claims_loader
    def make_additional_claims(identity):
        user = user_lookup_callback(None, {'sub': identity})

        if user:
            if user.role == "student":
                return {"is_student": True}
            elif user.role == "client":
                return {"is_client": True}
        return {"is_client": False, "is_student": False}

    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_data):
        return jsonify({"message": "Token has expired", "error": "token_expired"}), 401

    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return jsonify({"message": "Signature verification failed", "error": "invalid_token"}), 401
    
    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return jsonify({"message": "Request doesn't contain valid token", "error": "authorization_header"}), 401
