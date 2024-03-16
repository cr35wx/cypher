import React, { useState, useEffect, useRef } from 'react';
import { Icon } from 'react-icons-kit';
import { eye, eyeBlocked } from 'react-icons-kit/icomoon';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const PasswordReset = () => {
    const [pwd, setPwd] = useState('');
    const [matchPwd, setMatchPwd] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const [validPwd, setValidPwd] = useState(false);
    const [validMatch, setValidMatch] = useState(false);

    const errRef = useRef();

    

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [pwd, matchPwd]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setErrMsg("Password reset functionality is not implemented in this example.");
    };

    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <form className="bg-white p-8 rounded shadow-md w-96" onSubmit={handlePasswordReset}>
                <h2 className="text-center text-2xl font-bold mb-4">Reset Password</h2>
                
                
                <div className="relative mt-4">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="new-password"
                        placeholder='New Password:'
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        className="mt-1 p-2 w-full border rounded focus:outline-none"
                    />
                    <span onClick={togglePasswordVisibility} className="absolute right-2 top-2 cursor-pointer">
                        <Icon icon={showPassword ? eyeBlocked : eye} size={20} />
                    </span>
                </div>
                
                <div className="relative mt-4">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="confirm-new-password"
                        placeholder='Confirm New Password:'
                        onChange={(e) => setMatchPwd(e.target.value)}
                        value={matchPwd}
                        required
                        className="mt-1 p-2 w-full border rounded focus:outline-none"
                    />
                    <span onClick={togglePasswordVisibility} className="absolute right-2 top-2 cursor-pointer">
                        <Icon icon={showPassword ? eyeBlocked : eye} size={20} />
                    </span>
                </div>
                
                <div ref={errRef} className={`text-red-500 text-center mt-2 ${errMsg ? 'block' : 'hidden'}`}>
                    {errMsg}
                </div>
                
                <button
                    type="submit"
                    disabled={!validPwd || !validMatch}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-6"
                >
                    Reset Password
                </button>
            </form>
        </section>
    );
};

export default PasswordReset;

