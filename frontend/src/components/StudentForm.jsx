import React, { useState } from "react";

const Name = ({ name, setName }) => {
  return (
    <input
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
      <label>Select School:</label>
      <select
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
        <div>
          <label>Select Major:</label>
          <select
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
        </div>
      )}
    </>
  );
};

const YearStanding = ({ yearStanding, setYearStanding }) => {
  return (
    <>
      <label>Year Standing:</label>
      <select
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
      <label>Graduation Date:</label>
      <div className="flex space-x-4">
        <select
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

        <input
          className="appearance-none block w-1/2 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
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

const ProjectType = ({
  projectType,
  setProjectType,
  otherDescription,
  setOtherDescription,
}) => {
  return (
    <div>
      <label
        htmlFor="projectType"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Project Type of Interest:
      </label>
      <select
        id="projectType"
        value={projectType}
        onChange={(e) => setProjectType(e.target.value)}
        className="w-full bg-gray-200 border border-gray-300 p-2 rounded"
      >
        <option value="">Select...</option>
        <option value="riskAssessment">General Risk Assessment</option>
        <option value="audit">Audit</option>
        <option value="policyReview">Policy Review</option>
        <option value="other">Other</option>
      </select>

      {projectType === "other" && (
        <div>
          <label
            htmlFor="otherDescription"
            className="block text-gray-700 text-sm font-bold mt-2"
          >
            Briefly Describe Other:
          </label>
          <textarea
            id="otherDescription"
            value={otherDescription}
            onChange={(e) => setOtherDescription(e.target.value)}
            className="w-full bg-gray-200 border border-gray-300 p-2 rounded resize-y"
            style={{ minHeight: "50px", maxHeight: "200px" }}
          />
        </div>
      )}
    </div>
  );
};

const ClinicOutreach = ({
  howDidYouHear,
  setHowDidYouHear,
  heardAboutMonth,
  setHeardAboutMonth,
  heardAboutYear,
  setHeardAboutYear,
}) => {
  return (
    <div>
      <label
        htmlFor="howDidYouHear"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        How did you hear about the clinic?
      </label>
      <textarea
        id="howDidYouHear"
        value={howDidYouHear}
        onChange={(e) => setHowDidYouHear(e.target.value)}
        className="w-full bg-gray-200 border border-gray-300 p-2 rounded"
        style={{ minHeight: "50px", maxHeight: "200px" }}
      />

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
        className="w-1/2 bg-gray-200 border border-gray-300 p-2 rounded"
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
        className="w-1/2 bg-gray-200 border border-gray-300 p-2 rounded"
      />
    </div>
  );
};

const Gender = ({ gender, setGender }) => {
  return (
    <>
      <label>Gender:</label>
      <select
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
      <label>Ethnicity:</label>
      <select
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
    year: "",
  });
  const [prerequisiteCourses, setPrerequesiteCourses] = useState([]); // TODO
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

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   console.log(e)
  //   console.log(name, value)
  //   setFormData({ ...formData, [name]: value });
  // };

  // const handleCheckboxChange = (e) => {
  //   const { name, value } = e.target;
  //   const updatedCourses = formData.prerequisiteCourses.includes(value)
  //     ? formData.prerequisiteCourses.filter((course) => course !== value)
  //     : [...formData.prerequisiteCourses, value];

  //   setFormData({ ...formData, [name]: updatedCourses });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the server
    if (college.school === "" || college.major === "") {
      alert("Please select a school and major!");
      return;
    }
    // construct object of all states, loop through and do validation like above
    // validate: yearStanding is set;

    const formData = {
      name,
      college,
      yearStanding,
      graduationDate,
      prerequisiteCourses,
      projectType,
      otherDescription,
      clinicOutreach: {
        howDidYouHear,
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
      <form onSubmit={handleSubmit}>
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
        <ProjectType
          projectType={projectType}
          setProjectType={setProjectType}
          otherDescription={otherDescription}
          setOtherDescription={setOtherDescription}
        />
        <ClinicOutreach
          howDidYouHear={howDidYouHear}
          setHowDidYouHear={setHowDidYouHear}
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
