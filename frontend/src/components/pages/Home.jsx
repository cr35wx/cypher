import React from "react";
import "./Home.css";

export const Home = () => {
  return (
    <div>
      <h1 className="Header">
        Welcome to <span style={{ fontStyle: "italic" }}> Cypher's</span>{" "}
        Cybersecurity Clinic
      </h1>
      ;
      {/*
    <div className = "missionStatement"> 
    <p>
      A cybersecurity clinic is similar in concept to a Law Clinic in that students perform needed professional services to under-resourced external clients. In exchange, students gain a transformative educational experiencefrom working on real-world projects in their area of study, while providing a public good.
    </p>
    <p>
      Our clinic focuses on three main areas: 
    </p>
    <ul class="list-disc">
      <li>General Security Risk</li>
      <li>Audit</li>
      <li>Policy Review</li>
    </ul>
    </div>
  */}
      <section className="container mx-auto px-8 py-8 lg:py-40">
        <h2 className="block antialiased tracking-normal font-sans text-4xl font-semibold leading-[1.3] text-blue-gray-900 !text-3xl !leading-snug lg:!text-4xl">
          Our clinic focuses on three main areas
        </h2>
        <p className="block antialiased font-sans text-xl font-normal leading-relaxed text-inherit mt-2 w-full font-normal !text-gray-500 lg:w-5/12">
          Read about our latest achievements and milestones.
        </p>
        {/*   <a href="https://www.material-tailwind.com/" target="_blank">Generated with <b>Magic AI Blocks</b> by Creative Tim</a>.   */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-md relative grid min-h-[30rem] items-end overflow-hidden rounded-xl">
            <img
              src="https://s3.amazonaws.com/brt.org/lock-technology-cybersecurity-header.jpg"
              alt="bg"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/70"></div>
            <div className="p-6 relative flex flex-col justify-end">
              <h4 className="block antialiased tracking-normal font-sans text-3xl font-semibold leading-snug text-white">
                General Security Risk
              </h4>
              <p className="block antialiased font-sans text-base font-light leading-relaxed text-white my-2 font-normal">
                Our team will meet with clients to take a benchmark
                cybersecurity test.
              </p>
            </div>
          </div>

          <div className="relative flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-md relative grid min-h-[30rem] items-end overflow-hidden rounded-xl">
            <img
              src="https://khovjones.co.nz/wp-content/uploads/2018/05/Forensic-Investigations-1.jpg"
              alt="bg"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/70"></div>
            <div className="p-6 relative flex flex-col justify-end">
              <h4 className="block antialiased tracking-normal font-sans text-3xl font-semibold leading-snug text-white">
                Audit
              </h4>
              <p className="block antialiased font-sans text-base font-light leading-relaxed text-white my-2 font-normal">
                Students will assist clients with tasks relating to accounting,
                record-keeping, etc.
              </p>
            </div>
          </div>

          <div className="relative flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-md relative grid min-h-[30rem] items-end overflow-hidden rounded-xl">
            <img
              src="https://pics.craiyon.com/2023-09-12/ea6fe19dcbe14bbc8739d89610cd88b6.webp"
              alt="bg"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/70"></div>
            <div className="p-6 relative flex flex-col justify-end">
              <h4 className="block antialiased tracking-normal font-sans text-3xl font-semibold leading-snug text-white">
                Policy Review
              </h4>
              <p className="block antialiased font-sans text-base font-light leading-relaxed text-white my-2 font-normal">
                Commited law students will help clients with basic legal review.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
