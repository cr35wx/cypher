import React, { useState, useEffect } from "react";
import { studentFormImg } from "../../images";

const Name = ({ name, setName }) => {
  return (
    <>
      <label htmlFor="name" className=" text-gray-700 text-sm font-bold">
        Student Name:
      </label>
      <input
        id="name"
        className="mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        type="text"
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="name"
        required
        min={3}
        max={61}
      />
    </>
  );
};

const StudentID = ({ studentID, setStudentID }) => {
  return (
    <>
      <label htmlFor="studentID" className="text-gray-700 text-sm font-bold">
        DePaul Student ID:
      </label>
      <input
        id="studentID"
        className="mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        type="text"
        placeholder="Student ID"
        value={studentID}
        onChange={(e) => setStudentID(e.target.value)}
        minLength={7}
        maxLength={7}
        required
      />
    </>
  );
};

const StudentEmail = ({ studentEmail, setStudentEmail }) => {
  return (
    <>
      <label htmlFor="studentEmail" className="text-gray-700 text-sm font-bold">
        Student Email:
      </label>
      <input
        id="studentEmail"
        className="mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        type="email"
        placeholder="Email"
        value={studentEmail}
        onChange={(e) => setStudentEmail(e.target.value)}
        autoComplete="email"
        required
      />
    </>
  );
};

const School = ({ college, setCollege, setYearStanding }) => {
  const schools = [
    {
      name: "School of Computing",
      majors: [
        "Computer Science",
        "Computer Science + Animation",
        "Computer Science + Economics",
        "Computer Science + Geography",
        "Computing",
        "Cyber-Physical Systems Engineering",
        "Cybersecurity",
        "Data Science",
        "Game Programming",
        "Information Systems",
        "Information Technology",
        "Math and Computer Science",
        "Network Engineering and Security",
      ],
    },
    {
      name: "Driehaus College of Business",
      majors: [
        "Accountancy",
        "Actuarial Science",
        "Business Administration",
        "Business Analytics",
        "Computer Science + Economics (DCOB)",
        "Economic Data Analytics",
        "Economics",
        "Entrepreneurship",
        "Finance",
        "Hospitality Leadership",
        "Management",
        "Management Information Systems",
        "Marketing",
        "Real Estate",
        "Sports Business",
      ],
    },
    {
      name: "College of Law",
      // TODO: ?
      majors: ["Juris Doctor", "Master of Laws", "Master of Legal Studies"],
    },
  ];

  const handleSchoolChange = (e) => {
    const selectedSchool = e.target.value;
    setCollege({ school: selectedSchool, major: "" });

    if (selectedSchool === "College of Law") {
      setYearStanding("Graduate");
    }
  };

  return (
    <>
      <label htmlFor="schools" className="text-gray-700 text-sm font-bold">
        Select School:
      </label>
      <select
        id="schools"
        className="mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        value={college.school}
        onChange={(e) => handleSchoolChange(e)}
      >
        <option value="">Select...</option>
        {schools.map((school) => (
          <option key={school.name} value={school.name}>
            {school.name}
          </option>
        ))}
      </select>
      <br />
      {college.school && (
        <>
          <label htmlFor="majors" className="text-gray-700 text-sm font-bold">
            Select Major:
          </label>
          <select
            id="majors"
            className="mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            value={college.major}
            onChange={(e) => setCollege({ ...college, major: e.target.value })}
          >
            <option value="">Select...</option>
            {schools
              .find((school) => school.name === college.school)
              .majors.map((major) => (
                <option key={major} value={major}>
                  {major}
                </option>
              ))}
          </select>
        </>
      )}
    </>
  );
};

const YearStanding = ({ yearStanding, setYearStanding }) => {
  return (
    <>
      <label htmlFor="yearStanding" className="text-gray-700 text-sm font-bold">
        Year Standing:
      </label>
      <select
        id="yearStanding"
        className="mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        value={yearStanding}
        onChange={(e) => setYearStanding(e.target.value)}
      >
        <option value="">Select...</option>
        <option value="Freshman">Freshman</option>
        <option value="Sophomore">Sophomore</option>
        <option value="Junior">Junior</option>
        <option value="Senior">Senior</option>
        <option value="Graduate">Graduate</option>
      </select>
    </>
  );
};

