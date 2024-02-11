from flask import Flask


# https://flask.palletsprojects.com/en/3.0.x/patterns/appfactories/
def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "dev"

    from .routes import api
    app.register_blueprint(api)


    return app