import click

from api import create_app, db

app = create_app()
# run this app with "flask run" or "flask --app start.py run" instead of "python start.py"
# the default app that is run with "flask run" is the one assigned in the .flaskenv file


@app.cli.command("manage-db")
@click.argument("command", type=click.Choice(["create", "drop", "populate", "test"]))
def manage_db(command):
    """
    create: Create database tables from all classes inheriting db.Model (see models.py).

    drop: Drop all database tables.

    populate: add the data from the diagrams to the database (see populate.py).

    test: used for testing specific database table constraints or validation.

    Usage: flask manage-db [create|drop|populate|test]
    """

    if command == "drop":
        db.drop_all()
        click.echo("Database tables dropped successfully.")
    elif command == "create":
        db.create_all()
        click.echo("Database tables created successfully.")
    elif command == "populate":
        from populate import huge_gross_tuple as required_data
        db.session.add_all(required_data)
        db.session.commit()
        click.echo("Database tables populated successfully.")
    elif command == "test":
        # from api.models import StudentParticipant, DegreeMajor, AcademicUnit
        # cdm = AcademicUnit(college_name="School of Computing")
        # cs = DegreeMajor(degree_name="Computer Science", ug_or_grad="Undergraduate", academic_unit_id=1)
        # student = StudentParticipant(
        #     student_id=1946832,
        #     first_name="John",
        #     last_name="Doe",
        #     college_school="School of Computing",
        #     degree_id=1,
        #     clinic_application_date="2021-01-01",
        #     pre_req_id=1,
        #     expected_graduation_qtr="Spring",
        #     expected_graduation_year=2022,
        # )
        # db.session.add(cdm)
        # db.session.add(cs)
        # db.session.add(student)
        # db.session.commit()
        pass