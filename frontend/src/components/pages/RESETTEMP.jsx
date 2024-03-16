import React, { useState, useEffect, useRef } from "react";
import { loginImg } from "../../images";
import { Icon } from "react-icons-kit";
import { eye, eyeBlocked } from "react-icons-kit/icomoon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const PasswordReset = () => {
  const [pwd, setPwd] = useState("");
  const [matchPwd, setMatchPwd] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const errRef = useRef();

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [pwd, matchPwd]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setErrMsg(
      "Password reset functionality is not implemented in this example."
    );
  };

  return (
    <section
      className="flex flex-col items-center justify-center min-h-screen bg-dodgerblue"
      style={{
        backgroundImage: `url(${loginImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form
        className="bg-white p-8 rounded shadow-md w-96"
        onSubmit={handlePasswordReset}
      >
        <h2 className="text-center text-2xl font-graduate font-bold text-darkBlue mb-4">
          Reset Password
        </h2>

        <div className="relative mt-4">
          <input
            type={showPassword ? "text" : "password"}
            id="new-password"
            placeholder="New Password:"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            className="mt-1 p-2 w-full border rounded focus:outline-none"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-2 cursor-pointer"
          >
            <Icon icon={showPassword ? eyeBlocked : eye} size={20} />
          </span>
        </div>
        <p
          className={`text-gray-700 text-xs ${
            pwdFocus && !validPwd ? "block" : "hidden"
          }`}
        >
          <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
          8 to 24 characters.
          <br />
          Must include uppercase and lowercase letters, a number and a special
          character.
          <br />
          Allowed special characters: ! @ # $ %
        </p>

        <div className="relative mt-2">
          <input
            type={showPassword ? "text" : "password"}
            id="confirm-new-password"
            placeholder="Confirm New Password:"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            required
            className="mt-1 p-2 w-full border rounded focus:outline-none"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-2 cursor-pointer"
          >
            <Icon icon={showPassword ? eyeBlocked : eye} size={20} />
          </span>
        </div>
        <p
          className={`text-gray-700 text-xs ${
            matchFocus && !validMatch ? "block" : "hidden"
          }`}
        >
          <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
          Must match the password input field.
        </p>

        <div
          ref={errRef}
          className={`text-darkBlue font-graduate text-center mt-4 ${
            errMsg ? "block" : "hidden"
          }`}
        >
          {errMsg}
        </div>

        <motion.button
          whileTap={{ scale: 0.85 }}
          type="submit"
          disabled={!validPwd || !validMatch}
          className={` bg-blue-700 ${
            !validPwd || !validMatch ? "bg-gray-400" : "hover:bg-blue-800"
          } text-white py-2 px-4 mt-4 w-full rounded focus:outline-none focus:ring focus:border-blue-800`}
        >
          Reset Password
        </motion.button>
      </form>
    </section>
  );
};

export default PasswordReset;
