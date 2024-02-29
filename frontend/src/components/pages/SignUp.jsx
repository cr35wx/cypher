import React, { useRef, useState, useEffect } from 'react';
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loginImg } from '../../images';
import { Link } from 'react-router-dom';
// dont need to use axios, doesnt matter
import axios from '../../api/axios';

// SET PASSWORD RULES
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/signup';

const SignUp = () => {
    const emailRef = useRef();
    const errRef = useRef();

    const [role, setRole] = useState('');

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


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(REGISTER_URL, JSON.stringify({ email, pwd, role }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            console.log(email);
            console.log(pwd);
            console.log(role);
            setSuccess(true);
            setEmail('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err.response) {
                setErrMsg('No Server Response');
            } else if (err.response.status === 409) {
                setErrMsg('Email already in use');
            } else {
                setErrMsg('Registration Failed');
            }
            errRef.current.focus();
        }
    };

    return (
        <>
            {success ? (
                <section className="flex flex-col items-center justify-center min-h-screen bg-dodgerblue"
                    style={{ backgroundImage: `url(${loginImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                    <div className="bg-white p-8 rounded shadow-md w-96">
                        <h1 className="text-bold text-blue-700 text-center">Welcome to Cypher.</h1>
                        <p>You are a {role}</p>
                    </div>
                </section>
            ) : (
                <section className="flex flex-col items-center justify-center min-h-screen bg-dodgerblue"
                    style={{ backgroundImage: `url(${loginImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                    <p ref={errRef} className={`text-white font-bold py-2 px-4 mb-2 ${errMsg ? '' : 'hidden'}`}>{errMsg}</p>
                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
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
                            Must match the first password input field.
                        </p>

                        {/* SELECT RBAC ROLE */}
                        <select
                            id="role"
                            name="role"
                            onChange={(e) => setRole(e.target.value)}
                            value={role}
                            required
                            className="mt-1 p-2 w-full border rounded focus:outline-none"
                        >
                            <option value="">Select Role</option>
                            <option value="student">Student</option>
                            <option value="student_leader">Student Leader</option>
                            <option value="admin_assistant">Admin Assistant</option>
                            <option value="clinic_director">Clinic Director</option>
                            <option value="board_of_directors">Board of Directors</option>
                        </select>

                        <div className="flex justify-center">
                            <button disabled={!validEmail || !validPwd || !validMatch || !role} className={`bg-blue-500 ${(!validEmail || !validPwd || !validMatch || !role) ? 'bg-gray-400' : 'hover:bg-blue-600'} text-white py-2 px-4 mt-4 rounded focus:outline-none focus:ring focus:border-blue-300`}>Sign Up</button>
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