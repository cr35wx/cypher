import React from "react";
import LoginBox from "../loginBox";

export const Contact = () => {
  return ( 
    <div>
    <section className="bg-white py-20">
    <div className="max-w-screen-xl mx-auto px-4 text-center">
      <h1 className="text-3xl font-extrabold text-Blue sm:text-5xl mb-4">
        Login
      </h1>
    </div>
    </section>

    <LoginBox onLogin={(username) => console.log(`Logged in as ${username}`)} />
    </div>

    
  );
};
