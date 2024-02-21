// CustomModal.js
import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

Modal.setAppElement('#root');

function CustomModal({ isOpen, onRequestClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
      className="fixed inset-0 flex items-center justify-center"
    >

    <div className="bg-gray-100 p-16 max-w-md w-full relative border-1 border-gray-500  rounded-md"> {/* Added border classes */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-4xl"
          onClick={onRequestClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Register Now!</h2>
        <p className="text-lg">Would you like to register as a client or student?</p>
        <div className="mt-4 flex space-x-6 justify-center ">
          <Link
            to="/client"
            className="bg-Blue text-white px-8 py-2 rounded hover:bg-darkBlue focus:outline-none focus:ring focus:border-lightBlue active:bg-lightBlue "
            onClick={onRequestClose}
          >
            Client
          </Link>
          <Link
            to="/student"
            className="bg-Blue text-white px-4 py-2 rounded hover:bg-darkBlue focus:outline-none focus:ring focus:border-lightBlue active:bg-lightBlue"
          >
            Student
          </Link>
        </div>
      </div>
    </Modal>
  );
}

export default CustomModal;