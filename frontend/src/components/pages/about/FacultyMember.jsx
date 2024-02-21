import React from 'react'

function FacultyMember({ photo, name, title, college, facultyPage }) {
    return (
      <div className="flex items-center mb-4">
        <img src={photo} alt={name} className="w-12 h-12 rounded-full mr-4" />
        <div>
          <p className="text-lg font-semibold">{name}</p>
          <p>{title}</p>
          <p>{college}</p>
          <a href={facultyPage} className="text-blue-500 hover:underline">View Profile</a>
        </div>
      </div>
    );
  }
  
  export default FacultyMember;