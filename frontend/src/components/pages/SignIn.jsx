import React, { useRef, useState, useEffect } from "react";
import { loginImg } from "../../images";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "react-icons-kit";
import { eye } from "react-icons-kit/icomoon/eye";
import { eyeBlocked } from "react-icons-kit/icomoon/eyeBlocked";
import { useAuth } from "../AuthContext";
import ResetPassModal from "../ResetPassModal";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignIn = () => {
  const userRef = useRef();
  const pwdRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refresh_token"),
  );

const [isModalOpen, setIsModalOpen] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, pwd }),
      });
      const data = await response.json();

      if (data.error) {
        setErrMsg(data.error);
        if (userRef.current) {
          userRef.current.focus();
        }
      } else {
        setEmail("");
        setPwd("");
        login(data.tokens.access_token, data.tokens.refresh_token);
        navigate("/account");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setToken();
    setRefreshToken();
  }, [token, refreshToken]);

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!EMAIL_REGEX.test(email)) {
      setErrMsg("Please enter a valid email address to reset your password.");
      return;
    }
    try {
      await fetch("/reset-password-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setIsModalOpen(true);
          // navigate("/resettemp");
        });
    } catch (error) {
      setErrMsg("This email is not valid.");
    }
  };

  return (
    <>
      <section
        className="flex flex-col items-center justify-center min-h-screen bg-dodgerblue"
        style={{
          backgroundImage: `url(${loginImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md w-96"
        >
          <h1 className="text-center text-2xl font-graduate font-extrabold text-darkBlue mb-2">
            Log In
          </h1>
          <input
            type="email"
            id="email"
            placeholder="Email:"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className="mt-1 p-2 w-full border rounded focus:outline-none"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password:"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              ref={pwdRef}
              className="mt-1 p-2 w-full border rounded focus:outline-none pr-10"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-2 cursor-pointer"
            >
              <Icon icon={showPassword ? eyeBlocked : eye} size={20} />
            </span>
          </div>
          <div className="flex justify-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-blue-800 hover:bg-blue-600 text-white py-2 w-full px-4 mt-4 rounded focus:outline-none focus:ring focus:border-blue-300"
            >
              Sign In
            </motion.button>
          </div>
          <p className="text-gray-700 mt-3 text-center">
            <button
              onClick={handleForgotPassword}
              className="text-gray-700 underline"
            >
              Forgot Password
            </button>
            <br />
            <br />
            Need an Account?
            <br />
            <span className="line">
              <Link to="/signup" className="text-gray-700">
                Sign Up
              </Link>
            </span>
          </p>
          <div className="text-center">
            <p
              ref={errRef}
              className={` text-darkBlue font-graduate font-bold py-2 px-4 mb-2 ${errMsg ? "" : "hidden"}`}
            >
              {errMsg}
            </p>
          </div>
        </form>
      </section>
      <ResetPassModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default SignIn;
