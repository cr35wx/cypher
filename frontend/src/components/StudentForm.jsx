import React, { useState } from "react";

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
        min={2}
        max={30}
      />
    </>
  );
};

const School = ({ college, setCollege }) => {
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
        "Computer Science + Economics",
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

  return (
    <>
      <label htmlFor="schools" className="text-gray-700 text-sm font-bold">
        Select School:
      </label>
      <select
        id="schools"
        className="mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        value={college.school}
        onChange={(e) => setCollege({ school: e.target.value, major: "" })}
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
        Graduation Date:
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
  return (
    <></>
  )
};

export const ProjectType = ({
  projectType,
  setProjectType,
  otherDescription,
  setOtherDescription,
}) => {
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
        <option value="riskAssessment">General Risk Assessment</option>
        <option value="audit">Audit</option>
        <option value="policyReview">Policy Review</option>
        <option value="other">Other</option>
      </select>
      <br />
      {projectType === "other" && (
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
        When did you first hear about the Clinic?
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

export default function StudentForm() {
  const [name, setName] = useState("");
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


  const validateForm = () => {

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the server
    if (college.school === "" || college.major === "") {
      alert("Please select a school and major!");
      return;
    }

    const formData = {
      name,
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

    console.log(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="max-w-xl w-full">
        <Name name={name} setName={setName} />
        <School college={college} setCollege={setCollege} />
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
  );
}
