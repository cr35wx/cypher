import time
import pprint
from datetime import datetime
from flask import Blueprint, request

from .models import ProspectiveStudentParticipant

# this will probably be refactored later once we know what were
# doing, for now everything can go under the "api" blueprint
api = Blueprint("api", __name__)


@api.route("/api/student", methods=["GET", "POST"])
def student_application():
    if request.method == "POST":
        # parson json or whatever

        # the json data will eventually be transformed to this model class
        # the ... are placeholders
        student = ProspectiveStudentParticipant(
            student_id=...,
            first_name=...,
            last_name=...,
            college_school=...,
            degree_id=...,
            clinic_application_date=datetime.now().strftime('%Y-%m-%d'),
            pre_req_id=...,
            expected_graduation_qtr=...,
            expected_graduation_year=...,
        ) 

        pprint.pprint(request.json)
        return "form data printed to console"

    # just random json that can be fetched from react with the code block under the line below
    return {"date": datetime.now().strftime('%Y-%m-%d')}


#   const [currentTime, setCurrentTime] = useState(0);
#   useEffect(() => {
#     fetch('/api/student').then(res => res.json()).then(data => {
#       setCurrentTime(data.time);
#     });
#   }, []);
