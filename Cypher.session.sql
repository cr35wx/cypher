SHOW tables; 

INSERT INTO student_participants (
    student_id,
    first_name,
    last_name,
    college_school,
    degree_id,
    clinic_application_date,
    pre_req_id,
    clinic_training,
    clinic_training_date,
    expected_graduation_qtr,
    expected_graduation_year,
    clinic_participant_status
  )

VALUES (
    @student_id,
    'first_name:varchar',
    'last_name:varchar',
    'college_school:varchar',
    @degree_id,
    'clinic_application_date:varchar',
    @pre_req_id,
    'clinic_training:enum',
    'clinic_training_date:varchar',
    'expected_graduation_qtr:enum',
    @expected_graduation_year,
    'clinic_participant_status:enum'
  );

