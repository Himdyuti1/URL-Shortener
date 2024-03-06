import React, { useEffect } from 'react';
import logo from '../../assets/Logo.svg';
import { useState } from 'react'
import instance from '../../axios';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../../MyContexts/StateProvider';

export default () => {
    const [errorMsg, setErrorMsg] = useState(''); // [1]
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [{token},dispatch]=useStateValue();

    const navigate=useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        try {
            const response = await instance.post('/api/createToken', {
                email: email,
                password: password
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            dispatch({
                type: 'SET_TOKEN',
                token: response.data.access_token,
                premium: response.data.premium
            });
            navigate('/');
        } catch (error) {
            console.log("error",error.response.data.error);
            setErrorMsg(error.response.data.error);
        }
    };

    return (
        <main className="w-full h-screen flex flex-col items-center justify-center px-4 bg-dark-gray">
            <div className="max-w-sm w-full text-whitespace-y-5">
                <div className="text-center pb-8">
                    <img src={logo} className="mx-auto h-[150px] w-[2000px]" />
                    <div className="mt-4">
                        <h3 className="text-white text-2xl font-bold sm:text-3xl">Log in to your account</h3>
                    </div>
                </div>
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="space-y-3 text-white"
                >
                    <div>
                        <label className="font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            className="caret-indigo-600 w-full mt-2 px-3 py-2 text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            className="caret-indigo-600 w-full mt-2 px-3 py-2 text-white bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="text-red-500">
                        {errorMsg}
                    </div>
                    <button
                        className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                        onClick={(e)=>handleSubmit(e)}
                    >
                        Sign in
                    </button>
                </form>
                <button className="text-white mt-5 w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium hover:bg-gray-50 hover:text-black duration-150 active:bg-gray-100">
                    <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_17_40)">
                            <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
                            <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
                            <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
                            <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335" />
                        </g>
                        <defs>
                            <clipPath id="clip0_17_40">
                                <rect width="48" height="48" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    Continue with Google
                </button>
                <p className="text-center mt-5 text-white">Don't have an account? <a href="/SignUp" className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</a></p>
            </div>
        </main>
    )
}