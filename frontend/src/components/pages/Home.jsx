import React from "react";
import './Home.css'; 

export const Home = () => {
  return ( 
  <div>
    <h1 className = "Header">
      Welcome to <span style={{ fontStyle: 'italic' }}> Cypher's</span> Cybersecurity Clinic
    </h1>;

    <div className = "missionStatement"> 
    <p>
      A cybersecurity clinic is similar in concept to a Law Clinic in that students perform needed professional services to under-resourced external clients. In exchange, students gain a transformative educational experiencefrom working on real-world projects in their area of study, while providing a public good.
    </p>
    <p>
      Our clinic focuses on three main areas: 
    </p>
    <ul>
      <li>General security risk assessment</li>
      <li>Audit</li>
      <li>Policy Review</li>
    </ul>
    
    </div>




  </div>
  );
};
