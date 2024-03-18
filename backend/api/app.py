"""
This module serves as the entry point for creating and configuring the 
Cyberclinic. Environment-specific settings are loaded from configuration 
classes defined in config.py.

https://flask.palletsprojects.com/en/3.0.x/patterns/appfactories/
"""

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import DevelopmentConfig, ProductionConfig
from flask_jwt_extended import JWTManager


db = SQLAlchemy()
jwt = JWTManager()


def create_app():
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)

    db.init_app(app)

    jwt.init_app(app)
    from .jwt import setup_jwt_callbacks
    setup_jwt_callbacks(jwt)

    from .admin import create_admin
    from .models import admin_models
    admin = create_admin(db, admin_models)
    admin.init_app(app)

    from .routes import auth, client_form, student_form
    app.register_blueprint(auth)
    app.register_blueprint(student_form)
    app.register_blueprint(client_form)

    from .fake import fake
    app.register_blueprint(fake)

    from .users import user_bp
    app.register_blueprint(user_bp)

    return app
