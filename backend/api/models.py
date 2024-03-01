from sqlalchemy import (
    Integer,
    String,
    ForeignKey,
    UniqueConstraint,
    CheckConstraint,
    Enum,
)
from sqlalchemy.orm import Mapped, mapped_column, validates

from .app import db

# Tables not yet implemented: StudentInterest, StudentPrerequesite, ApprovedPrerequesites


class StudentParticipant(db.Model):
    """The model that will be used to store applicants and students participating in the clinic."""

    __tablename__ = "student_participants"
    student_id = mapped_column(Integer, primary_key=True, autoincrement=False)
    first_name = mapped_column(String(30))
    last_name = mapped_column(String(30))
    email = mapped_column(String(30), unique=True)
    password = mapped_column(String(200))  # Will be NULL until application is accepted and a registration email is sent
    college_school = mapped_column(
        String(50), ForeignKey("academic_units.college_name")
    )
    degree_id = mapped_column(Integer, ForeignKey("degree_majors.degree_id"))
    year_standing = mapped_column(
        Enum("Freshman", "Sophomore", "Junior", "Senior", "Graduate")
    )
    project_interest = mapped_column(
        Enum("General Risk Assessment", "Audit", "Policy Review", "Other")
    )
    other_description = mapped_column(String(300))
    how_did_you_hear = mapped_column(String(300))
    heard_about_month = mapped_column(Integer)
    heard_about_year = mapped_column(Integer)
    clinic_application_date = mapped_column(String(10))
    pre_req_id = mapped_column(Integer)  # this will eventually refer to some prereq table
    clinic_training = mapped_column(Enum("yes", "no"))
    clinic_training_date = mapped_column(String(10))  # will possibly need to change to date type
    expected_graduation_qtr = mapped_column(Enum("Fall", "Winter", "Spring", "Summer"))
    expected_graduation_year = mapped_column(Integer)
    gender = mapped_column(String(10))
    ethnicity = mapped_column(String(30))
    clinic_participant_status = mapped_column(Enum("In review", "Accepted", "Denied"))

    role = mapped_column(String(20)) # i added a role columnn for testing, there is clinic job role that has system access ill work with that later


    @validates('email')
    def validate_email(self, key, email):
        if db.session.query(ClientOrganization).filter_by(org_contact_email=email).first():
            raise ValueError('Student email already exists in ClientOrganization table')
        return email


class ClientOrganization(db.Model):
    __tablename__ = "client_organizations"
    org_id = mapped_column(Integer, primary_key=True)
    org_name = mapped_column(String(60), unique=True)
    org_type_id = mapped_column(
        Integer, ForeignKey("client_organization_types.org_type_id")
    )
    org_contact_fname = mapped_column(String(30))
    org_contact_lname = mapped_column(String(30))
    org_contact_email = mapped_column(String(30), unique=True)
    org_contact_phone = mapped_column(String(12))
    pasword = mapped_column(String(200))  # Will be NULL until application is accepted and a registration email is sent
    org_website = mapped_column(String(60))
    org_annual_revenue = mapped_column(Integer)
    it_employee_count = mapped_column(Integer)
    data_description = mapped_column(String(300))
    recent_risk_assessment = mapped_column(
        Enum("Never", "1-2 years ago", "3-5 years ago", ">5 years ago")
    )
    project_interest = mapped_column(
        Enum("General Risk Assessment", "Audit", "Policy Review", "Other")
    )
    other_description = mapped_column(String(300))
    how_did_you_hear = mapped_column(String(300))
    requests_or_comments = mapped_column(String(300))
    clinic_participant_status = mapped_column(Enum("In review", "Accepted", "Denied"))

    projects = db.relationship("ClientProject", backref="client_organization")

    @validates('org_contact_email')
    def validate_email(self, key, email):
        if db.session.query(StudentParticipant).filter_by(email=email).first():
            raise ValueError('Organization Contact Email already exists in StudentParticipant table')
        return email


