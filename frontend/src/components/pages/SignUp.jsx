import React, { useRef, useState, useEffect } from 'react';
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loginImg } from '../../images';
import { Link } from 'react-router-dom';
import CustomModal from "../Modal";

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

    return (
        <>
            {success ? (
                <section className="flex flex-col items-center justify-center min-h-screen bg-dodgerblue"
                    style={{ backgroundImage: `url(${loginImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                    <div className="bg-white p-8 rounded shadow-md w-96">
                        <p className="text-bold text-2xl text-gray-500 text-center">Please fill out our application to create an account.</p>
                        <div className="flex justify-center">
                            <button
                                onClick={openModal}
                                class="block w-full rounded bg-Blue px-12 py-3 text-xl font-medium text-white shadow hover:bg-darkBlue focus:outline-none focus:ring active:bg-lightBlue sm:w-auto"
                            >
                                Register
                            </button>
                        </div>
                    </div>
                    <CustomModal isOpen={isModalOpen} onRequestClose={closeModal} email={email} pwd={pwd} />
                </section >
            ) : (
                <section className="flex flex-col items-center justify-center min-h-screen bg-dodgerblue"
                    style={{ backgroundImage: `url(${loginImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                    <p ref={errRef} className={`text-white font-bold py-2 px-4 mb-2 ${errMsg ? '' : 'hidden'}`}>{errMsg}</p>
                    <form className="bg-white p-8 rounded shadow-md w-96">
                        <h1 className="text-center text-3xl font-extrabold text-blue-700 mb-2">Register</h1>

                        {/* Email Input Field */}
                        <label htmlFor="email" className="text-gray-700">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
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
                        <label className="py-2 text-gray-700">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            className="mt-1 p-2 w-full border rounded focus:outline-none"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p className={`text-gray-700 text-xs ${pwdFocus && !validPwd ? 'block' : 'hidden'}`}>
                            <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: ! @ # $ %
                        </p>

                        {/* Confirm Password Input Field */}
                        <label className="py-2 text-gray-700">
                            Confirm Password:
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            className="mt-1 p-2 mb-2 w-full border rounded focus:outline-none focus:border-blue-500"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p className={`text-gray-700 text-xs ${matchFocus && !validMatch ? 'block' : 'hidden'}`}>
                            <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                            Must match the password input field.
                        </p>


                        <div className="flex justify-center">
                            <button onClick={handleSignUp} disabled={!validEmail || !validPwd || !validMatch} className={`bg-blue-700 ${(!validEmail || !validPwd || !validMatch) ? 'bg-gray-400' : 'hover:bg-blue-600'} text-white py-2 px-4 mt-4 rounded focus:outline-none focus:ring focus:border-blue-300`}>Sign Up</button>
                        </div>
                        <p className="text-gray-700 mt-3 text-center">
                            Have an account?<br />
                            <span className="line">
                                <Link to="/login" className="text-gray-700">Sign In</Link>
                            </span>
                        </p>
                    </form>
                </section>
            )}
        </>
    );
};

export default SignUp;