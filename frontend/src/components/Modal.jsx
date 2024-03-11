// CustomModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

Modal.setAppElement('#root');

function CustomModal({ isOpen, onRequestClose, email, pwd }) {
  const [errMsg, setErrMsg] = useState('');

  // const handleSubmit = async (role) => {
  //   try {
  //     const response = await axios.post('/api/signup', JSON.stringify({ email, pwd, role }), {
  //       headers: { 'Content-Type': 'application/json' },
  //       withCredentials: true
  //     });
  //     console.log(response.data)
  //   } catch (err) {
  //     console.error('Error submitting student application:', err);
  //     setErrMsg('Failed to submit student application. Please try again later.');
  //   }
  // };
  //

    const handleSubmit = async (role) => {
      const signUpData = { email, pwd, role };
      try {
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(signUpData),
          credentials: 'include' // Equivalent to axios's withCredentials: true
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
      } catch (err) {
        console.error('Error submitting student application:', err);
        setErrMsg('Failed to submit student application. Please try again later.');
      }
    };


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
      className="fixed inset-0 flex items-center justify-center"
    >
      <div className="bg-gray-100 p-16 max-w-md w-full relative border-1 border-gray-500 rounded-md">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-4xl"
          onClick={onRequestClose}
        >
          &times;
        </button>
        <h2 className="text-2xl text-center font-bold mb-4">Finish Registration</h2>
        <p className="text-lg">Would you like to register as a student or client?</p>
        <div className="mt-4 flex space-x-6 justify-center ">
          <Link
            to="/student"
            className="bg-Blue text-white px-4 py-2 rounded hover:bg-darkBlue focus:outline-none no-underline focus:ring focus:border-lightBlue active:bg-lightBlue"
            onClick={() => handleSubmit('student')}
          >
            Student
          </Link>
          <Link
            to="/client"
            className="bg-Blue text-white px-8 py-2 rounded hover:bg-darkBlue focus:outline-none no-underline focus:ring focus:border-lightBlue active:bg-lightBlue"
            onClick={() => handleSubmit('client')}
          >
            Client
          </Link>
        </div>
        {errMsg && <p className="text-red-500 mt-2">{errMsg}</p>}
      </div>
    </Modal>
  );
}

export default CustomModal;