class DegreeMajor(db.Model):
    __tablename__ = "degree_majors"
    degree_id = mapped_column(Integer, primary_key=True)
    degree_name = mapped_column(String(40))
    ug_or_grad = mapped_column(Enum("Undergraduate", "Graduate"))
    academic_unit_id = mapped_column(
        Integer, ForeignKey("academic_units.academic_unit_id")
    )

    students = db.relationship("StudentParticipant", backref="degree_major")
    __table_args__ = (
        UniqueConstraint("degree_name", "ug_or_grad", name="degree_name_ug_or_grad_uc"),
        # CheckConstraint(ug_or_grad.in_(['Undergraduate', 'Graduate']), name='ug_or_grad_check'),
    )

    def to_json(self):
        return {"id": self.degree_id, "name": self.degree_name}


class AcademicUnit(db.Model):
    __tablename__ = "academic_units"
    academic_unit_id = mapped_column(Integer, primary_key=True)
    college_name = mapped_column(String(50), unique=True)
    faculty_contact_fname = mapped_column(String(30))
    faculty_contact_lname = mapped_column(String(30))
    faculty_contact_email = mapped_column(String(30))

    students = db.relationship("StudentParticipant", backref="academic_unit")
    majors = db.relationship("DegreeMajor", backref="academic_unit")

    def to_json(self):
        return {"id": self.academic_unit_id, "name": self.college_name}


class ParticipantStatus(db.Model):
    __tablename__ = "participant_statuses"
    status_id = mapped_column(Integer, primary_key=True)
    status_date = mapped_column(String(10))
    clinic_participant_contact = mapped_column(String(30))


class Course(db.Model):
    __tablename__ = "courses"
    course_id = mapped_column(Integer, primary_key=True)
    course_department = mapped_column(String(30))
    course_number = mapped_column(String(30))

    __table_args__ = (
        UniqueConstraint(
            "course_department",
            "course_number",
            name="course_department_course_number_uc",
        ),
    )

    def __repr__(self):
        return f"{self.course_department}-{self.course_number}"


class StudentGroup(db.Model):
    __tablename__ = "student_groups"
    group_id = mapped_column(Integer, primary_key=True)
    group_name = mapped_column(String(30), unique=True)


class ClinicServiceArea(db.Model):
    __tablename__ = "clinic_service_areas"
    service_area_id = mapped_column(Integer, primary_key=True)
    service_area_name = mapped_column(String(30), unique=True)

    projects = db.relationship("ClientProject", backref="clinic_service_area")

    def to_json(self):
        return {"id": self.service_area_id, "name": self.service_area_name}


class ClinicJobRole(db.Model):
    __tablename__ = "clinic_job_roles"
    role_id = mapped_column(Integer, primary_key=True)
    role_name = mapped_column(String(30), unique=True)
    system_access = mapped_column(Integer)


class ClientOrgnizationType(db.Model):
    __tablename__ = "client_organization_types"
    org_type_id = mapped_column(Integer, primary_key=True)
    org_type_name = mapped_column(String(30), unique=True)

    organizations = db.relationship("ClientOrganization", backref="org_type")


class ClientProject(db.Model):
    __tablename__ = "client_projects"
    project_id = mapped_column(Integer, primary_key=True)
    org_id = mapped_column(Integer, ForeignKey("client_organizations.org_id"))
    project_name = mapped_column(String(60))
    project_start_date = mapped_column(String(10))
    project_end_date = mapped_column(String(10))
    clinic_service_area_id = mapped_column(
        Integer, ForeignKey("clinic_service_areas.service_area_id")
    )
    student_team_id = mapped_column(Integer)  # ????


# any model added to this tuple will be added to the admin interface
admin_models = (
    StudentParticipant,
    DegreeMajor,
    AcademicUnit,
    ParticipantStatus,
    Course,
    StudentGroup,
    ClinicServiceArea,
    ClinicJobRole,
    ClientOrganization,
    ClientOrgnizationType,
    ClientProject,
)
