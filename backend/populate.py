# this is bad
from api.models import (
    Course,
    StudentGroup,
    ClinicServiceArea,
    ClinicJobRole,
    AcademicUnit,
)

csec_390 = Course(course_department="CSEC", course_number="390")
csec_490 = Course(course_department="CSEC", course_number="490")
csec_488 = Course(course_department="CSEC", course_number="488")
is_486 = Course(course_department="IS", course_number="486")
is_487 = Course(course_department="IS", course_number="487")
acc_374 = Course(course_department="ACC", course_number="374")
acc_376 = Course(course_department="ACC", course_number="376")
acc_378 = Course(course_department="ACC", course_number="378")
acc_636 = Course(course_department="ACC", course_number="636")
acc_638 = Course(course_department="ACC", course_number="638")
acc_639 = Course(course_department="ACC", course_number="639")
fin_362 = Course(course_department="FIN", course_number="362")
sev_621 = Course(course_department="SEV", course_number="621")

security_daemons = StudentGroup(group_name="Security Daemons")
wicys = StudentGroup(group_name="Women in Cybersecurity")

gen_risk_assessment = ClinicServiceArea(service_area_name="General Risk Assessment")
policy_review = ClinicServiceArea(service_area_name="Policy Review")
audit = ClinicServiceArea(service_area_name="Audit")

student_participant = ClinicJobRole(role_name="Student Participant")
student_leader = ClinicJobRole(role_name="Student Leader")
admin_assistant = ClinicJobRole(role_name="Admin Assistant")
clinic_director = ClinicJobRole(role_name="Clinic Director")
board_of_directors = ClinicJobRole(role_name="Board of Directors")
public = ClinicJobRole(role_name="Public")

# Participant status

soc = AcademicUnit(
    college_name="School of Computing",
    faculty_contact_fname="John",
    faculty_contact_lname="Doe",
    faculty_contact_email="jdoe@depaul.edu",
)

dcob = AcademicUnit(
    college_name="Driehaus College of Business",
    faculty_contact_fname="John",
    faculty_contact_lname="Doe",
    faculty_contact_email="jdoe@depaul.edu",
)

law = AcademicUnit(
    college_name="College of Law",
    faculty_contact_fname="John",
    faculty_contact_lname="Doe",
    faculty_contact_email="jdoe@depaul.edu",
)

huge_gross_tuple = (
    csec_390,
    csec_490,
    csec_488,
    is_486,
    is_487,
    acc_374,
    acc_376,
    acc_378,
    acc_636,
    acc_638,
    acc_639,
    fin_362,
    sev_621,
    security_daemons,
    wicys,
    gen_risk_assessment,
    policy_review,
    audit,
    student_participant,
    student_leader,
    admin_assistant,
    clinic_director,
    board_of_directors,
    public,
    soc,
    dcob,
    law,
)
