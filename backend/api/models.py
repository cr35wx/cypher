from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from .app import db


# example model class
# class User(db.Model):
#     __tablename__ = "users"
#     id: Mapped[int] = mapped_column(Integer, primary_key=True)
#     username: Mapped[str] = mapped_column(String(30), unique=True)


class ProspectiveStudentParticipant(db.Model):
    """The model that will be used to store a *prospective* student's application form data,
    a student accepted to work with the clinic will be represented as the "StudentParticipant" model.
    """

    __tablename__ = "prospective_student_participants"
    student_id = mapped_column(Integer, primary_key=True, autoincrement=False)
    first_name = mapped_column(String(30))
    last_name = mapped_column(String(30))
    college_school = mapped_column(String(30))
    degree_id = mapped_column(Integer)
    clinic_application_date = mapped_column(String(10))
    pre_req_id = mapped_column(Integer)
    expected_graduation_qtr = mapped_column(String(6))
    expected_graduation_year = mapped_column(Integer)


# DISCLAIMER: there are no relationships between these tables yet
# like how StudentParticipant's degree_id has to refer to a degree_id in DegreeMajor, 
# then DegreeMajor's academic_unit_id has to refer to an academic_unit_id in AcademicUnit

# the types specified in mapped_column also might not be optimal, theyre just set to get something working

class StudentParticipant(db.Model):
    """The model that will be used to store students that have been accepted."""

    __tablename__ = "student_participants"
    student_id = mapped_column(Integer, primary_key=True, autoincrement=False)
    first_name = mapped_column(String(30))
    last_name = mapped_column(String(30))
    college_school = mapped_column(String(30))
    degree_id = mapped_column(Integer)
    clinic_application_date = mapped_column(String(10))
    pre_req_id = mapped_column(Integer)
    clinic_training = mapped_column(String(3))  # yes or no
    clinic_training_date = mapped_column(String(10))
    expected_graduation_qtr = mapped_column(String(6))
    expected_graduation_year = mapped_column(Integer)


class DegreeMajor(db.Model):
    __tablename__ = "degree_majors"
    degree_id = mapped_column(Integer, primary_key=True)
    degree_name = mapped_column(String(30))
    ug_or_grad = mapped_column(String(13))
    academic_unit_id = mapped_column(Integer)


class AcademicUnit(db.Model):
    __tablename__ = "academic_units"
    academic_unit_id = mapped_column(Integer, primary_key=True)
    college_name = mapped_column(String(30))
    faculty_contact_fname = mapped_column(String(30))
    faculty_contact_lname = mapped_column(String(30))
    faculty_contact_email = mapped_column(String(30))