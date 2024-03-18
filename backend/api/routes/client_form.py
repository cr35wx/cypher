"""
This module defines the client related routes and validation functions.
"""

import pprint

from flask import Blueprint, jsonify, request, session
from sqlalchemy.exc import IntegrityError

from ..app import db
from ..models import ClientOrganization, ClientOrgnizationType
from .student_form import (validate_how_did_you_hear, validate_name,
                           validate_project_type)

MAX_NAME_LENGTH = 30
MAX_TEXT_AREA_LENGTH = 300
MAX_ACCEPTED_REVENUE = 2147483647

client_form = Blueprint("client-form", __name__)


@client_form.route("/client-application", methods=["POST"])
def client_application():
    email = session.get("email")
    form_data = request.json
    form_errors = validate_client_form(form_data)

    if form_errors:
        return jsonify({"errors": form_errors}), 400

    pprint.pprint(form_data)

    password = session.get("pass")
    role = session.get("role")

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
        role=role,
    )

    try:
        db.session.add(client)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return (
            jsonify(
                {
                    "errors": "An organization with this ID or Name already exists in our records. Please contact faculty."
                }
            ),
            409,
        )

    print(
        f"A client application from {email} has been submitted and added to the database."
    )

    del session["email"]
    del session["pass"]
    del session["role"]

    return jsonify({"message": "Application submitted successfully."}), 201


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
