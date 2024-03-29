/*
This component represents the About page of the application. 
It includes sections for displaying the mission, cybersecurity resources, participating faculty members, and contact information. 
Users can filter faculty members by category and contact the organization via email. 
The component utilizes React state to manage category filtering and Framer Motion for animation effects.
*/

import React, { useState } from "react";
import "./about/about.css";
import FacultyMember from "./about/FacultyMember";
import FacultyData from "./about/FacultyData";
import { missionImg } from "../../images";
import { motion } from "framer-motion";

const About = () => {
  const handleContactClick = () => {
    window.location.href = "mailto:jspears2@depaul.edu";
  };

  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredFacultyData =
    selectedCategory === "all"
      ? FacultyData
      : FacultyData.filter(
          (faculty) => faculty.college.toLowerCase() === selectedCategory
        );

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
              <h2 className="text-4xl font-graduate text-center text-darkBlue font-black uppercase lg:text-4xl">
                Our Mission
              </h2>
              <p className="mt-4 p-2 lg:p-0 text-center text-2xl">
                Raise organizational awareness of information security and
                privacy risks discovered from a student-led risk assessment so
                that incremental improvements are made in the client's security
                policies and practices while students in turn gain real-world
                experience that contributes to a cybersecurity workforce.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cybersecurity Resources */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-graduate text-white font-bold mb-4">
            Cybersecurity Resources
          </h2>
          <p className="text-lg mt-8 mb-12 text-gray-300">
            Links to valuable resources useful for learning basic cybersecurity
            knowledge.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.a
              whileTap={{ scale: 0.85 }}
              href="https://www.hacker101.com/"
              className="block rounded-xl border border-gray-800 p-8 shadow-md transition hover:border-lighterBlue hover:shadow-lighterBlue no-underline"
            >
              <h3 className="text-2xl no-underline font-graduate font-bold mb-4 text-white">
                Hacker 101
              </h3>
              <p className="text-base text-left text-gray-300">
                Hacker101 is a free educational resource developed by HackerOne
                to grow and empower the hacker community at large. There are
                video lessons and curated resources to help you learn the
                concepts of hacking and a Capture the Flag game where you can
                turn that theory into practice.
              </p>
            </motion.a>
            <motion.a
              whileTap={{ scale: 0.85 }}
              href="https://www.opensecuritytraining.info/"
              className="block rounded-xl border border-gray-800 p-8 shadow-md transition hover:border-lighterBlue hover:shadow-lighterBlue no-underline"
            >
              <h3 className="text-2xl no-underline font-graduate font-bold mb-4 text-white">
                Open Security Training
              </h3>
              <p className="text-base text-gray-300 text-left">
                OpenSecurityTraining, started by Xeno Kovah in 2011, was
                initailly made to host his own classes. OpenSecurityTraining's
                mission is to provide the world's deepest and best cybersecurity
                training. There are a vast amound of free educational resources
                that are free to access after signing up.
              </p>
            </motion.a>
            <motion.a
              whileTap={{ scale: 0.9 }}
              href="https://tryhackme.com/"
              className="block rounded-xl border border-gray-800 p-8 shadow-md transition hover:border-lighterBlue hover:shadow-lighterBlue no-underline"
            >
              <h3 className="text-2xl no-underline font-graduate font-bold mb-4 text-white">
                Try Hack Me
              </h3>
              <p className="text-base text-gray-300 text-left">
                TryHackMe is a cybersecurity training platform with learning
                content covering all skill levels from complete beginner to the
                seasoned hacker. The site has a free sign up after that users
                will be able to engage in different learning paths based on what
                they want to learn.
              </p>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <section className="bg-white py-20 faculty-section">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-graduate font-bold mb-8 text-darkBlue">
            Participating Faculty
          </h2>
          <div className="flex flex-row justify-center mb-20 mt-4 space-x-4 flex-wrap">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => handleCategoryChange("all")}
              className={`${
                selectedCategory === "all"
                  ? "button-faculty blue"
                  : "button-faculty white"
              } mx-2 my-1`}
            >
              All
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => handleCategoryChange("school of computing")}
              className={`${
                selectedCategory === "school of computing"
                  ? "button-faculty blue"
                  : "button-faculty white"
              } mx-2 my-1 mr-4`}
            >
              School of Computing
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => handleCategoryChange("college of business")}
              className={`${
                selectedCategory === "college of business"
                  ? "button-faculty blue"
                  : "button-faculty white"
              } mx-2 my-1 mr-4`}
            >
              College of Business
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => handleCategoryChange("law")}
              className={`${
                selectedCategory === "law"
                  ? "button-faculty blue"
                  : "button-faculty white"
              } mx-2 my-1 mr-4`}
            >
              Law
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => handleCategoryChange("steans center")}
              className={`${
                selectedCategory === "steans center"
                  ? "button-faculty blue"
                  : "button-faculty white"
              } mx-2 my-1 mr-4`}
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
      <section className="bg-gray-900 py-20">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-graduate text-white font-bold mb-4">
            Contact Information
          </h2>
          <p className="text-lg mb-4 text-gray-300">
            Have questions or need more information about our program? Reach out
            to us!
          </p>
          <motion.button
            whileTap={{ scale: 0.85 }}
            className="button-faculty"
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
