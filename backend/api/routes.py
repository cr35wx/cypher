import time

from flask import Blueprint, request

# this will probably be refactored later once we know what were
# doing, for now everything can go under the "api" blueprint
api = Blueprint("api", __name__)


@api.route("/api/student", methods=["GET", "POST"])
def hello():
    if request.method == "POST":
        import pprint

        pprint.pprint(request.json)
        return "form data printed to console"

    # just random json that can be fetched from react with the code block under the line below
    return {"time": time.strftime("%Y-%m-%d %H:%M:%S")}


#   const [currentTime, setCurrentTime] = useState(0);
#   useEffect(() => {
#     fetch('/api/student').then(res => res.json()).then(data => {
#       setCurrentTime(data.time);
#     });
#   }, []);
