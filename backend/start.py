import click

from api import create_app, db

app = create_app()
# run this app with "flask run" or "flask --app start.py run" instead of "python start.py"
# the default app that is run with "flask run" is the one assigned in the .flaskenv file


@app.cli.command("manage-db")
@click.argument("command", type=click.Choice(["create", "drop", "populate"]))
def manage_db(command):
    """
    Drop all database tables or create tables from all the defined model classes.
    This does not create the database itself, or the table records.

    Usage: flask manage-db [create|drop]
    """

    if command == "drop":
        db.drop_all()
        click.echo("Database tables dropped successfully.")
    elif command == "create":
        db.create_all()
        click.echo("Database tables created successfully.")
    elif command == "populate":
        # i dont know the best way to do this but for now we can just put all the tables that will always be present under here
        from populate import huge_gross_tuple
        for record in huge_gross_tuple:
            db.session.add(record)
        db.session.commit()
        click.echo("Database tables populated successfully.")