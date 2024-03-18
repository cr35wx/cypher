"""
A big ugly data file
The entire file is guessing what the auto generated and auto
incremented ids of foreign keys will be but... it works for now
"""

from api.models import (
    Course,
    StudentGroup,
    ClinicServiceArea,
    ClinicJobRole,
    AcademicUnit,
    DegreeMajor,
    ClientOrgnizationType
)

# Schools
soc = AcademicUnit(
    college_name="School of Computing",
    faculty_contact_fname="John",
    faculty_contact_lname="Doe",
    faculty_contact_email="jdoe@depaul.edu",
)

dcob = AcademicUnit(
    college_name="Driehaus College of Business",
    faculty_contact_fname="Jane",
    faculty_contact_lname="Doe",
    faculty_contact_email="jadoe@depaul.edu",
)

law = AcademicUnit(
    college_name="College of Law",
    faculty_contact_fname="Doe",
    faculty_contact_lname="John",
    faculty_contact_email="djohn@depaul.edu",
)


# Majors
cs = DegreeMajor(degree_name="Computer Science", ug_or_grad="Undergraduate", academic_unit_id=1)
cs_g = DegreeMajor(degree_name="Computer Science", ug_or_grad="Graduate", academic_unit_id=1)
cs_animation = DegreeMajor(degree_name="Computer Science + Animation", ug_or_grad="undergraduate", academic_unit_id=1)
cs_animation_g = DegreeMajor(degree_name="Computer Science + Animation", ug_or_grad="Graduate", academic_unit_id=1)
cs_economics = DegreeMajor(degree_name="Computer Science + Economics", ug_or_grad="Undergraduate", academic_unit_id=1)
cs_economics_g = DegreeMajor(degree_name="Computer Science + Economics", ug_or_grad="Graduate", academic_unit_id=1)
cs_geography = DegreeMajor(degree_name="Computer Science + Geography", ug_or_grad="Undergraduate", academic_unit_id=1)
cs_geography_g = DegreeMajor(degree_name="Computer Science + Geography", ug_or_grad="Graduate", academic_unit_id=1)
computing = DegreeMajor(degree_name="Computing", ug_or_grad="Undergraduate", academic_unit_id=1)
computing_g = DegreeMajor(degree_name="Computing", ug_or_grad="Graduate", academic_unit_id=1)
cyber_physicial_systems = DegreeMajor(degree_name="Cyber-Physical Systems Engineering", ug_or_grad="Undergraduate", academic_unit_id=1) # One Hundred And Thirty Five Columns
cyber_physicial_systems_g = DegreeMajor(degree_name="Cyber-Physical Systems Engineering", ug_or_grad="Graduate", academic_unit_id=1)
cybersecurity = DegreeMajor(degree_name="Cybersecurity", ug_or_grad="Undergraduate", academic_unit_id=1)
cybersecurity_g = DegreeMajor(degree_name="Cybersecurity", ug_or_grad="Graduate", academic_unit_id=1)
data_science = DegreeMajor(degree_name="Data Science", ug_or_grad="Undergraduate", academic_unit_id=1)
data_science_g = DegreeMajor(degree_name="Data Science", ug_or_grad="Graduate", academic_unit_id=1)
game_programming = DegreeMajor(degree_name="Game Programming", ug_or_grad="Undergraduate", academic_unit_id=1)
game_programming_g = DegreeMajor(degree_name="Game Programming", ug_or_grad="Graduate", academic_unit_id=1)
information_systems = DegreeMajor(degree_name="Information Systems", ug_or_grad="Undergraduate", academic_unit_id=1)
information_systems_g = DegreeMajor(degree_name="Information Systems", ug_or_grad="Graduate", academic_unit_id=1)
information_technology = DegreeMajor(degree_name="Information Technology", ug_or_grad="Undergraduate", academic_unit_id=1)
information_technology_g = DegreeMajor(degree_name="Information Technology", ug_or_grad="Graduate", academic_unit_id=1)
net_engineering_security = DegreeMajor(degree_name="Network Engineering and Security", ug_or_grad="Undergraduate", academic_unit_id=1)
net_engineering_security_g = DegreeMajor(degree_name="Network Engineering and Security", ug_or_grad="Graduate", academic_unit_id=1)

