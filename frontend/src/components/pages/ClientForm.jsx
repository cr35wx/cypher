import React, { useState } from "react";
import { ProjectType, ClinicOutreach } from "./StudentForm";

const OrgName = ({ orgName, setOrgName }) => {
  return (
    <>
      <label htmlFor="orgName" className=" text-gray-700 text-sm font-bold">
        Organization Name:
      </label>
      <input
        id="orgName"
        className="mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        type="text"
        placeholder="Organization Name"
        value={orgName}
        onChange={(e) => setOrgName(e.target.value)}
        required
        min={2}
        max={30}
      />
    </>
  );
};

const OrgType = ({ orgType, setOrgType }) => {
  return (
    <>
      <label htmlFor="orgType" className="text-gray-700 text-sm font-bold">
        Organization Type:
      </label>
      <select
        id="orgType"
        className="mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        value={orgType}
        onChange={(e) => setOrgType(e.target.value)}
      >
        <option value="">Select...</option>
        <option value="Non-profit">Non-profit</option>
        <option value="For-profit">For-profit</option>
      </select>
    </>
  );
};

const ContactPersonName = ({ contactPersonName, setContactPersonName }) => {
  return (
    <>
      <label
        htmlFor="contactPersonName"
        className=" text-gray-700 text-sm font-bold"
      >
        Contact Person's Full Name:
      </label>
      <input
        id="contactPersonName"
        className="mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        type="text"
        placeholder="Full Name"
        value={contactPersonName}
        onChange={(e) => setContactPersonName(e.target.value)}
        autoComplete="name"
        required
        min={2}
        max={30}
      />
    </>
  );
};

const ContactPersonEmail = ({ contactPersonEmail, setContactPersonEmail }) => {
  return (
    <>
      <label
        htmlFor="contactPersonEmail"
        className="text-gray-700 text-sm font-bold"
      >
        Contact Person's Email:
      </label>
      <input
        id="contactPersonEmail"
        className="mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        type="email"
        placeholder="Email"
        value={contactPersonEmail}
        onChange={(e) => setContactPersonEmail(e.target.value)}
        autoComplete="email"
        required
      />
    </>
  );
};

const ContactPersonPhone = ({ contactPersonPhone, setContactPersonPhone }) => {
  return (
    <>
      <label
        htmlFor="contactPersonPhone"
        className="text-gray-700 text-sm font-bold"
      >
        Contact Person's Phone Number (XXX-YYY-ZZZZ):
      </label>
      <input
        id="contactPersonPhone"
        className="mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        type="tel"
        placeholder="Phone Number"
        value={contactPersonPhone}
        onChange={(e) => setContactPersonPhone(e.target.value)}
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        required
      />
    </>
  );
};

const OrgWebsite = ({ orgWebsite, setOrgWebsite }) => {
  return (
    <>
      <label htmlFor="orgWebsite" className="text-gray-700 text-sm font-bold">
        Organization Website URL:
      </label>
      <input
        id="orgWebsite"
        className="mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        type="url"
        placeholder="https://example.com"
        value={orgWebsite}
        onChange={(e) => setOrgWebsite(e.target.value)}
        autoComplete="url"
        pattern="(https?://).*"
        size={30}
        required
      />
    </>
  );
};

const AnnualRevenue = ({ annualRevenue, setAnnualRevenue }) => {
  return (
    <>
      <label
        htmlFor="annualRevenue"
        className="text-gray-700 text-sm font-bold"
      >
        Annual Revenue (as reported on IRS tax form):
      </label>
      <input
        id="annualRevenue"
        className="mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        type="text"
        placeholder="$"
        onChange={(e) => setAnnualRevenue(e.target.value)}
      />
    </>
  );
};

const ITEmployeeCount = ({ ITemployeeCount, setITemployeeCount }) => {
  return (
    <>
      <label
        htmlFor="ITemployeeCount"
        className="text-gray-700 text-sm font-bold"
      >
        Number of IT Staff:
      </label>
      <input
        id="ITemployeeCount"
        className="mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        type="number"
        placeholder="Number of IT Staff"
        onChange={(e) => setITemployeeCount(e.target.value)}
        min={0}
        step={1}
      />
    </>
  );
};

