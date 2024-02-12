import sys

from api import User, create_app, db

if len(sys.argv) != 2 or sys.argv[1] not in ["create", "drop"]:
    print("Usage: python script.py [create|drop]")
    sys.exit(1)

command = sys.argv[1]
app = create_app()

# drop all tables in the database or create tables from all the defined model classes (must be imported above)
with app.app_context():
    if command == "drop":
        db.drop_all()
    elif command == "create":
        db.create_all()
