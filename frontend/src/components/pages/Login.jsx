import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../../api/axios';

// SET USERNAME AND PASSWORD RULES
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/login';

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

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
                  <p ref={errRef} className={`text-firebrick font-bold py-2 px-4 mb-2 ${errMsg ? '' : 'hidden'}`} aria-live="assertive">{errMsg}</p>
                  <h1 className="text-3xl font-extrabold text-Blue sm:text-5xl mb-4">Register</h1>
                  <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
                      {/* Username Input Field */}
                      <label htmlFor="username" className="text-gray-700">
                          Username:
                          <FontAwesomeIcon icon={faCheck} className={validName ? "text-limegreen" : "hidden"} />
                          <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hidden" : "text-red"} />
                      </label>
                      <input
                          type="text"
                          id="username"
                          ref={userRef}
                          autoComplete="off"
                          onChange={(e) => setUser(e.target.value)}
                          value={user}
                          required
                          className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
                          aria-invalid={validName ? "false" : "true"}
                          aria-describedby="uidnote"
                          onFocus={() => setUserFocus(true)}
                          onBlur={() => setUserFocus(false)}
                      />
                      <p id="uidnote" className={`text-gray-700 text-xs ${userFocus && user && !validName ? 'block' : 'hidden'}`}>
                          <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                          4 to 24 characters.<br />
                          Must begin with a letter.<br />
                          Letters, numbers, underscores, hyphens allowed.
                      </p>
  
                      {/* Password Input Field */}
                      <label htmlFor="password" className="py-2 text-gray-700">
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
                          aria-invalid={validPwd ? "false" : "true"}
                          aria-describedby="pwdnote"
                          onFocus={() => setPwdFocus(true)}
                          onBlur={() => setPwdFocus(false)}
                      />
                      <p id="pwdnote" className={`text-gray-700 text-xs ${pwdFocus && !validPwd ? 'block' : 'hidden'}`}>
                          <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                          8 to 24 characters.<br />
                          Must include uppercase and lowercase letters, a number and a special character.<br />
                          Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                      </p>
  
                      {/* Confirm Password Input Field */}
                      <label htmlFor="confirm_pwd" className="py-2 text-gray-700">
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
                          aria-invalid={validMatch ? "false" : "true"}
                          aria-describedby="confirmnote"
                          onFocus={() => setMatchFocus(true)}
                          onBlur={() => setMatchFocus(false)}
                      />
                      <p id="confirmnote" className={`text-gray-700 text-xs ${matchFocus && !validMatch ? 'block' : 'hidden'}`}>
                          <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                          Must match the first password input field.
                      </p>
  
                      {/* Submit Button */}
                      <button disabled={!validName || !validPwd || !validMatch} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">Sign Up</button>
                    
                      <p className="text-gray-700">
                        Already registered?<br />
                        <span className="line">
                          {/* WILL SET UP ROUTING FOR SIGN IN PAGE */}
                          <a href="#" className="text-gray-700">Sign In</a>
                        </span>
                      </p>
                  </form>
              </section>
          )}
      </>
  )
}

export default Login