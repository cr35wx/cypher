# https://flask.palletsprojects.com/en/3.0.x/config/
import os

from dotenv import load_dotenv

load_dotenv()


class DevelopmentConfig:
    SECRET_KEY = "dev"
    SQLALCHEMY_DATABASE_URI = "mariadb+mariadbconnector://cypher:supersecretpassword@localhost:3306/cyberclinic"


class ProductionConfig:
    # setting FLASK_DEBUG in .flaskenv to 0 may be needed in production if not already set
    SECRET_KEY = os.environ.get("SECRET_KEY")
    SQL_ALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URI")