const DataDescription = ({ dataDescription, setDataDescription }) => {
  return (
    <>
      <label
        htmlFor="dataDescription"
        className="text-gray-700 text-sm font-bold"
      >
        Brief description of the type of sensitive data maintained:
      </label>
      <textarea
        id="dataDescription"
        value={dataDescription}
        maxLength={300}
        onChange={(e) => setDataDescription(e.target.value)}
        className="w-full bg-gray-200 border border-gray-300 p-2 rounded"
        style={{ minHeight: "50px", maxHeight: "200px" }}
      />
    </>
  );
};

const RecentRiskAssessment = ({
  recentRiskAssessment,
  setRecentRiskAssessment,
}) => {
  return (
    <>
      <label
        htmlFor="recentRiskAssessment"
        className="text-gray-700 text-sm font-bold"
      >
        Has your organization had a security risk assessment?
      </label>
      <select
        id="recentRiskAssessment"
        className="mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        value={recentRiskAssessment}
        onChange={(e) => setRecentRiskAssessment(e.target.value)}
      >
        <option value="">Select...</option>
        <option value="never">Never</option>
        <option value="1-2 years ago">1-2 years ago</option>
        <option value="3-5 years ago">3-5 years ago</option>
        <option value="> 5 years ago">&gt; 5 years ago</option>
      </select>
    </>
  );
};

const RequestsOrComments = ({ requestsOrComments, setRequestsOrComments }) => {
  return (
    <>
      <label
        htmlFor="requestsOrComments"
        className="text-gray-700 text-sm font-bold"
      >
        Any other requests or comments we should know about?
      </label>
      <textarea
        id="requestsOrComments"
        value={requestsOrComments}
        maxLength={600}
        onChange={(e) => setRequestsOrComments(e.target.value)}
        className="w-full bg-gray-200 border border-gray-300 p-2 rounded"
        style={{ minHeight: "50px", maxHeight: "200px" }}
      />
    </>
  );
};


export function ClientForm() {
  const [orgName, setOrgName] = useState("");
  const [orgType, setOrgType] = useState("");
  const [contactPersonName, setContactPersonName] = useState("");
  const [contactPersonEmail, setContactPersonEmail] = useState("");
  const [contactPersonPhone, setContactPersonPhone] = useState("");
  const [orgWebsite, setOrgWebsite] = useState("");
  const [annualRevenue, setAnnualRevenue] = useState(0);
  const [ITemployeeCount, setITemployeeCount] = useState(0);
  const [dataDescription, setDataDescription] = useState("");
  const [recentRiskAssessment, setRecentRiskAssessment] = useState("");
  const [projectType, setProjectType] = useState("");
  const [howDidYouHear, setHowDidYouHear] = useState("");
  const [requestsOrComments, setRequestsOrComments] = useState("");

  const validateForm = () => {

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {};

    console.log(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="max-w-xl w-full">
        <OrgName orgName={orgName} setOrgName={setOrgName} />
        <OrgType orgType={orgType} setOrgType={setOrgType} />
        <ContactPersonName
          contactPersonName={contactPersonName}
          setContactPersonName={setContactPersonName}
        />
        <ContactPersonEmail
          contactPersonEmail={contactPersonEmail}
          setContactPersonEmail={setContactPersonEmail}
        />
        <ContactPersonPhone
          contactPersonPhone={contactPersonPhone}
          setContactPersonPhone={setContactPersonPhone}
        />
        <OrgWebsite orgWebsite={orgWebsite} setOrgWebsite={setOrgWebsite} />
        <AnnualRevenue
          annualRevenue={annualRevenue}
          setAnnualRevenue={setAnnualRevenue}
        />
        <ITEmployeeCount
          ITemployeeCount={ITemployeeCount}
          setITemployeeCount={setITemployeeCount}
        />
        <DataDescription
          dataDescription={dataDescription}
          setDataDescription={setDataDescription}
        />
        <RecentRiskAssessment
          recentRiskAssessment={recentRiskAssessment}
          setRecentRiskAssessment={setRecentRiskAssessment}
        />
        <ProjectType
          projectType={projectType}
          setProjectType={setProjectType}
        />
        <ClinicOutreach
          howDidYouHear={howDidYouHear}
          setHowDidYouHear={setHowDidYouHear}
        />
        <RequestsOrComments
          requestsOrComments={requestsOrComments}
          setRequestsOrComments={setRequestsOrComments}
        />

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