accountancy = DegreeMajor(degree_name="Accountancy", ug_or_grad="Undergraduate", academic_unit_id=2)
accountancy_g = DegreeMajor(degree_name="Accountancy", ug_or_grad="Graduate", academic_unit_id=2)
actuarial_science = DegreeMajor(degree_name="Actuarial Science", ug_or_grad="Undergraduate", academic_unit_id=2)
actuarial_science_g = DegreeMajor(degree_name="Actuarial Science", ug_or_grad="Graduate", academic_unit_id=2)
business_administration = DegreeMajor(degree_name="Business Administration", ug_or_grad="Undergraduate", academic_unit_id=2)
business_administration_g = DegreeMajor(degree_name="Business Administration", ug_or_grad="Graduate", academic_unit_id=2)
business_analytics = DegreeMajor(degree_name="Business Analytics", ug_or_grad="Undergraduate", academic_unit_id=2)
business_analytics_g = DegreeMajor(degree_name="Business Analytics", ug_or_grad="Graduate", academic_unit_id=2)
economics_cs = DegreeMajor(degree_name="Computer Science + Economics (DCOB)", ug_or_grad="Undergraduate", academic_unit_id=2)
economics_cs_g = DegreeMajor(degree_name="Computer Science + Economics (DCOB)", ug_or_grad="Graduate", academic_unit_id=2)
economic_data_analysis = DegreeMajor(degree_name="Economic Data Analysis", ug_or_grad="Undergraduate", academic_unit_id=2)
economic_data_analysis_g = DegreeMajor(degree_name="Economic Data Analysis", ug_or_grad="Graduate", academic_unit_id=2)
economics = DegreeMajor(degree_name="Economics", ug_or_grad="Undergraduate", academic_unit_id=2)
economics_g = DegreeMajor(degree_name="Economics", ug_or_grad="Graduate", academic_unit_id=2)
entrepreneurship = DegreeMajor(degree_name="Entrepreneurship", ug_or_grad="Undergraduate", academic_unit_id=2)
entrepreneurship_g = DegreeMajor(degree_name="Entrepreneurship", ug_or_grad="Graduate", academic_unit_id=2)
finance = DegreeMajor(degree_name="Finance", ug_or_grad="Undergraduate", academic_unit_id=2)
finance_g = DegreeMajor(degree_name="Finance", ug_or_grad="Graduate", academic_unit_id=2)
hospitality_leadership = DegreeMajor(degree_name="Hospitality Leadership", ug_or_grad="Undergraduate", academic_unit_id=2)
hospitality_leadership_g = DegreeMajor(degree_name="Hospitality Leadership", ug_or_grad="Graduate", academic_unit_id=2)
management = DegreeMajor(degree_name="Management", ug_or_grad="Undergraduate", academic_unit_id=2)
management_g = DegreeMajor(degree_name="Management", ug_or_grad="Graduate", academic_unit_id=2)
management_information_systems = DegreeMajor(degree_name="Management Information Systems", ug_or_grad="Undergraduate", academic_unit_id=2)
management_information_systems_g = DegreeMajor(degree_name="Management Information Systems", ug_or_grad="Graduate", academic_unit_id=2)
marketing = DegreeMajor(degree_name="Marketing", ug_or_grad="Undergraduate", academic_unit_id=2)
marketing_g = DegreeMajor(degree_name="Marketing", ug_or_grad="Graduate", academic_unit_id=2)
real_estate = DegreeMajor(degree_name="Real Estate", ug_or_grad="Undergraduate", academic_unit_id=2)
real_estate_g = DegreeMajor(degree_name="Real Estate", ug_or_grad="Graduate", academic_unit_id=2)
sports_business = DegreeMajor(degree_name="Sports Business", ug_or_grad="Undergraduate", academic_unit_id=2)

juris_doctor = DegreeMajor(degree_name="Juris Doctor", ug_or_grad="Graduate", academic_unit_id=3)
master_of_laws = DegreeMajor(degree_name="Master of Laws", ug_or_grad="Graduate", academic_unit_id=3)
master_of_jurisprudence = DegreeMajor(degree_name="Master of Jurisprudence", ug_or_grad="Graduate", academic_unit_id=3)


# Courses
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

# Groups
security_daemons = StudentGroup(group_name="Security Daemons")
wicys = StudentGroup(group_name="Women in Cybersecurity")

# Service Areas
gen_risk_assessment = ClinicServiceArea(service_area_name="General Risk Assessment")
policy_review = ClinicServiceArea(service_area_name="Policy Review")
audit = ClinicServiceArea(service_area_name="Audit")
other = ClinicServiceArea(service_area_name="Other")

# Job Roles
student_participant = ClinicJobRole(role_name="Student Participant")
student_leader = ClinicJobRole(role_name="Student Leader")
admin_assistant = ClinicJobRole(role_name="Admin Assistant")
clinic_director = ClinicJobRole(role_name="Clinic Director")
board_of_directors = ClinicJobRole(role_name="Board of Directors")
public = ClinicJobRole(role_name="Public")


# Participant status


# Client Organization Types
non_profit = ClientOrgnizationType(org_type_name="Non-Profit")
for_profit = ClientOrgnizationType(org_type_name="For-Profit")


# huge_gross_tuple will be added to the database with the command
# "flask manage-db populate" defined in start.py
huge_gross_tuple = (
    soc,
    dcob,
    law,
    cs,
    cs_g,
    cs_animation,
    cs_animation_g,
    cs_economics,
    cs_economics_g,
    cs_geography,
    cs_geography_g,
    computing,
    computing_g,
    cyber_physicial_systems,
    cyber_physicial_systems_g,
    cybersecurity,
    cybersecurity_g,
    data_science,
    data_science_g,
    game_programming,
    game_programming_g,
    information_systems,
    information_systems_g,
    information_technology,
    information_technology_g,
    net_engineering_security,
    net_engineering_security_g,
    accountancy,
    accountancy_g,
    actuarial_science,
    actuarial_science_g,
    business_administration,
    business_administration_g,
    business_analytics,
    business_analytics_g,
    economics_cs,
    economics_cs_g,
    economic_data_analysis,
    economic_data_analysis_g,
    economics,
    economics_g,
    entrepreneurship,
    entrepreneurship_g,
    finance,
    finance_g,
    hospitality_leadership,
    hospitality_leadership_g,
    management,
    management_g,
    management_information_systems,
    management_information_systems_g,
    marketing,
    marketing_g,
    real_estate,
    real_estate_g,
    sports_business,
    juris_doctor,
    master_of_laws,
    master_of_jurisprudence,
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
    other,
    student_participant,
    student_leader,
    admin_assistant,
    clinic_director,
    board_of_directors,
    public,
    non_profit,
    for_profit
)
