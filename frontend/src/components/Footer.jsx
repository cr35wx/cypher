/*
Footer component representing the bottom section of the webpage.
It includes the clinic name, navigation links, and contact information.
The visibility of certain links depends on the user's authentication status.
 */

import React from "react";
import { useAuth } from "./AuthContext";
import "./Footer.css";

export const Footer = () => {
  const { isLoggedIn, userRole } = useAuth();

  return (
    <footer>
      {/* Footer content goes here */}
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex justify-between">
          <p className="text-center sm:text-left text-2xl font-graduate font-semibold whitespace-nowrap dark:text-white">
            Cypher Cybersecurity Clinic
          </p>
          <ul className="flex justify-center sm:justify-end space-x-4">
            <li>
              <a href="/home" className="font-graduate no-underline">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="font-graduate no-underline">
                About
              </a>
            </li>
            <li>
              {isLoggedIn ? (
                <a href="/account" className="font-graduate no-underline">
                  {userRole}
                </a>
              ) : (
                <a href="/login" className="font-graduate no-underline">
                  Login
                </a>
              )}
            </li>
          </ul>
        </div>

        <hr className="my-6 border-white-300 sm:mx-auto lg:my-8"></hr>

        <span className="block text-sm text-gray-300 text-center">
          <p>
            © 2001-2024 DePaul University | Address: 1 E. Jackson Blvd. Chicago,
            IL 60604 | Phone: (312) 362-8000 |{" "}
            <a href="/admin" className="no-underline text-gray-300">
              ADMIN
            </a>
          </p>
        </span>
      </div>
    </footer>
  );
};
