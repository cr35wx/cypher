import React, { useRef, useState, useEffect } from 'react'
import { loginImg } from '../../images';
import { Link } from 'react-router-dom';

const SignIn = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email);
        console.log(pwd);
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, pwd }),
        }).then(response => response.json())
            .then(data => {
                if (data.error) {
                    setErrMsg(data.error);
                    userRef.current.focus();
                } else {
                    setEmail('');
                    setPwd('');
                    setSuccess(true);
                }
            }).catch(err => {
                console.log(err);
            });

    }

    return (
        <>
            {success ? (
                <section className="flex flex-col items-center justify-center min-h-screen bg-dodgerblue">
                    <h1 className="text-blue">Welcome to Cypher.</h1>
                    <br />
                    <p>
                        <Link to="/home" className="text-blue">Go to Home</Link>
                    </p>
                </section>
            ) : (
                <section className="flex flex-col items-center justify-center min-h-screen bg-dodgerblue"
                    style={{ backgroundImage: `url(${loginImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                    <p ref={errRef} className={` text-white font-bold py-2 px-4 mb-2 ${errMsg ? '' : 'hidden'}`}>{errMsg}</p>
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
                        <h1 className="text-center text-3xl font-extrabold text-blue-700 mb-2">Log In</h1>
                        <label htmlFor="email" className="text-gray-700">Email:</label>
                        <input
                            type="email"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            className="mt-1 p-2 w-full border rounded focus:outline-none"
                        />

                        <label htmlFor="password" className="py-2 text-gray-700">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            className="mt-1 p-2 w-full border rounded focus:outline-none"
                        />
                        <div className="flex justify-center">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mt-4 rounded focus:outline-none focus:ring focus:border-blue-300">Sign In</button>
                        </div>
                        <p className="text-gray-700 mt-3 text-center">
                            Need an Account?<br />
                            <span className="line">
                                <Link to="/signup" className="text-gray-700">Sign Up</Link>
                            </span>
                        </p>
                    </form>
                </section>
            )}
        </>
    );
};

export default SignIn;