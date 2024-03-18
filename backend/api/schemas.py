"""
Serializing objects to JSON format for better compatibility with JavaScript.
These schemas define the structure of JSON objects representing student and client users.
Each field corresponds to a property of the user object.
"""
from marshmallow import fields, Schema

class StudentUserSchema(Schema):
    student_id = fields.Integer()
    first_name = fields.String()
    last_name = fields.String()
    email = fields.String()
    password = fields.String()
    college_school = fields.String()
    degree_id = fields.Integer()
    year_standing = fields.String()
    project_interest = fields.String()
    other_description = fields.String()
    how_did_you_hear = fields.String()
    heard_about_month = fields.String()
    heard_about_year = fields.String()
    clinic_application_date = fields.String()
    pre_req_id = fields.Integer()
    clinic_training = fields.String()
    clinic_training_date = fields.String()
    expected_graduation_qtr = fields.String()
    expected_graduation_year = fields.Integer()
    gender = fields.String()
    ethnicity = fields.String()
    clinic_participant_status = fields.String()
    role = fields.String()

class ClientUserSchema(Schema):
    org_id = fields.Integer()
    org_name = fields.String()
    org_type_id = fields.String()
    org_contact_fname = fields.String()
    org_contact_lname = fields.String()
    org_contact_email = fields.String()
    org_contact_phone = fields.String()
    password = fields.String()
    org_website = fields.String()
    org_annual_revenue = fields.Integer()
    it_employee_count = fields.Integer()
    data_description = fields.String()
    recent_risk_assessment = fields.String()
    project_interest = fields.String()
    other_description = fields.String()
    how_did_you_hear = fields.String()
    requests_or_comments = fields.String()
    clinic_participant_status = fields.String()
    role = fields.String()