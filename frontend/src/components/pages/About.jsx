import React from "react";
import FacultyMember from './about/FacultyMember';
import FacultyData from './about/FacultyData';

export const About = () => {
  return (
    <div className="flex justify-center bg-gray-100 rounded-lg p-6">
      <div className="w-full md:w-3/4 lg:w-2/3">
        
        {/* Mission Statement Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg">
            Raise organizational awareness of information security and privacy 
            risks discovered from a student-led risk assessment so that incremental
            improvements are made in the client's security policies and practices 
            while students in turn gain real-world experience that contributes to a cyber
            security workforce.
          </p>
        </div>
        
        {/* Contact Information */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
          <p className="text-lg font-semibold">For additional information, please contact us at:</p>
          <p className="mt-2">Email: <a href="mailto:jspears2@depaul.edu">jspears2@depaul.edu</a></p>
        </div>

        {/* Risk Assessment Form */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Risk Assessment Form</h2>
          <p className="text-lg">
            Blank general security risk assessment form (provided to you) for download.
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Download Form
          </button>
        </div>

        {/* Cybersecurity Resources */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Cybersecurity Resources</h2>
          <p className="text-lg">
            Links to major cybersecurity resources used during risk assessments that will help through the process of filling the form.
          </p>
          <ul className="mt-4">
            <li className="mb-2">
              <a href="#" className="text-blue-500 hover:text-blue-700 font-bold">Resource 1</a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-blue-500 hover:text-blue-700 font-bold">Resource 2</a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-blue-500 hover:text-blue-700 font-bold">Resource 3</a>
            </li>
            {/* Add more links as needed, currently using dummy links */}
          </ul>
        </div>
        
        {/* Faculty Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Participating Faculty</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FacultyData.map((faculty) => (
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
      </div>
    </div>
  );
};