from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from .app import db


# example model class
class User(db.Model):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    username: Mapped[str] = mapped_column(String(30), unique=True)


# unfinished example from cyberclinic-class diagram
class StudentParticipant(db.Model):
    __tablename__ = "student_participants"
    student_id = mapped_column(Integer, primary_key=True)
    first_name = mapped_column(String(30))
    last_name = mapped_column(String(30))
    college_school = mapped_column(String(30))
    degree_id = mapped_column(Integer)
    clinic_application_date = mapped_column(String(10))
    pre_req_id = mapped_column(Integer)
    clinic_training = mapped_column(String(3)) # yes or no
    clinic_training_date = mapped_column(String(10))
    expected_graduation_qtr = mapped_column(String(6))
    expected_graduation_year = mapped_column(Integer)