# This file is used to insert fake data into the db based on our model classes.

import click
from flask import Blueprint
from faker import Faker
from .models import StudentParticipant, DegreeMajor, AcademicUnit
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
            .where(DegreeMajor.academic_unit_id == id) .all()
        )

    students = []
    for _ in range(num):
        random_school = faker.random_element(elements=major_ids.keys())
        random_degree_id = faker.random_element(elements=major_ids[random_school])
        student = StudentParticipant(
            student_id=faker.random_number(digits=7),
            first_name=faker.first_name(),
            last_name=faker.last_name(),
            college_school=random_school,
            degree_id=random_degree_id,
            clinic_application_date=faker.date(),
            pre_req_id=faker.random_int(min=1, max=100),
            clinic_training=faker.random_element(elements=("yes", "no")),
            clinic_training_date=faker.date(),
            expected_graduation_qtr=faker.random_element(
                elements=("Winter", "Spring", "Summer", "Fall")
            ),
            expected_graduation_year=faker.random_int(min=2022, max=2026),
        )
        students.append(student)
        db.session.add(student)

    db.session.commit()

    for student in students:
        click.echo(f"Student: {student.first_name} {student.last_name}")
        click.echo(f"  Student College: {student.college_school}")
        click.echo(f"  Student Degree ID: {student.degree_id}")
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
        click.echo("")

    click.echo(f"Added {num} fake students to the db")
