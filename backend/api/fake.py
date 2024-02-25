# This file is used to insert fake data into the db based on our model classes.

import click
from flask import Blueprint
from werkzeug.security import generate_password_hash
from faker import Faker
from .models import StudentParticipant, DegreeMajor, AcademicUnit, ClinicUser
from .app import db

fake = Blueprint("fake", __name__)
faker = Faker()


# "flask fake students <num>" on the command line with your virtual environment activated
@fake.cli.command("students")
@click.argument("num", type=click.IntRange(1, 100))
def students(num):
    """
    Add <num> fake students to the db
    """

    college_schools = db.session.query(
        AcademicUnit.college_name, AcademicUnit.academic_unit_id
    ).all()

    if not college_schools:
        click.echo(
            "A StudentParticipant model needs AcademicUnit and DegreeMajor "
            "records to exist in the db, run 'flask manage-db populate' first."
        )
        return

    major_ids = {}
    for school, id in college_schools:
        major_ids[school] = tuple(
            major[0] for major in db.session.query(DegreeMajor.degree_id)
            .where(DegreeMajor.academic_unit_id == id).all()
        )

    students = []
    for _ in range(num):
        random_school = faker.random_element(elements=major_ids.keys())
        random_degree_id = faker.random_element(elements=major_ids[random_school])
        student = StudentParticipant(
            student_id=faker.random_number(digits=7),
            first_name=faker.first_name(),
            last_name=faker.last_name(),
            email=faker.email(),
            college_school=random_school,
            degree_id=random_degree_id,
            year_standing=faker.random_element(elements=("Freshman", "Sophomore", "Junior", "Senior", "Graduate")),
            project_interest=faker.random_element(elements=("General Risk Assessment", "Audit", "Policy Review", "Other")),
            other_description="", # reading 300 characters of text in the shell is not fun
            how_did_you_hear="", # reading 300 characters of text in the shell is not fun
            heard_about_month=faker.random_int(min=1, max=12),
            heard_about_year=faker.random_int(min=2015, max=2024),
            clinic_application_date=faker.date(),
            pre_req_id=faker.random_int(min=1, max=100),
            clinic_training=faker.random_element(elements=("yes", "no")),
            clinic_training_date=faker.date(),
            expected_graduation_qtr=faker.random_element(
                elements=("Winter", "Spring", "Summer", "Fall")
            ),
            expected_graduation_year=faker.random_int(min=2022, max=2026),
            gender=faker.random_element(elements=("Male", "Female", "Other")),
            ethnicity=faker.random_element(("I don't know", "Prefer not to say")),
            clinic_participant_status=faker.random_element(elements=("In review", "Denied"))
        )
        students.append(student)
        db.session.add(student)

    db.session.commit()

    for student in students:
        click.echo(f"Student: {student.first_name} {student.last_name}")
        click.echo(f"  Student ID: {student.student_id}")
        click.echo(f"  Student Email: {student.email}")
        click.echo(f"  Student College: {student.college_school}")
        click.echo(f"  Student Degree ID: {student.degree_id}")
        click.echo(f"  Student Year Standing: {student.year_standing}")
        click.echo(f"  Student Project Interest: {student.project_interest}")
        click.echo(f"  Student Other Description: {student.other_description}")
        click.echo(f"  Student How Did You Hear: {student.how_did_you_hear}")
        click.echo(f"  Student Heard About Month&Year: {student.heard_about_month}/{student.heard_about_year}")
        click.echo(f"  Student Application Date: {student.clinic_application_date}")
        click.echo(f"  Student Pre-Req ID: {student.pre_req_id}")
        click.echo(f"  Student Clinic Training: {student.clinic_training}")
        click.echo(f"  Student Clinic Training Date: {student.clinic_training_date}")
        click.echo(
            f"  Student Expected Graduation Quarter: {student.expected_graduation_qtr}"
        )
        click.echo(
            f"  Student Expected Graduation Year: {student.expected_graduation_year}"
        )
        click.echo(f"  Student Gender: {student.gender}")
        click.echo(f"  Student Ethnicity: {student.ethnicity}")
        click.echo(
            f"  Student Participant Status: {student.clinic_participant_status}"
        )
        click.echo("")

    click.echo(f"Added {num} fake students to the db")


@fake.cli.command("login")
@click.argument("num", type=click.IntRange(1, 100))
def students(num):
    """
    Add <num> fake "ClinicUser" records to the db (for testing the login page).

    See models.py for why this is different than StudentParticipant.
    """

    logins = []
    for _ in range(num):
        email = faker.email()
        password = faker.password()
        click.echo(f"unhashed password for {email}: {password}")
        login = ClinicUser(
            email=email,
            password=generate_password_hash(password)
        )
        logins.append(login)
        db.session.add(login)

    db.session.commit()

    for login in logins:
        click.echo(f"Clinic User:")
        click.echo(f"  Login Email: {login.email}")
        click.echo(f"  Hashed Login Password: {login.password}")
        click.echo("")

    click.echo(f"Added {num} fake ClinicUser records to the db")