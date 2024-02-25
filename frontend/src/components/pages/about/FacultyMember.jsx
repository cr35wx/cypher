import React from 'react';

function FacultyMember({ photo, name, title, college, facultyPage }) {
  return (
    <div className="flex flex-col items-center mb-8">
      <img src={photo} alt={name} className="w-20 h-20 rounded-full mb-4 shadow-md hover:shadow-lg object-cover object-center" />
      <div className="text-center">
        <p className="text-lg font-semibold text-white mb-1">{name}</p>
        <p className="text-white mb-1">{title}</p>
        <p className="text-white mb-1">{college}</p>
        <a href={facultyPage} className="text-blue-500 hover:underline">View Profile</a>
      </div>
    </div>
  );
}

export default FacultyMember;