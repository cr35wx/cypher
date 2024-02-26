import React, { useState } from "react";
import "./about/about.css";
import FacultyMember from "./about/FacultyMember";
import FacultyData from "./about/FacultyData";
import { DownloadIcon } from "@heroicons/react/outline";
import dummyForm from './about/dummy-form.txt';

const About = () => {

  const handleContactClick = () => {
    window.location.href = "mailto:jspears2@depaul.edu";
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = dummyForm;
    link.download = "dummy-form.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredFacultyData = selectedCategory === "all"
    ? FacultyData
    : FacultyData.filter(faculty => faculty.college.toLowerCase().replace(/ /g, "_") === selectedCategory);

  return (
    <div>
      {/* Mission Statement Section */}
      <section className="bg-white py-20">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl mb-4">
            Our Mission
          </h1>
          <p className="text-lg sm:text-xl text-gray-700">
            Raise organizational awareness of information security and privacy
            risks discovered from a student-led risk assessment so that
            incremental improvements are made in the client's security policies
            and practices while students in turn gain real-world experience that
            contributes to a cybersecurity workforce.
          </p>
        </div>
      </section>

      {/* Risk Assessment Form */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Risk Assessment Form</h2>
          <p className="text-lg mb-4 text-gray-300">
            Download our blank general security risk assessment form for your use.
          </p>
          <button
            onClick={handleDownload}
            className="btn-blue"
          >
            <DownloadIcon className="w-6 h-6 mr-2" /> Download Form
          </button>
        </div>
      </section>

      {/* Cybersecurity Resources */}
      <section className="bg-white py-20">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Cybersecurity Resources</h2>
          <p className="text-lg mb-4 text-gray-700">
            Links to valuable cybersecurity resources used during risk
            assessments.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a
              href="#"
              className="resource bg-gray-200 rounded-lg p-8 shadow-md hover:shadow-lg transition duration-300 block"
            >
              <h3 className="text-xl font-bold mb-2 text-Blue">Resource 1</h3>
              <p className="text-base text-gray-700">
                Description of Resource 1
              </p>
            </a>
            <a
              href="#"
              className="resource bg-gray-200 rounded-lg p-8 shadow-md hover:shadow-lg transition duration-300 block"
            >
              <h3 className="text-xl font-bold mb-2 text-Blue">Resource 2</h3>
              <p className="text-base text-gray-700">
                Description of Resource 2
              </p>
            </a>
            <a
              href="#"
              className="resource bg-gray-200 rounded-lg p-8 shadow-md hover:shadow-lg transition duration-300 block"
            >
              <h3 className="text-xl font-bold mb-2 text-Blue">Resource 3</h3>
              <p className="text-base text-gray-700">
                Description of Resource 3
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <section className="bg-gray-900 py-20 faculty-section">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Participating Faculty
          </h2>
          <div className="flex flex-row justify-center mb-8 space-x-4">
            <button
              onClick={() => handleCategoryChange("all")}
              className={`${selectedCategory === "all" ? "btn-blue" : "btn-white"} mr-4`}
            >
              All
            </button>
            <button
              onClick={() => handleCategoryChange("school_of_computing")}
              className={`${selectedCategory === "school_of_computing" ? "btn-blue" : "btn-white"} mr-4`}
            >
              School of Computing
            </button>
            <button
              onClick={() => handleCategoryChange("college_of_business")}
              className={`${selectedCategory === "college_of_business" ? "btn-blue" : "btn-white"} mr-4`}
            >
              College of Business
            </button>
            <button
              onClick={() => handleCategoryChange("law")}
              className={`${selectedCategory === "law" ? "btn-blue" : "btn-white"} mr-4`}
            >
              Law
            </button>
            <button
              onClick={() => handleCategoryChange("steans_center")}
              className={`${selectedCategory === "steans_center" ? "btn-blue" : "btn-white"} mr-4`}
            >
              Steans Center
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFacultyData.map((faculty) => (
              <FacultyMember
                key={faculty.id}
                photo={faculty.photo}
                name={faculty.name}
                title={faculty.title}
                facultyPage={faculty.facultyPage}
              />
            ))}
          </div>
        </div>
      </section>


      {/* Contact Information */}
      <section className="bg-white py-20">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
          <p className="text-lg mb-4 text-gray-700">
            Have questions or need more information about our program? Reach
            out to us!
          </p>
          <button
            className="btn-white"
            onClick={handleContactClick}
          >
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;