import React, { useRef, useState, useEffect } from 'react';
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loginImg } from '../../images';
import { Link } from 'react-router-dom';
import CustomModal from "../Modal";
import { motion } from 'framer-motion';
import { Icon } from 'react-icons-kit';
import { eye } from 'react-icons-kit/icomoon/eye';
import { eyeBlocked } from 'react-icons-kit/icomoon/eyeBlocked';

// SET EMAIL AND PASSWORD REGEX
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignUp = () => {
    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd, matchPwd]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/check-email', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'email': email
                }
            });
            const data = await response.json();
            if (response.ok) {
                setSuccess(true);
            } else {
                setErrMsg(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrMsg('An unexpected error occurred');
        }
    };

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            {success ? (
                <section className="flex flex-col items-center justify-center min-h-screen bg-dodgerblue"
                    style={{ backgroundImage: `url(${loginImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                    <div className="bg-white p-8 rounded shadow-md w-4/6">
                        <h1 className="text-bold text-2xl font-graduate text-blue-800 text-center">Please fill out our application to create an account.</h1>
                        <div className="flex justify-center">
                            <motion.button
                                whileTap={{ scale: 0.90 }}
                                onClick={openModal}
                                className="block w-full rounded bg-Blue px-12 py-3 text-xl font-medium text-white shadow hover:bg-darkBlue focus:outline-none focus:ring sm:w-auto"
                            >
                                Apply
                            </motion.button>
                        </div>
                    </div>
                    <CustomModal isOpen={isModalOpen} onRequestClose={closeModal} email={email} pwd={pwd} />
                </section >
            ) : (
                <section className="flex flex-col items-center justify-center min-h-screen bg-dodgerblue"
                    style={{ backgroundImage: `url(${loginImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                    <form className="bg-white p-8 rounded shadow-md w-96">
                        <h1 className="text-center text-2xl font-graduate font-extrabold text-darkBlue mb-2">Registration</h1>

                        {/* Email Input Field */}
                        <input
                            type="email"
                            id="email"
                            placeholder='Email:'
                            ref={emailRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            className="mt-1 p-2 w-full border rounded focus:outline-none"
                        />
                        {/* Descriptive text */}
                        <p className={`text-gray-700 text-xs ${!validEmail && email ? 'block' : 'hidden'}`}>
                            <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                            Please enter a valid email address.
                        </p>

                        {/* Password Input Field */}

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder='Password:'
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                                className="mt-1 p-2 w-full border rounded focus:outline-none"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <span onClick={togglePasswordVisibility} className="absolute right-2 top-2 cursor-pointer">
                                <Icon icon={showPassword ? eyeBlocked : eye} size={20} />
                            </span>
                        </div>
                        <p className={`text-gray-700 text-xs ${pwdFocus && !validPwd ? 'block' : 'hidden'}`}>
                            <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: ! @ # $ %
                        </p>

                        {/* Confirm Password Input Field */}
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="confirm_pwd"
                                placeholder='Confirm Password:'
                                onChange={(e) => setMatchPwd(e.target.value)}
                                value={matchPwd}
                                required
                                className="mt-1 p-2 mb-2 w-full border rounded focus:outline-none focus:border-blue-500"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <span onClick={togglePasswordVisibility} className="absolute right-2 top-2 cursor-pointer">
                                <Icon icon={showPassword ? eyeBlocked : eye} size={20} />
                            </span>
                        </div>

                        <p className={`text-gray-700 text-xs ${matchFocus && !validMatch ? 'block' : 'hidden'}`}>
                            <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                            Must match the password input field.
                        </p>


                        <div className="flex justify-center">
                            <button
                                onClick={handleSignUp}
                                disabled={!validEmail || !validPwd || !validMatch}
                                className={` bg-blue-700 ${(!validEmail || !validPwd || !validMatch) ? 'bg-gray-400' : 'hover:bg-blue-800'} text-white py-2 px-4 mt-4 w-full rounded focus:outline-none focus:ring focus:border-blue-800`}
                            >
                                Sign Up
                            </button>
                        </div>
                        <p className="text-gray-700 mt-3 text-center">
                            Have an account?<br />
                            <span className="line">
                                <Link to="/login" className="text-gray-700">Sign In</Link>
                            </span>
                        </p>
                        <div className="text-center">
                            <p ref={errRef} className={`text-darkBlue font-graduate font-bold py-2 px-4 mb-2 ${errMsg ? '' : 'hidden'}`}>{errMsg}</p>
                        </div>
                    </form>
                </section>
            )}
        </>
    );
};

export default SignUp;
