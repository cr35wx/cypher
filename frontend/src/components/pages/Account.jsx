import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { loginImg } from "../../images";
import { RotateLoader } from "react-spinners";
import { DownloadIcon } from "@heroicons/react/outline";
import dummyForm from "./about/dummy-form.txt";
import { motion } from "framer-motion";
import StudentCalendar from "../Calendar/calendarComponentStudent";
import ClientCalendar from "../Calendar/calendarComponentClient";

const Account = () => {
  const { logout, userRole } = useAuth();
  const [accountDetails, setAccountDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = dummyForm;
    link.download = "dummy-form.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchAccountDetails = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/user-details", {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAccountDetails(data);
        localStorage.setItem("accountDetails", JSON.stringify(data));
      } else {
        console.error("Failed to fetch account details:", response.status);
      }
    } catch (error) {
      console.error("Failed to fetch account details:", error.message);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        window.location.reload();
      }, 3000);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/logout", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        logout();
        window.location.href = "/login";
      } else {
        console.error("Logout failed:", response.status);
      }
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  useEffect(() => {
    const storedDetails = localStorage.getItem("accountDetails");
    if (storedDetails) {
      setAccountDetails(JSON.parse(storedDetails));
      setIsLoading(false);
    } else {
      fetchAccountDetails();
    }
  }, []);

  return (
    <section
      className="flex flex-col items-center justify-center min-h-screen bg-dodgerblue"
      style={{
        backgroundImage: `url(${loginImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mt-8 mb-8">
        <div className="flex bg-white p-8 rounded justify-center items-center shadow-md w-150 flex-col">
          {isLoading ? (
            <div className="text-center mb-4">
              <RotateLoader color="#000000" size={3} speed={2000} />
              <p className="text-center font-graduate font-extrabold text-darkBlue mt-4 mb-4">
                Loading account details...
              </p>
            </div>
          ) : (
            <>
              {accountDetails && (
                <div>
                  <h1 className="text-center text-2xl font-graduate font-extrabold text-darkBlue mb-4">
                    Welcome Back
                  </h1>
                  {userRole === "student" && accountDetails.StudentUser && (
                    <div className="mt-2 items-center text-center justify-center">
                      <p className="text-left font-graduate font-extrabold mb-4">
                        Email: {accountDetails.StudentUser[0].email}
                      </p>
                      <p className="text-left font-graduate font-extrabold mb-4">
                        Name: {accountDetails.StudentUser[0].first_name}{" "}
                        {accountDetails.StudentUser[0].last_name}
                      </p>
                      <p className="text-left font-graduate font-extrabold mb-4">
                        Year Standing:{" "}
                        {accountDetails.StudentUser[0].year_standing}
                      </p>
                      <p className="text-left font-graduate font-extrabold mb-4">
                        Project Interest:{" "}
                        {accountDetails.StudentUser[0].project_interest}
                      </p>
                      <p className="text-left font-graduate font-extrabold mb-4">
                        Expected Graduation:{" "}
                        {accountDetails.StudentUser[0].expected_graduation_qtr}{" "}
                        {accountDetails.StudentUser[0].expected_graduation_year}
                      </p>

                      <div id="divider">
                        <span className="flex items-center mt-16 mb-8">
                          <span className="h-px flex-1 bg-black"></span>
                          <span className="shrink-0 text-2xl px-6 font-graduate font-bold">
                            Risk Assessment Form
                          </span>
                          <span className="h-px flex-1 bg-black"></span>
                        </span>
                      </div>

                      <p className="text-lg mb-4 ">
                        Download our blank general security risk assessment form
                        for your use.
                      </p>
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={handleDownload}
                        className="bg-darkBlue hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-full flex items-center justify-center"
                      >
                        Download Form <DownloadIcon className="w-6 h-6 ml-2" />
                      </motion.button>
                      <div className="flex justify-center mt-16 mb-4">
                        <div className="px-6 text-2xl font-graduate font-bold">
                          Event Calendar
                        </div>
                      </div>
                      <StudentCalendar />
                    </div>
                  )}
                  {userRole === "client" && accountDetails.ClientUser && (
                    <div>
                      <p className="text-left font-graduate font-extrabold mb-4">
                        Email: {accountDetails.ClientUser[0].org_contact_email}
                      </p>
                      <p className="text-left font-graduate font-extrabold mb-4">
                        Organization: {accountDetails.ClientUser[0].org_name}
                      </p>
                      <p className="text-left font-graduate font-extrabold mb-4">
                        Company Website:{" "}
                        {accountDetails.ClientUser[0].org_website}
                      </p>
                      <p className="text-left font-graduate font-extrabold mb-4">
                        Company Number:{" "}
                        {accountDetails.ClientUser[0].org_contact_phone}
                      </p>
                      <p className="text-left font-graduate font-extrabold mb-4">
                        Name: {accountDetails.ClientUser[0].org_contact_fname}{" "}
                        {accountDetails.ClientUser[0].org_contact_lname}
                      </p>
                      <p className="text-left font-graduate font-extrabold mb-4">
                        Project Interest:{" "}
                        {accountDetails.ClientUser[0].project_interest}
                      </p>
                      <p className="text-left font-graduate font-extrabold mb-4">
                        Recent Risk Assement:{" "}
                        {accountDetails.ClientUser[0].recent_risk_assessment}
                      </p>
                      <p className="text-left font-graduate font-extrabold mb-4">
                        IT Employee Count:{" "}
                        {accountDetails.ClientUser[0].it_employee_count}
                      </p>
                      <p className="text-left font-graduate font-extrabold mb-4">
                        Annual Revenue:{" "}
                        {accountDetails.ClientUser[0].org_annual_revenue}
                      </p>
                      <span className="flex items-center mt-16 mb-8">
                        <span className="h-px flex-1 bg-black"></span>
                        <span className="shrink-0 px-6 text-2xl font-graduate font-bold">
                          Event Calendar
                        </span>
                        <span className="h-px flex-1 bg-black"></span>
                      </span>
                      <ClientCalendar />
                    </div>
                  )}
                </div>
              )}
              <div className="mt-10 relative flex justify-center items-center w-8/12">
                <button
                  onClick={handleLogout}
                  className="bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded w-8/12"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Account;
