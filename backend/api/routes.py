import pprint
from datetime import datetime
from flask import Blueprint, request, jsonify
from sqlalchemy.exc import IntegrityError
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

from .models import (
    DegreeMajor,
    ClientOrgnizationType,
    ClinicServiceArea,
    AcademicUnit,
    StudentParticipant,
    ClientOrganization,
)
from .app import db

# this will probably be refactored later once we know what were
# doing, for now everything can go under the "api" blueprint
api = Blueprint("api", __name__)

MAX_NAME_LENGTH = 30
STUDENT_ID_LENGTH = 7
MAX_TEXT_AREA_LENGTH = 300
MAX_ACCEPTED_REVENUE = 2147483647


######################### STUDENT APPLICATION ###############################
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
    email_error = validate_email(student_data.get("studentEmail", ""))
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
            email_error,
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


@api.route("/student-application", methods=["POST"])
def student_application():
    form_data = request.json
    errors = validate_student_form(form_data)
    if errors:
        print(errors)
        return jsonify({"errors": errors}), 400

    pprint.pprint(form_data)

    email = form_data.get("studentEmail")
    register_details = student_temp_users.get(email)

    # looking at register email and application email to see if they match
    if not register_details:
        return jsonify({"errors": "Email doesn't match registration"}), 400
    
    password = register_details.get("password")
    role = register_details.get("role")

    first_name, *last_names = form_data.get("name").split()
    ug_or_grad = "Graduate" if form_data.get("yearStanding") == "Graduate" else "Undergraduate"

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
        pre_req_id=1,  # still havent gotten to ask about this
        expected_graduation_qtr=form_data.get("graduationDate").get("quarter"),
        expected_graduation_year=form_data.get("graduationDate").get("year"),
        gender=form_data.get("gender"),
        ethnicity=form_data.get("ethnicity"),
        clinic_participant_status="In review",
        role=role
    )

    try:
        db.session.add(student)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return (
            jsonify({
                "errors": "Student with this ID already exists in our records. Please contact faculty."
                }),
            409,
        )

    print(f"A student application has been submitted and added to the database.")
    return jsonify({"message": "Application submitted successfully."}), 201
######################### STUDENT APPLICATION ###############################


######################### CLIENT APPLICATION ###############################
def validate_org_name(org_name):
    if not org_name:
        return "Organization Name is required."


def validate_org_type(org_type):
    if not org_type:
        return "Organization Type is required."


def validate_revenue(revenue):
    if not revenue:
        return "Annual Revenue is required."
    elif not revenue.isdigit():
        return "Annual Revenue must be a number."
    elif int(revenue) > MAX_ACCEPTED_REVENUE:
        return "Annual Revenue cannot exceed the very specific dollar amount of $2,147,483,647. Contact faculty."


def validate_data_description(data_description):
    if not data_description:
        return "Data Description is required."
    elif len(data_description) > MAX_TEXT_AREA_LENGTH:
        return "The description should not exceed 300 characters."


def validate_risk_assessment(recent_risk_assessment):
    if not recent_risk_assessment:
        return "Recent Risk Assessment is required."


def validate_comments(requests_or_comments):
    if len(requests_or_comments) > MAX_TEXT_AREA_LENGTH:
        return "The response for 'How did you hear about us?' should not exceed 300 characters."


def validate_client_form(client_data):
    org_name_error = validate_org_name(client_data.get("orgName", ""))
    org_type_error = validate_org_type(client_data.get("orgType", ""))
    org_contact_name_error = validate_name(client_data.get("contactPersonName", ""))
    org_revenue_error = validate_revenue(client_data.get("annualRevenue", ""))
    data_description_error = validate_data_description(
        client_data.get("dataDescription", "")
    )
    recent_risk_assessment_error = validate_risk_assessment(
        client_data.get("recentRiskAssessment", "")
    )
    project_type_error = validate_project_type(
        client_data.get("projectType", ""), client_data.get("otherDescription", "")
    )
    how_did_you_hear_error = validate_how_did_you_hear(
        client_data.get("howDidYouHear", "")
    )
    comments_error = validate_comments(client_data.get("comments", ""))

    errors = [
        error
        for error in (
            org_name_error,
            org_type_error,
            org_contact_name_error,
            org_revenue_error,
            data_description_error,
            recent_risk_assessment_error,
            project_type_error,
            how_did_you_hear_error,
            comments_error,
        )
        if error
    ]

    return errors