const GraduationDate = ({ graduationDate, setGraduationState }) => {
  return (
    <>
      <label
        htmlFor="graduationQuarter"
        className="text-gray-700 text-sm font-bold"
      >
        Graduation Quarter:
      </label>
      <div className="flex space-x-4">
        <select
          id="graduationQuarter"
          className="mb-2 block appearance-none w-1/2 bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          value={graduationDate.quarter}
          onChange={(e) =>
            setGraduationState({ ...graduationDate, quarter: e.target.value })
          }
        >
          <option value="">Select</option>
          <option value="Fall">Fall</option>
          <option value="Winter">Winter</option>
          <option value="Spring">Spring</option>
          <option value="Summer">Summer</option>
        </select>

        <label htmlFor="graduationYear" className="hidden"></label>
        <input
          id="graduationYear"
          className="appearance-none block w-1/2 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="number"
          min={new Date().getFullYear()}
          max={new Date().getFullYear() + 4}
          step="1"
          value={graduationDate.year}
          onChange={(e) =>
            setGraduationState({ ...graduationDate, year: e.target.value })
          }
          placeholder="Graduation Year"
        />
      </div>
    </>
  );
};

const PrerequisiteCourses = () => {
  // TODO
  return <></>;
};

export const ProjectType = ({
  projectType,
  setProjectType,
  otherDescription,
  setOtherDescription,
}) => {
  // const [serviceAreas, setServiceAreas] = useState([]);

  // useEffect(() => {
  //   fetch('/api/clinic-service-areas')
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data);
  //       setServiceAreas(data);
  //     })
  //     .catch(error => console.error('Error fetching service areas:', error));
  // }, []);

  return (
    <>
      <label htmlFor="projectType" className="text-gray-700 text-sm font-bold">
        Project Type of Interest:
      </label>
      <select
        id="projectType"
        value={projectType}
        onChange={(e) => setProjectType(e.target.value)}
        className="w-full bg-gray-200 border border-gray-300 p-2 rounded mb-2"
      >
        <option value="">Select...</option>
        {/* {serviceAreas.map(area => (
          <option key={area.id} value={area.name}>{area.name}</option>
        ))} */}
        <option value="General Risk Assessment">General Risk Assessment</option>
        <option value="Audit">Audit</option>
        <option value="Policy Review">Policy Review</option>
        <option value="Other">Other</option>
      </select>

      <br />
      {projectType === "Other" && (
        <>
          <label
            htmlFor="otherDescription"
            className="text-gray-700 text-sm font-bold"
          >
            Briefly Describe Other:
          </label>
          <textarea
            id="otherDescription"
            value={otherDescription}
            maxLength={300}
            onChange={(e) => setOtherDescription(e.target.value)}
            className="w-full bg-gray-200 border border-gray-300 p-2 rounded resize-y"
            style={{ minHeight: "50px", maxHeight: "200px" }}
          />
        </>
      )}
    </>
  );
};

export const ClinicOutreach = ({ howDidYouHear, setHowDidYouHear }) => {
  return (
    <>
      <label
        htmlFor="howDidYouHear"
        className="text-gray-700 text-sm font-bold"
      >
        How did you hear about the clinic?
      </label>
      <textarea
        id="howDidYouHear"
        value={howDidYouHear}
        maxLength={300}
        onChange={(e) => setHowDidYouHear(e.target.value)}
        className="w-full bg-gray-200 border border-gray-300 p-2 rounded"
        style={{ minHeight: "50px", maxHeight: "200px" }}
      />
    </>
  );
};

const ClinicOutreachDate = ({
  heardAboutMonth,
  setHeardAboutMonth,
  heardAboutYear,
  setHeardAboutYear,
}) => {
  return (
    <>
      <label
        htmlFor="heardAboutMonth"
        className="block text-gray-700 text-sm font-bold mt-2"
      >
        When did you first hear about the Clinic? (MM/YYYY)
      </label>
      <input
        id="heardAboutMonth"
        onChange={(e) => setHeardAboutMonth(e.target.value)}
        type="number"
        min={1}
        max={12}
        step="1"
        value={heardAboutMonth}
        className="w-1/2 bg-gray-200 border border-gray-300 p-2 rounded mb-2"
      />

      <label htmlFor="heardAboutYear" className="hidden"></label>
      <input
        id="heardAboutYear"
        onChange={(e) => setHeardAboutYear(e.target.value)}
        type="number"
        min="2020"
        max={new Date().getFullYear()}
        step="1"
        value={heardAboutYear}
        className="w-1/2 bg-gray-200 border border-gray-300 p-2 rounded mb-2"
      />
    </>
  );
};

const Gender = ({ gender, setGender }) => {
  return (
    <>
      <label htmlFor="gender" className="text-gray-700 text-sm font-bold">
        Gender:
      </label>
      <select
        id="gender"
        className="mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">Select...</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
    </>
  );
};

