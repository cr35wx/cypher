from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import DevelopmentConfig, ProductionConfig

db = SQLAlchemy()


# https://flask.palletsprojects.com/en/3.0.x/patterns/appfactories/
def create_app():
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)

    db.init_app(app)

    from .admin import create_admin
    from .models import admin_models
    admin = create_admin(db, admin_models)
    admin.init_app(app)

    from .routes import api
    app.register_blueprint(api)

    from .fake import fake
    app.register_blueprint(fake)

    return app