@api.route("/client-application", methods=["POST"])
def client_application():
    form_data = request.json
    errors = validate_client_form(form_data)
    if errors:
        return jsonify({"errors": errors}), 400

    pprint.pprint(form_data)

    email = form_data.get("contactPersonEmail")
    register_details = client_temp_users.get(email)

    # looking at registered email and application email to see if they match
    if not register_details:
        return jsonify({"errors": "Email doesn't match registration"}), 400
    
    password = register_details.get("password")
    role = register_details.get("role")

    contact_fname, *contact_lnames = form_data.get("contactPersonName").split()
    org_type_id = (
        db.session.query(ClientOrgnizationType.org_type_id)
        .where(ClientOrgnizationType.org_type_name == form_data.get("orgType"))
        .first()
    )

    client = ClientOrganization(
        org_name=form_data.get("orgName"),
        org_type_id=org_type_id[0],
        org_contact_fname=contact_fname,
        org_contact_lname=" ".join(contact_lnames),
        org_contact_email=email,
        password=password,
        org_contact_phone=form_data.get("contactPersonPhone"),
        org_website=form_data.get("orgWebsite"),
        org_annual_revenue=form_data.get("annualRevenue"),
        it_employee_count=form_data.get("ITemployeeCount"),
        data_description=form_data.get("dataDescription"),
        recent_risk_assessment=form_data.get("recentRiskAssessment"),
        project_interest=form_data.get("projectType"),
        other_description=form_data.get("otherDescription"),
        how_did_you_hear=form_data.get("howDidYouHear"),
        requests_or_comments=form_data.get("requestsOrComments"),
        role=role
    )

    try:
        db.session.add(client)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return (
            jsonify({
                "errors": "An organization with this ID or Name already exists in our records. Please contact faculty."
                }),
            409,
        )

    print(f"A client application has been submitted and added to the database.")
    return jsonify({"message": "Application submitted successfully."}), 201
######################### CLIENT APPLICATION ###############################

@api.route('/login', methods=['POST'])
def login():
    login_data = request.json
    (email, password) = login_data.get("email", ""), login_data.get("pwd", "")

    user = (StudentParticipant.query.filter_by(email=email).first() or 
            ClientOrganization.query.filter_by(org_contact_email=email).first())

    if not user:
        return {"error": "invalid email"} # placeholder

    if not check_password_hash(user.password, password):
        return {"error": "invalid password"} # placeholder

    # some type of jwt token stuff happens on success
    return jsonify({"message": "Login successful."}), 200

# server will remember email, pwd, role once application is 
# submitted StudentParticpant can be populated and account page will be made
student_temp_users = {}
client_temp_users = {}

@api.route('/signup', methods=['POST'])
def signup():
    signup_data = request.json
    email, password, role = signup_data.get("email", ""), signup_data.get("pwd", ""), signup_data.get("role", "")

    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

    # Store the email, password, and role temporarily
    if role == "student":
        student_temp_users[email] = {"email": email, "password": hashed_password, "role": role}
    elif role == "client":
        client_temp_users[email] = {"email": email, "password": hashed_password, "role": role}

    # Return a success message
    return jsonify({"message": "User data stored successfully"}), 201

@api.route('/check-email', methods=['GET'])
def check_email_for_dupes():
    email = request.headers.get('email')

    # only checking for students or client dupes 
    existing_user = (StudentParticipant.query.filter_by(email=email).first() or 
            ClientOrganization.query.filter_by(org_contact_email=email).first())

    if existing_user:
        return jsonify({"error": "Email already in use"}), 409
    
    return jsonify({"message": "Email available"}), 200

@api.route('/get-role', methods=['GET'])
def get_role():
    email = request.headers.get('email')

    # Query the database for the role associated with the email
    user = (StudentParticipant.query.filter_by(email=email).first() or 
            ClientOrganization.query.filter_by(org_contact_email=email).first())

    if user:
        role = user.role
        return jsonify({"role": role}), 200
    else:
        return jsonify({"error": "User not found"}), 404

# Also known as "Project Type" on the application forms...
@api.route('/api/clinic-service-areas')
def get_service_areas_all():
    service_areas = ClinicServiceArea.query.order_by(ClinicServiceArea.service_area_id).all()
    return jsonify([area.to_json() for area in service_areas])


@api.route("/api/academic-units", methods=["GET"])
def get_academic_units_all():
    academic_units = AcademicUnit.query.order_by(AcademicUnit.academic_unit_id).all()
    return jsonify([unit.to_json() for unit in academic_units])

@api.route("/api/degree-majors", methods=["GET"])
def get_degree_majors_all():
    pass

# @api.route("/api/degree-majors/<int:academic_unit_id>", methods=["GET"])
# def degree_majors(academic_unit_id):
#     distinct_degree_names = (
#         db.session.query(distinct(DegreeMajor.degree_name))
#         .filter(DegreeMajor.academic_unit_id == academic_unit_id)
#         .subquery()
#     )

#     degree_majors = (
#         DegreeMajor.query
#         .filter(DegreeMajor.degree_name.in_(distinct_degree_names))
#         .order_by(DegreeMajor.degree_id)
#         .all()
#     )

#     return jsonify([major.to_json() for major in degree_majors])



    # degree_majors = (
    #     DegreeMajor.query
    #     .filter(DegreeMajor.academic_unit_id == academic_unit_id)
    #     .distinct(DegreeMajor.degree_name)
    #     .order_by(DegreeMajor.degree_id)
    #     .all())

