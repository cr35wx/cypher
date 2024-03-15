import React, { useState, useEffect } from 'react'
import { useAuth } from '../AuthContext';
import { loginImg } from '../../images';
import { useNavigate } from 'react-router-dom';
import { RotateLoader } from 'react-spinners';

const Account = () => {
    const { logout, userRole } = useAuth();
    const navigate = useNavigate();
    const [accountDetails, setAccountDetails] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const fetchAccountDetails = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/user-details', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setAccountDetails(data);
                localStorage.setItem('accountDetails', JSON.stringify(data));
            } else {
                console.error('Failed to fetch account details:', response.status);
            }
        } catch (error) {
            console.error('Failed to fetch account details:', error.message);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
                window.location.reload();
            }, 3000);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('/logout', {
                method: 'GET',
                credentials: 'include',
            });
            if (response.ok) {
                logout();
                navigate('/login');
            } else {
                console.error('Logout failed:', response.status);
            }
        } catch (error) {
            console.error('Logout failed:', error.message);
        }
    };

    useEffect(() => {
        const storedDetails = localStorage.getItem('accountDetails');
        if (storedDetails) {
            setAccountDetails(JSON.parse(storedDetails));
            setIsLoading(false); 
        } else {
            fetchAccountDetails();
        }
    }, []);

    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-dodgerblue"
        style={{ backgroundImage: `url(${loginImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
        <div className="flex bg-white p-8 rounded justify-center items-center shadow-md w-96 flex-col">
            <h1 className="text-center text-2xl font-graduate font-extrabold text-darkBlue mb-4">Welcome Back</h1>
            {isLoading ? (
                    <div className="text-center mb-4">
                        <RotateLoader color="#000000" size={3} speed={2000} />
                        <p className="text-center font-graduate font-extrabold text-darkBlue mt-4 mb-4">
                            Loading account details...
                        </p>
                    </div>
                ) : (
                    <>
                        {accountDetails && (
                            <div>
                                {userRole === 'student' && accountDetails.StudentUser && (
                                    <div>
                                        <p className="text-center font-graduate font-extrabold mb-4">
                                            Email: {accountDetails.StudentUser[0].email}
                                        </p>
                                        <p className="text-center font-graduate font-extrabold mb-4">
                                            Name: {accountDetails.StudentUser[0].first_name} {accountDetails.StudentUser[0].last_name}
                                        </p>
                                    </div>
                                )}
                                {userRole === 'client' && accountDetails.ClientUser && (
                                    <div>
                                        <p className="text-center font-graduate font-extrabold mb-4">
                                            Email: {accountDetails.ClientUser[0].org_contact_email}
                                        </p>
                                        <p className="text-center font-graduate font-extrabold mb-4">
                                            Organization: {accountDetails.ClientUser[0].org_name}
                                        </p>
                                        <p className="text-center font-graduate font-extrabold mb-4">
                                            Name: {accountDetails.ClientUser[0].org_contact_fname} {accountDetails.ClientUser[0].org_contact_lname}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}
            <div className="relative flex justify-center items-center">
                <button onClick={handleLogout} className="bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded">
                    Logout
                </button>
            </div>
        </div>
    </section >
    )
}

export default Account