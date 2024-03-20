"""
This module defines the student related routes and validation functions.
"""

import pprint
from datetime import datetime

from flask import Blueprint, jsonify, request, session
from sqlalchemy.exc import IntegrityError

from ..app import db
from ..models import DegreeMajor, StudentParticipant, Course

STUDENT_ID_LENGTH = 7
MAX_NAME_LENGTH = 30
MAX_TEXT_AREA_LENGTH = 300

student_form = Blueprint("student-form", __name__)


@student_form.route("/student-application", methods=["POST"])
def student_application():
    email = session.get("email")
    form_data = request.json
    email_errors = validate_email(email)
    form_errors = validate_student_form(form_data)

    if email_errors or form_errors:
        errors = email_errors if email_errors else form_errors
        print(errors)
        return jsonify({"errors": errors}), 400

    pprint.pprint(form_data)

    password = session.get("pass")
    role = session.get("role")

    first_name, *last_names = form_data.get("name").split()
    ug_or_grad = (
        "Graduate" if form_data.get("yearStanding") == "Graduate" else "Undergraduate"
    )

    student_degree_id = (
        db.session.query(DegreeMajor.degree_id)
        .filter(DegreeMajor.degree_name == form_data.get("college").get("major"))
        .filter(DegreeMajor.ug_or_grad == ug_or_grad)
        .first()
    )

    student = StudentParticipant(  # man....
        student_id=form_data.get("studentID"),
        first_name=first_name,
        last_name=" ".join(last_names),
        email=email,
        password=password,
        college_school=form_data.get("college").get("school"),
        degree_id=student_degree_id[0],
        year_standing=form_data.get("yearStanding"),
        project_interest=form_data.get("projectType"),
        other_description=form_data.get("otherDescription"),
        heard_about_month=form_data.get("whenDidYouHear").get("heardAboutMonth"),
        heard_about_year=form_data.get("whenDidYouHear").get("heardAboutYear"),
        how_did_you_hear=form_data.get("howDidYouHear"),
        clinic_application_date=datetime.now().strftime("%Y-%m-%d"),
        pre_req_id=1,  # not implemented
        expected_graduation_qtr=form_data.get("graduationDate").get("quarter"),
        expected_graduation_year=form_data.get("graduationDate").get("year"),
        gender=form_data.get("gender"),
        ethnicity=form_data.get("ethnicity"),
        clinic_participant_status="In review",
        role=role,
    )

    try:
        db.session.add(student)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return (
            jsonify(
                {
                    "errors": "Student with this ID already exists in our records. Please contact faculty."
                }
            ),
            409,
        )

    print(
        f"A student application from {email} has been submitted and added to the database."
    )

    del session["email"]
    del session["pass"]
    del session["role"]

    return jsonify({"message": "Application submitted successfully."}), 201


@student_form.route('/api/courses')
def get_courses_all():
    courses = Course.query.order_by(Course.course_id).all()
    return jsonify([f"{course.course_department}-{course.course_number}" for course in courses])


def validate_name(name):
    if not name:
        return "Name is required."

    # people can have multiple last names, a middle name they include, or something like "III"
    # these are all put into an array of last names
    first_name, *last_names = name.split(" ") if name else ("", "")

    if not last_names:
        return "Both first and last names are required."
    if not first_name.isalpha():
        return "Invalid name. Both first and last names should contain only letters. Remove '.' from suffixes"
    for name in last_names:
        if not name.isalpha():
            return "Invalid name. Both first and last names should contain only letters. Remove '.' from suffixes"

    if len(first_name) > MAX_NAME_LENGTH or len(" ".join(last_names)) > MAX_NAME_LENGTH:
        return "First and last names cannot exceed 30 characters each."


def validate_student_id(student_id):
    if not student_id:
        return "Student ID is required."
    if not (student_id.isdigit() and len(student_id) == STUDENT_ID_LENGTH):
        return "Student ID must be a 7-digit number."


def validate_email(email):
    if "@depaul.edu" not in email:
        return "Please use your DePaul email address. You may need to reregister if your registration email is not the same."


def validate_college(college):
    school = college.get("school", "")
    major = college.get("major", "")
    if not school or not major:
        return "Both school and major must be selected."


def validate_year_standing(school, year_standing):
    if not year_standing:
        return "Year Standing must be selected."
    if school == "College of Law" and year_standing != "Graduate":
        return "Year Standing must be Graduate for College of Law students."


def validate_graduation_qtr(graduation_qtr):
    if not graduation_qtr:
        return "Graduation Quarter must be selected."


def validate_project_type(project_type, other_description):
    if not project_type:
        return "Project Type must be selected."
    elif project_type == "Other":
        if not other_description:
            return "Please provide a description of your project type."
        elif len(other_description) > MAX_TEXT_AREA_LENGTH:
            return "The description should not exceed 300 characters."


def validate_how_did_you_hear(how_did_you_hear):
    if len(how_did_you_hear) > MAX_TEXT_AREA_LENGTH:
        return "The response for 'How did you hear about us?' should not exceed 300 characters."


def validate_student_form(student_data):
    name_error = validate_name(student_data.get("name", ""))
    student_id_error = validate_student_id(student_data.get("studentID", ""))
    college_error = validate_college(student_data.get("college", {}))
    year_standing_error = validate_year_standing(
        student_data.get("college").get("school"), student_data.get("yearStanding", "")
    )
    graduation_qtr_error = validate_graduation_qtr(
        student_data.get("graduationDate", {}).get("quarter", "")
    )
    project_type_error = validate_project_type(
        student_data.get("projectType", ""), student_data.get("otherDescription", "")
    )
    how_did_you_hear_error = validate_how_did_you_hear(
        student_data.get("howDidYouHear", "")
    )

    errors = [
        error
        for error in (
            name_error,
            student_id_error,
            college_error,
            year_standing_error,
            graduation_qtr_error,
            project_type_error,
            how_did_you_hear_error,
        )
        if error
    ]

    return errors
