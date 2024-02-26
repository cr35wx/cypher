// SHOULD HAVE PROBABLY CALLED THIS SignUp.jsx

import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../../api/axios';

// SET USERNAME AND PASSWORD RULES
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/login';

const SignUp = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    // NOT FULLY CONNECTED YET TO BACKEND
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //console.log(user);
            //console.log(pwd);
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);

            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section className="flex flex-col items-center justify-center min-h-screen bg-dodgerblue">
                    <h1 className="text-white">Success!</h1>
                    <p>
                        {/* SET UP ROUTING FOR SIGN IN PAGE */}
                        <a href="#" className="text-white">Sign In</a>
                    </p>
                </section>
            ) : (
                <section className="flex flex-col items-center justify-center min-h-screen bg-dodgerblue">
                    <p ref={errRef} className={`text-firebrick font-bold py-2 px-4 mb-2 ${errMsg ? '' : 'hidden'}`}>{errMsg}</p>
                    <h1 className="text-3xl font-extrabold text-Blue sm:text-5xl mb-4">Register</h1>
                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
                        {/* Username Input Field */}
                        <label htmlFor="email" className="text-gray-700">Email:</label>
                        <input
                            type="email"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
                        />

                        {/* Password Input Field */}
                        <label className="py-2 text-gray-700">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "text-limegreen" : "hidden"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hidden" : "text-red"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
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
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "text-limegreen" : "hidden"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hidden" : "text-red"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p className={`text-gray-700 text-xs ${matchFocus && !validMatch ? 'block' : 'hidden'}`}>
                            <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                            Must match the first password input field.
                        </p>

                        {/* Submit Button */}
                        <button disabled={!validName || !validPwd || !validMatch} className={`bg-blue-500 ${(!validName || !validPwd || !validMatch) ? 'bg-gray-400' : 'hover:bg-blue-600'} text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300`}>Sign Up</button>

                        <p className="text-gray-700">
                            Have an account?<br />
                            <span className="line">
                                {/* WILL SET UP ROUTING FOR SIGN IN PAGE */}
                                <a href="#" className="text-gray-700">Sign In</a>
                            </span>
                        </p>
                    </form>
                </section>
            )}
        </>
    );
}

export default SignUp;