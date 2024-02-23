from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView

# the db instance and a collection of models to be added to the admin interface
def create_admin(db, admin_models):
    admin = Admin(name="Clinic Admin", template_mode="bootstrap3")

    for model in admin_models:
        admin.add_view(ModelView(model, db.session))

    return admin
