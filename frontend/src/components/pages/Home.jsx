import React from "react";
import './Home.css';
import Fade from "../Carousel"
import Basic from "../Calendar/calendarComponentClient";
import { ReactTyped } from 'react-typed';
import { motion } from "framer-motion";
import Footer from "./footer/Footer";

/*Homepage that includes two react libraries react-modal and react-slick. Modal is a pop-up that appears when the user hits the register or get started button. 
It prompts the user to fill out the student form or the client form. 
React-slick allows us to import the carousel which cycles thorugh 3 stock images of the clinic 
*/

export const Home = () => {

  return (
    <div>
      {/* Landing */}
      <section className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-50 text-center">
            <h1 className="font-graduate text-3xl text-gray-800 font-extrabold sm:text-5xl">
              Welcome to
              <strong className="mt-2 mb-4 font-graduate font-extrabold text-darkBlue md:flex-auto sm:block"> Cypher Cybersecurity Clinic </strong>
            </h1>

            <div className="mt-10 flex flex-col items-center">
              <p className="text-lg sm:text-xl font-medium text-gray-800">
                The one-stop shop for student-performed professional services:
              </p>
              <ReactTyped
                className='text-lg sm:text-xl font-bold text-darkBlue pl-2'
                strings={['General Security Risk', 'Audit', 'Policy Review']}
                typeSpeed={75}
                backSpeed={110}
                loop
              />
            </div>



            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <motion.a
                whileTap={{ scale: 0.85 }}
                href="/signup" // URL of the register page
                className="block w-full rounded bg-darkBlue px-12 py-3 text-xl font-graduate font-medium text-white shadow no-underline hover:bg-blue-800 focus:outline-none focus:ring active:bg-blue-900 sm:w-auto"
              >
                Apply
              </motion.a>

              <motion.a
                whileTap={{ scale: 0.85 }}
                className="block w-full rounded px-12 py-3 text-xl font-graduate font-medium text-blue-800 shadow no-underline hover:text-darkBlue focus:outline-none focus:ring active:text-darkBlue sm:w-auto"
                href="#divider"
              >
                Learn More
              </motion.a>
            </div>
          </div>
        </div>
      </section>



      {/*services divider*/}
      <div id="divider">
        <span className="flex items-center mt-28 mb-8">
          <span className="h-px flex-1 bg-black"></span>
          <span className="shrink-0 px-6 font-graduate text-2xl font-bold">Who we are</span>
          <span className="h-px flex-1 bg-black"></span>
        </span>
      </div>


      {/* text box description*/}
      <div className="max-w-screen-xl flex-col lg:flex-row mx-auto grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-8">
        <div className="max-w-screen-lg mx-0 my-4 bg-gray-200 p-8 rounded-lg shadow-md">               {/* text box description*/}

          <p className="text-2xl text-gray-700">
            Cypher's Cybersecurity Clinic ("Clinic") is an interdisciplinary collaboration between the
            <a className="text-darkBlue font-bold no-underline" href="https://www.cdm.depaul.edu/Pages/default.aspx"> School of Computing</a>, the
            <a className="text-darkBlue font-bold no-underline" href="https://business.depaul.edu/Pages/default.aspx"> Driehaus College of Business</a>, and the
            <a className="text-darkBlue font-bold no-underline" href="https://law.depaul.edu/Pages/default.aspx"> College of Law</a>.
            The Clinic provides students with hands-on, real-world experience working on cybersecurity projects for organizational clients that helps prepare them for careers in the cybersecurity workforce. Participating DePaul students come from a variety of undergraduate and graduate degree majors across the three colleges. The Clinic partners with
            <a className="text-darkBlue font-bold no-underline" href="https://resources.depaul.edu/steans-center-community-based-service-learning/about/Pages/default.aspx"> DePaul's Steans Center</a> to serve community-based non-profit organizations that have limited resources yet have a need for cybersecurity assessment services. The Clinic also provides services to Chicago-area small businesses.
          </p>
        </div>

        <Fade />    {/*<-- Carousel*/}
      </div>




      {/*3 box infographic -- maybe change this infographic to talk about the 3 schools involved?*/}
      <section className="bg-gray-900 text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="mx-auto text-center max-w-screen-md">
            <h2 className="text-3xl font-graduate font-black sm:text-4xl">OUR SERVICES</h2>

            <p className="mt-4 text-gray-300">
              Students perform needed professional services to under-resourced external clients. In exchange, students gain a transformative educational experience
              from working on real-world projects in their area of study while providing a public good.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <a
              className="block rounded-xl border border-gray-800 p-8 shadow-md transition hover:border-lighterBlue hover:shadow-lighterBlue no-underline"
              href="https://www.cdm.depaul.edu/Pages/default.aspx"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-10 text-lighterBlue"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
                />
              </svg>

              <h2 className="mt-4 text-xl font-bold text-white">General Security Risk</h2>

              <p className="mt-1 text-sm text-gray-300">
                Our team will meet with clients to take a benchmark cybersecurity test.
              </p>
            </a>

            <a
              className="block rounded-xl border border-gray-800 p-8 shadow-md transition hover:border-lighterBlue hover:shadow-lighterBlue no-underline"
              href="https://business.depaul.edu/Pages/default.aspx"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-10 text-lighterBlue"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>

              <h2 className="mt-4 text-xl font-bold text-white">Audit</h2>

              <p className="mt-1 text-sm text-gray-300">
                Students will assist clients with tasks relating to accounting, record-keeping, etc.
              </p>
            </a>

            <a
              className="block rounded-xl border border-gray-800 p-8 shadow-md transition hover:border-lighterBlue hover:shadow-lighterBlue no-underline"
              href="https://law.depaul.edu/Pages/default.aspx"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-10 text-lighterBlue"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                />
              </svg>

              <h2 className="mt-4 text-xl font-bold text-white">Policy Review</h2>

              <p className="mt-1 text-sm text-gray-300">
                Commited law students will help clients with basic legal review.
              </p>
            </a>

          </div>

          <div className="mt-12 text-center">
            <motion.a
              whileTap={{ scale: 0.85 }}
              href='/signup'
              className="inline-block rounded bg-darkBlue px-12 py-3 text-xl font-graduate font-medium text-white transition hover:bg-blue-900 focus:outline-none focus:ring no-underline"
            >
              Apply
            </motion.a>
          </div>
        </div>
      </section>

      {
        /*
      <>
        <Footer />
        <Basic />
      </>
      */}


    </div>

  );
};



