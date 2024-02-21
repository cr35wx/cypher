import React from "react";
import './Home.css'; 
import {useState} from 'react'; 
import CustomModal from "../Modal";

export const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return ( 
  <div>
    
  
  <section class="bg-gray-50">                                                    {/* Landing */}
  <div class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
    <div class="mx-auto max-w-50 text-center">
      <h1 class="text-3xl font-extrabold sm:text-5xl">
        Welcome to 
        <strong class="mt-2 font-extrabold text-Blue sm:block"> Cypher's Cybersecurity Clinic </strong>
      </h1>

      <p class="mt-4 sm:text-xl/relaxed">
        The one-stop shop for student-preformed professional services. 
      </p>

      <div class="mt-8 flex flex-wrap justify-center gap-4">
        <button
          onClick={openModal}
          class="block w-full rounded bg-Blue px-12 py-3 text-xl font-medium text-white shadow hover:bg-darkBlue focus:outline-none focus:ring active:bg-lightBlue sm:w-auto"
        >
          Register
        </button>

        <a
          class="block w-full rounded px-12 py-3 text-xl font-medium text-lightBlue shadow hover:text-darkBlue focus:outline-none focus:ring active:text-lightBlue sm:w-auto"
          href="#divider"
        >
          Learn More
        </a>
      </div>
    </div>
  </div>
  </section>
  



  <div id = "divider">                  {/*services divider*/}
    <span class="flex items-center mt-28 mb-8">                                                
            <span class="h-px flex-1 bg-black"></span>
            <span class="shrink-0 px-6 text-2xl font-bold">Our Services</span>
            <span class="h-px flex-1 bg-black"></span>
    </span>
  </div>



  <section class="bg-gray-900 text-white">
  <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
    <div class="mx-auto max-w-lg text-center">
      <h2 class="text-3xl font-bold sm:text-4xl">Learn about our services</h2>

      <p class="mt-4 text-gray-300">
      Students perform needed professional services to under-
      resourced external clients. In exchange, students gain a transformative educational experience
      from working on real-world projects in their area of study, while providing a public good.
      </p>
    </div>

    <div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <a
        class="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
        href="#"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="size-10 text-pink-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          
          <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width = "2"
          d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" 
          />
        </svg>

        <h2 class="mt-4 text-xl font-bold text-white">General Security Risk</h2>

        <p class="mt-1 text-sm text-gray-300">
        Our team will meet with clients to take a benchmark cybersecurity test.
        </p>
      </a>

      <a
        class="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
        href="#"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="size-10 text-pink-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
         
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" 
          />
        </svg>

        <h2 class="mt-4 text-xl font-bold text-white">Audit</h2>

        <p class="mt-1 text-sm text-gray-300">
        Students will assist clients with tasks relating to accounting, record-keeping, etc.
        </p>
      </a>

      <a
        class="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
        href="#"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="size-10 text-pink-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" 
          />
        </svg>

        <h2 class="mt-4 text-xl font-bold text-white">Policy Review</h2>

        <p class="mt-1 text-sm text-gray-300">
          Commited law students will help clients with basic legal review.
        </p>
      </a>
      
    </div>

    <div class="mt-12 text-center">
      <a
        onClick={openModal}
        class="inline-block rounded bg-Blue px-12 py-3 text-xl font-medium text-white transition hover:bg-darkBlue focus:outline-none focus:ring focus:ring-lightBlue"
      >
        Get Started Today
      </a>
    </div>
  </div>
</section>


{/* new 3 areas
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">                         
    <div class="h-64 rounded-lg bg-gray-200 flex items-center justify-center">
    <p class = "text-4xl font-sans font-bold" >General Security Risk</p> 
    </div>
    <div class="h-64 rounded-lg bg-gray-200 flex items-center justify-center">
    <p class = "text-4xl font-sans font-bold" >Audit</p> 
    </div>
    <div class="h-64 rounded-lg bg-gray-200 flex items-center justify-center">
    <p class = "text-4xl font-sans font-bold" >Policy Reivew</p> 
    </div>
  </div>


*/}
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




      <section class="container mx-auto px-8 py-8 lg:py-40">                            {/*image grid */}
        <h2 class="block antialiased tracking-normal font-sans text-4xl font-semibold leading-[1.3] text-blue-gray-900 !text-3xl !leading-snug lg:!text-4xl">Our clinic focuses on three main areas</h2>
        <p class="block antialiased font-sans text-xl font-normal leading-relaxed text-inherit mt-2 w-full font-normal !text-gray-500 lg:w-5/12">Read about our latest achievements and milestones.</p>
        {/*   <a href="https://www.material-tailwind.com/" target="_blank">Generated with <b>Magic AI Blocks</b> by Creative Tim</a>.   */}
        <div class="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">


          <div class="relative flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-md relative grid min-h-[30rem] items-end overflow-hidden rounded-xl"><img src="https://s3.amazonaws.com/brt.org/lock-technology-cybersecurity-header.jpg" alt="bg" class="absolute inset-0 h-full w-full object-cover object-center" />
            <div class="absolute inset-0 bg-black/70"></div>
            <div class="p-6 relative flex flex-col justify-end">
              <h4 class="block antialiased tracking-normal font-sans text-3xl font-semibold leading-snug text-white">General Security Risk</h4>
              <p class="block antialiased font-sans text-base font-light leading-relaxed text-white my-2 font-normal">Our team will meet with clients to take a benchmark cybersecurity test.</p>
            </div>
          </div>


          <div class="relative flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-md relative grid min-h-[30rem] items-end overflow-hidden rounded-xl"><img src="https://khovjones.co.nz/wp-content/uploads/2018/05/Forensic-Investigations-1.jpg" alt="bg" class="absolute inset-0 h-full w-full object-cover object-center" />
            <div class="absolute inset-0 bg-black/70"></div>
            <div class="p-6 relative flex flex-col justify-end">
              <h4 class="block antialiased tracking-normal font-sans text-3xl font-semibold leading-snug text-white">Audit</h4>
              <p class="block antialiased font-sans text-base font-light leading-relaxed text-white my-2 font-normal">Students will assist clients with tasks relating to accounting, record-keeping, etc.</p>
            </div>
          </div>


          <div class="relative flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-md relative grid min-h-[30rem] items-end overflow-hidden rounded-xl"><img src="https://pics.craiyon.com/2023-09-12/ea6fe19dcbe14bbc8739d89610cd88b6.webp" alt="bg" class="absolute inset-0 h-full w-full object-cover object-center" />
            <div class="absolute inset-0 bg-black/70"></div>
            <div class="p-6 relative flex flex-col justify-end">
              <h4 class="block antialiased tracking-normal font-sans text-3xl font-semibold leading-snug text-white">Policy Review</h4>
              <p class="block antialiased font-sans text-base font-light leading-relaxed text-white my-2 font-normal">Commited law students will help clients with basic legal review.</p>
            </div>
          </div>
        </div>
      </section>
  
<CustomModal isOpen={isModalOpen} onRequestClose={closeModal} />
</div>
  
  );
};

   

