from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView


def create_admin(db, admin_models):
    """
    Creates and configures an instance of the Flask-Admin interface.
    This function dynamically adds models to the admin interface based on
    the `admin_models` tuple provided. 

    Parameters:
    - db: The SQLAlchemy database instance used by the application. 
    - admin_models: A collection (tuple, list, etc.) of SQLAlchemy model classes that
                    should be added to the admin interface. These models represent
                    the database tables that can be managed through Flask-Admin.

    Returns:
    - admin: An instance of Flask-Admin configured with views for each model
             provided in `admin_models`. This instance can be attached to a Flask
             application to enable the admin interface.

    wow
    """
    admin = Admin(name="Clinic Admin", template_mode="bootstrap3")

    for model in admin_models:
        admin.add_view(ModelView(model, db.session))

    return admin
