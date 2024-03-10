import React from "react";
import "./Footer.css";

{/*Sticky Footer at the bottom of each page, this file uses aspects of tailwind*/}

const Footer = () => {
  return (
    <footer>
        {/* width, max width, container, padding, margin */}
        <div class="w-full max-w-screen-xl container mx-auto p-4 md:py-8">
          {/* flex wrap, align items, justify content */}
          <div class="flex items-center justify-between">

            <div>
              {/* unordered list containing two underlined and spaced out links for the Home and About pages */}
              <ul >
                <li>
                  <a href="http://localhost:3000/home" class="hover:underline me-4">Home</a>
                </li>
                <li>
                  <a href="http://localhost:3000/about" class="hover:underline">About</a>
                </li>
              </ul>
            </div>

            <div>
              {/* text align to center, text size extra large, semibold, text color white */}
                <a href="#" class="text-center text-xl font-semibold text-white">
                  DePaul University
                </a>
            </div>
            
            <div>
            {/* unordered list containing two underlined and spaced out links for the Student Application and Client Application pages */}
              <ul >
                <li>
                  <a href="http://localhost:3000/student" class="hover:underline me-4">Student Application</a>
                </li>
                <li>
                  <a href="http://localhost:3000/client" class="hover:underline">Client Application</a>
                </li>
              </ul>
            </div>
            
          </div>

          {/* bottom of footer sets block text, text align to center, text size extra large, text color white */}
          <span class="block text-center text-xl dark:text-white">
            <p className="mt-3 ">Address: 1 E. Jackson Blvd.</p>
            <p className="mt-2 ">Chicago, IL 60604</p>
            <p className="mt-2 ">Phone: (***) ***-****</p>
          </span>

        </div>
        
        {/* divider for bottom section of footer set to white */}
        <hr class="border-white lg:my-3"></hr>

        {/* university copyright set as block text, text size medium, text color white */}
        <span class="block text-med text-white">© 2001-2024
          <a> DePaul University </a>
        </span>
    </footer>
  );
};

export default Footer;  
