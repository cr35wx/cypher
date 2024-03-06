import React from "react";
// import FacultyMember from './about/FacultyMember';
// import FacultyData from './about/FacultyData';
//import logo from "../images/logo.png";
import Footer from './footer/Footer';

export const Contact = () => {
  return /*<h1>Contact</h1>;*/ (
  <div className="flex justify-center bg-gray-100 rounded-lg p-6">
    <div className="w-full md:w-3/4 lg:w-2/3">

      {/*Contact Info Statement*/}
        <div>
          <h1>Stay in Contact with Us</h1>

          <p className="text-lg font-semibold">Contact Details</p>
          <p className="mt-2">Adress: CompName Street, Chicago, Illinois</p>
          <p className="mt-2">Phone: (***) ***-****</p>
          <p className="mt-2">Company Email: compname123@gmail.com</p>
        </div>

      {/*Staff Contact Info*/}
      {/* <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Staff Information</h2>

        <p className="mt-2">
        {FacultyData.map((faculty) => (
              <FacultyMember
                key={faculty.id}
                photo={faculty.photo} name={faculty.name}
                title={faculty.title}
              />
            ))}
        </p>

      </div> */}


      {/*Professor Contact Info*/}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Contact Information</h2>

        <p className="text-lg font-semibold">For additional information, please contact Janine Spears:</p>
        <p className="mt-2">Email: <a href="mailto:jspears2@depaul.edu">jspears2@depaul.edu</a></p>
      </div>


      {/* Dummy Text */}
      <p>
            Raise organizational awareness of information security and privacy
            risks discovered from a student-led risk assessment so that
            incremental improvements are made in the client's security policies
            and practices while students in turn gain real-world experience that
            contributes to a cybersecurity workforce.Raise organizational awareness of information security and privacy
            risks discovered from a student-led risk assessment so that
            incremental improvements are made in the client's security policies
            and practices while students in turn gain real-world experience that
            contributes to a cybersecurity workforce.Raise organizational awareness of information security and privacy
            risks discovered from a student-led risk assessment so that
            incremental improvements are made in the client's security policies
            and practices while students in turn gain real-world experience that
            contributes to a cybersecurity workforce.
            Raise organizational awareness of information security and privacy
            risks discovered from a student-led risk assessment so that
            incremental improvements are made in the client's security policies
            and practices while students in turn gain real-world experience that
            contributes to a cybersecurity workforce.Raise organizational awareness of information security and privacy
            risks discovered from a student-led risk assessment so that
            incremental improvements are made in the client's security policies
            and practices while students in turn gain real-world experience that
            contributes to a cybersecurity workforce.Raise organizational awareness of information security and privacy
            risks discovered from a student-led risk assessment so that
            incremental improvements are made in the client's security policies
            and practices while students in turn gain real-world experience that
            contributes to a cybersecurity workforce.Raise organizational awareness of information security and privacy
            risks discovered from a student-led risk assessment so that
            incremental improvements are made in the client's security policies
            and practices while students in turn gain real-world experience that
            contributes to a cybersecurity workforce.Raise organizational awareness of information security and privacy
            risks discovered from a student-led risk assessment so that
            incremental improvements are made in the client's security policies
            and practices while students in turn gain real-world experience that
            contributes to a cybersecurity workforce.Raise organizational awareness of information security and privacy
            risks discovered from a student-led risk assessment so that
            incremental improvements are made in the client's security policies
            and practices while students in turn gain real-world experience that
            contributes to a cybersecurity workforce.
      </p>

      {/*Test Footer*/}

          <div>
            {/* Footer Content Appears Here */}
            <Footer />
          </div>

    </div>
  </div>
  );
};
