import React from "react";

function FacultyMember({ photo, name, title, facultyPage }) {
  return (
    <div className="flex flex-col items-center mb-8">
      <img
        src={photo}
        alt={name}
        className="w-20 h-20 rounded-full mb-4 shadow-md hover:shadow-lg object-cover object-center"
      />
      <div className="text-center">
        <p className="text-lg font-graduate font-semibold text-gray-900 mb-1">
          {name}
        </p>
        <p className="text-gray-900 mb-1">{title}</p>
        <a
          href={facultyPage}
          className="text-darkBlue no-underline hover:text-blue-700 hover:no-underline"
        >
          View Profile
        </a>
      </div>
    </div>
  );
}

export default FacultyMember;
