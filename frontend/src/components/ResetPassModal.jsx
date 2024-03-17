import React, { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

function ResetPassModal({ isOpen, onRequestClose }) {
  const [code, setCode] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code.length !== 5) {
      setErrMsg("Code must be 5 characters long.");
      return;
    }
    try {
      const response = await fetch("/verify-reset-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        console.log(data);
        onRequestClose();
        navigate("/resettemp");
      } else {
        setErrMsg(data.error);
      }
    } catch (err) {
      setErrMsg("This code is not valid.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Reset Password Code Verification"
      className="fixed inset-0 flex items-center justify-center"
    >
      <div className="bg-gray-100 p-16 max-w-md w-full relative border-1 border-gray-500 rounded-md">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-4xl"
          onClick={onRequestClose}
        >
          &times;
        </button>
        <h3 className="text-xl text-center font-bold mb-4">
          A code has been sent to your email.
        </h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength="5"
            className="text-center w-full p-2 border rounded"
            placeholder="5-character code"
            required
          />
          {errMsg && <p className="text-red-500 mt-2">{errMsg}</p>}
          <div className="mt-4 flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Verify Code
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default ResetPassModal;
