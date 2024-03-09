from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from config import DevelopmentConfig, ProductionConfig
from flask_jwt_extended import JWTManager

import os

db = SQLAlchemy()


# https://flask.palletsprojects.com/en/3.0.x/patterns/appfactories/
def create_app():
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)

    app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET")
    jwt = JWTManager(app)

    db.init_app(app)

    from .admin import create_admin
    from .models import admin_models, StudentParticipant, ClientOrganization
    admin = create_admin(db, admin_models)
    admin.init_app(app)

    from .routes import api
    app.register_blueprint(api)

    from .fake import fake
    app.register_blueprint(fake)

    from .users import user_bp
    app.register_blueprint(user_bp)

    # load user 
    @jwt.user_lookup_loader
    def user_lookup_callback(jwt_headers, jwt_data ):
        identity = jwt_data['sub']

        user = (StudentParticipant.query.filter_by(email=identity).first() or 
            ClientOrganization.query.filter_by(org_contact_email=identity).first())
        
        return user

    # additional claims to jwt (the roles!!)
    @jwt.additional_claims_loader
    def make_additional_claims(identity):
        user = user_lookup_callback(None, {'sub': identity})

        if user:
            if user.role == "student":
                return {"is_student": True}
            elif user.role == "client":
                return {"is_client": True}
        return {"is_client": False, "is_student": False}
        # add admin soon, they will need their our predefined account

    # jwt error handlers
    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_data):
        return jsonify({"message": "Token has expired", "error": "token_expired"}), 401

    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return jsonify({"message": "Signature verification failed", "error": "invalid_token"}), 401
    
    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return jsonify({"message": "Request doesn't contain valid token", "error": "authorization_header"}), 401
    
    return app
