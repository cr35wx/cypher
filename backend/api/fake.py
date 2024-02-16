# This file is used to insert fake data into the db based on our model classes.

import click
from flask import Blueprint
from faker import Faker
from .models import StudentParticipant
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
    students = []
    for _ in range(num):
        student = StudentParticipant(
            first_name=faker.first_name(),
            last_name=faker.last_name(),
            college_school=faker.company(),
            degree_id=faker.random_int(min=1, max=100),
            clinic_application_date=faker.date(),
            pre_req_id=faker.random_int(min=1, max=100),
            clinic_training=faker.random_element(elements=("yes", "no")),
            clinic_training_date=faker.date(),
            expected_graduation_qtr=faker.random_element(
                elements=("Winter", "Spring", "Summer", "Fall")
            ),
            expected_graduation_year=faker.random_int(min=2022, max=2025),
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
