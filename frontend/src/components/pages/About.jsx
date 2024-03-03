import React, { useState } from "react";
import "./about/about.css";
import FacultyMember from "./about/FacultyMember";
import FacultyData from "./about/FacultyData";
import { DownloadIcon } from "@heroicons/react/outline";
import dummyForm from './about/dummy-form.txt';
import { missionImg } from "../../images";
import { motion } from "framer-motion";


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
    : FacultyData.filter(faculty => faculty.college.toLowerCase() === selectedCategory);

  return (
    <div>
      <section className="top-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="md:justify-center lg:col-span-1 flex items-center justify-center">
            <img
              className="h-full w-full object-cover lg:h-auto"
              src={missionImg}
              alt="Mission"
            />
          </div>
          <div className="bg-white md:max-w-2xl md:z-10 md:shadow-lg md:flex md:justify-center md:mx-auto lg:w-full lg:mt-0 lg:py-8">
            <div className="flex flex-col p-4 md:px-16 md:pb-1 lg:mt-12">
              <h2 className="text-4xl font-graduate text-center text-darkBlue font-black uppercase lg:text-4xl">Our Mission</h2>
              <p className="mt-4 p-2 lg:p-0 text-center text-2xl">
                Raise organizational awareness of information security and privacy risks discovered from a student-led risk assessment so that incremental improvements are made in the client's security policies and practices while students in turn gain real-world experience that contributes to a cybersecurity workforce.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Assessment Form */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-graduate font-bold mb-4 text-white">Risk Assessment Form</h2>
          <p className="text-lg mb-4 text-gray-300">
            Download our blank general security risk assessment form for your use.
          </p>
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={handleDownload}
            className="btn-blue"
          >
            <DownloadIcon className="w-6 h-6 mr-2" /> Download Form
          </motion.button>
        </div>
      </section>

      {/* Cybersecurity Resources */}
      <section className="bg-white py-20">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-graduate text-darkBlue font-bold mb-4">Cybersecurity Resources</h2>
          <p className="text-lg mb-4 text-gray-700">
            Links to valuable cybersecurity resources used during risk
            assessments.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.a
              whileTap={{ scale: 0.85 }}
              href="#"
              className="resource bg-gray-200 rounded-lg p-8 no-underline shadow-md hover:shadow-lg transition duration-300 block"
            >
              <h3 className="text-xl font-bold mb-2 text-gray-700">Resource 1</h3>
              <p className="text-base text-gray-700">
                Description
              </p>
            </motion.a>
            <motion.a
              whileTap={{ scale: 0.85 }}
              href="#"
              className="resource bg-gray-200 no-underline rounded-lg p-8 shadow-md hover:shadow-lg transition duration-300 block"
            >
              <h3 className="text-xl font-bold mb-2 text-gray-700">Resource 2</h3>
              <p className="text-base text-gray-700">
                Description
              </p>
            </motion.a>
            <motion.a
              whileTap={{ scale: 0.90 }}
              href="#"
              className="resource bg-gray-200 no-underline rounded-lg p-8 shadow-md hover:shadow-lg transition duration-300 block"
            >
              <h3 className="text-xl font-bold mb-2 text-gray-700">Resource 3</h3>
              <p className="text-base text-gray-700">
                Description
              </p>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <section className="bg-gray-900 py-20 faculty-section">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-graduate font-bold mb-4 text-white">
            Participating Faculty
          </h2>
          <div className="flex flex-row justify-center mb-8 space-x-4 flex-wrap">
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => handleCategoryChange("all")}
              className={`${selectedCategory === "all" ? "btn-blue" : "btn-white"} mx-2 my-1`}
            >
              All
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => handleCategoryChange("school of computing")}
              className={`${selectedCategory === "school of computing" ? "btn-blue" : "btn-white"} mx-2 my-1 mr-4`}
            >
              School of Computing
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => handleCategoryChange("college of business")}
              className={`${selectedCategory === "college of business" ? "btn-blue" : "btn-white"} mx-2 my-1 mr-4`}
            >
              College of Business
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => handleCategoryChange("law")}
              className={`${selectedCategory === "law" ? "btn-blue" : "btn-white"} mx-2 my-1 mr-4`}
            >
              Law
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.90 }}
              onClick={() => handleCategoryChange("steans center")}
              className={`${selectedCategory === "steanscenter" ? "btn-blue" : "btn-white"} mx-2 my-1 mr-4`}
            >
              Steans Center
            </motion.button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFacultyData.map((faculty) => (
              <FacultyMember
                key={faculty.id}
                photo={faculty.photo}
                name={faculty.name}
                title={faculty.title}
                college={faculty.college}
                facultyPage={faculty.facultyPage}
              />
            ))}
          </div>
        </div>
      </section>


      {/* Contact Information */}
      <section className="bg-white py-20">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-graduate text-darkBlue font-bold mb-4">Contact Information</h2>
          <p className="text-lg mb-4 text-gray-700">
            Have questions or need more information about our program? Reach
            out to us!
          </p>
          <motion.button
            whileTap={{ scale: 0.85 }}
            className="btn-white"
            onClick={handleContactClick}
          >
            Contact Us
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default About;