const Ethnicity = ({ ethnicity, setEthnicity }) => {
  return (
    <>
      <label htmlFor="ethnicity" className="text-gray-700 text-sm font-bold">
        Ethnicity:
      </label>
      <select
        id="ethnicity"
        className="mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        value={ethnicity}
        onChange={(e) => setEthnicity(e.target.value)}
      >
        {/* TODO */}
        <option value="">Select...</option>
        <option value="Put ethnicities here">Put ethnicities here</option>
        <option value="Put ethnicities here">Put ethnicities here</option>
        <option value="Put ethnicities here">Put ethnicities here</option>
        <option value="Put ethnicities here">Put ethnicities here</option>
      </select>
    </>
  );
};

export function StudentForm() {
  const [name, setName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [college, setCollege] = useState({ school: "", major: "" });
  const [yearStanding, setYearStanding] = useState("");
  const [graduationDate, setGraduationState] = useState({
    quarter: "",
    year: new Date().getFullYear(),
  });
  const [prerequisiteCourses, setPrerequesiteCourses] = useState([]);
  const [projectType, setProjectType] = useState("");
  const [otherDescription, setOtherDescription] = useState("");
  const [howDidYouHear, setHowDidYouHear] = useState("");
  const [heardAboutMonth, setHeardAboutMonth] = useState(
    new Date().getMonth() + 1,
  );
  const [heardAboutYear, setHeardAboutYear] = useState(
    new Date().getFullYear(),
  );
  const [gender, setGender] = useState("");
  const [ethnicity, setEthnicity] = useState("");

  const [success, setSuccess] = useState(false);

  //  useEffect(() => {
  //    fetch("/student")
  //      .then((response) => response.json())
  //      .then((data) => console.log(data))
  //      .catch((error) => console.error("Error fetching:", error));
  //  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name,
      studentID,
      studentEmail,
      college,
      yearStanding,
      graduationDate,
      prerequisiteCourses,
      projectType,
      otherDescription,
      howDidYouHear,
      whenDidYouHear: {
        heardAboutMonth,
        heardAboutYear,
      },
      gender,
      ethnicity,
    };

    fetch("/student-application", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.errors) {
          console.log(data);
          alert(data.errors);
        } else {
          console.log(data);
          setName("");
          setStudentID("");
          setStudentEmail("");
          setCollege({ school: "", major: "" });
          setYearStanding("");
          setGraduationState({ quarter: "", year: new Date().getFullYear() });
          setPrerequesiteCourses([]);
          setProjectType("");
          setOtherDescription("");
          setHowDidYouHear("");
          setHeardAboutMonth(new Date().getMonth() + 1);
          setHeardAboutYear(new Date().getFullYear());
          setGender("");
          setEthnicity("");
          setSuccess(true);
        }
      });
  };

  return (
    <>
      {success ? (
        <section className="flex flex-col items-center justify-center min-h-screen bg-dodgerblue"
          style={{ backgroundImage: `url(${studentFormImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="bg-white p-8 rounded shadow-md w-96">
            <p className="text-bold text-2xl text-blue-700 text-center">Welcome to Cypher.</p>
          </div>
        </section >
      ) : (
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center"
          style={{ backgroundImage: `url(${studentFormImg})` }}
        >
          <div className="form-container my-auto mt-32 px-4 bg-white shadow-md rounded w-full max-w-md">
            <form onSubmit={handleSubmit} className="my-auto w-full px-8 pt-6 pb-8 mb-4">
              <Name name={name} setName={setName} />
              <StudentID studentID={studentID} setStudentID={setStudentID} />
              <StudentEmail
                studentEmail={studentEmail}
                setStudentEmail={setStudentEmail}
              />
              <School
                college={college}
                setCollege={setCollege}
                setYearStanding={setYearStanding} 
              />
              <YearStanding
                yearStanding={yearStanding}
                setYearStanding={setYearStanding}
              />
              <GraduationDate
                graduationDate={graduationDate}
                setGraduationState={setGraduationState}
              />
              <PrerequisiteCourses
                prerequisiteCourses={prerequisiteCourses}
                setPrerequesiteCourses={setPrerequesiteCourses}
              />
              <ProjectType
                projectType={projectType}
                setProjectType={setProjectType}
                otherDescription={otherDescription}
                setOtherDescription={setOtherDescription}
              />
              <ClinicOutreach
                howDidYouHear={howDidYouHear}
                setHowDidYouHear={setHowDidYouHear}
              />
              <ClinicOutreachDate
                heardAboutMonth={heardAboutMonth}
                setHeardAboutMonth={setHeardAboutMonth}
                heardAboutYear={heardAboutYear}
                setHeardAboutYear={setHeardAboutYear}
              />
              <Gender gender={gender} setGender={setGender} />
              <Ethnicity ethnicity={ethnicity} setEthnicity={setEthnicity} />
              <button
                className="submit-button shadow w-full hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
