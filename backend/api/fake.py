# for later use to create fake class instances from model.py and other things
from flask import Blueprint
from faker import Faker

fake = Blueprint('fake', __name__)
faker = Faker()
