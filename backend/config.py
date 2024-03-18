"""
https://flask.palletsprojects.com/en/3.0.x/config/
Defines configuration classes for development and production environments.

load_dotenv() Loads environment variables from a .env file into os.environ
This hides sensitive information.
"""
import os

from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()


class DevelopmentConfig:
    """
    Development settings. The SQLALCHEMY_DATABASE_URI corresponds to the
    user, password, and database created with initUserDb.sql in the root
    directory. Do NOT use this on a production server.
    """

    SECRET_KEY = "dev"
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_DATABASE_URI = "mariadb+mariadbconnector://cypher:supersecretpassword@localhost:3306/cyberclinic"
    JWT_SECRET = "!%^&#!&*$y173rfhehdasjhr3qr2q897rqef"
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1) # minutes=1 for testing
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)    


class ProductionConfig:
    """
    Use a .env file in the backend directory to load secret values into this config.
    Example .env contents:
    SECRET_KEY=your_random_secret_key_here
    DATABASE_URI=your_production_database_uri_here   

    setting FLASK_DEBUG in .flaskenv to 0 may be needed in production if not already set
    """

    SECRET_KEY = os.environ.get("SECRET_KEY")
    SQL_ALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URI")
    JWT_SECRET = os.environ.get("JWT_SECRET")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1) # minutes=1 for testing
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)    

