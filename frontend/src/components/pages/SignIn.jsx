import React, { useRef, useState, useEffect } from 'react'
import CustomModal from '../Modal';

const SignIn = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        console.log(pwd);
        setUser('');
        setPwd('');
        setSuccess(true);
    }

    return (
        <>
            {success ? (
                <section className="flex flex-col items-center justify-center min-h-screen bg-dodgerblue">
                    <h1 className="text-blue">Welcome to Cypher.</h1>
                    <br />
                    <p>
                        {/*put router link here*/}
                        <a href="/home" className="text-blue">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section className="flex flex-col items-center justify-center min-h-screen bg-dodgerblue">
                    <p ref={errRef} className={`text-firebrick font-bold py-2 px-4 mb-2 ${errMsg ? '' : 'hidden'}`}>{errMsg}</p>
                    <h1 className="text-3xl font-extrabold text-Blue sm:text-5xl mb-4">Sign In</h1>
                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
                        <label htmlFor="username" className="text-gray-700">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
                        />

                        <label htmlFor="password" className="py-2 text-gray-700">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
                        />
                        <button className="bg-blue-500  hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300">Sign In</button>
                        <p className="text-gray-700">
                            Need an Account?<br />
                            <span className="line">
                                <a href="#" className="text-gray-700" onClick={openModal}>Fill Out Application</a>
                            </span>
                        </p>
                    </form>
                </section>
            )}
            <CustomModal isOpen={isModalOpen} onRequestClose={closeModal} />
        </>
    );
};

export default SignIn;