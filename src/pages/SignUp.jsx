import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'; 
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Signup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true);
        setErrorMessage(null); 

        try {

            const res = axios.post('http://localhost:3333/auth/sign-up', data, { withCredentials: true })
            .then((res) => {

                console.log(res.data);
                if(res.data.success === true){
                    setSuccessMessage('Signup successful! Welcome to MelodyVerse')
                    navigate("/sign-in")

                } else{
                    setErrorMessage(res.data.error);
                }
            })

        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Clear messages after a few seconds
        const timeoutId = setTimeout(() => {
            setSuccessMessage(null);
            setErrorMessage(null);
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, [successMessage, errorMessage]);

    return (
       <div className=' flex items-center justify-center h-screen ' >
         <div className="signup-container h-fit   lg:max-w-[600px] container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">MelodyVerse Signup</h1>
            {errorMessage && <p className="text-red-500 text-base mb-4">{errorMessage}</p>}
            {successMessage && <p className="text-green-500 text-base mb-4">{successMessage}</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-4">
                    <label htmlFor="username" className="block text-sm font-medium mb-2">Username *</label>
                    <input
                        type="text"
                        id="username"
                        {...register('username', { required: 'Username is required' })}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm w-full p-2.5 text-gray-700 border border-gray-300"
                    />
                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email *</label>
                    <input
                        type="email"
                        id="email"
                        {...register('email', { required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email format' } })}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm w-full p-2.5 text-gray-700 border border-gray-300"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="password" className="block text-sm font-medium mb-2">Password *</label>
                    <input
                        type="password"
                        id="password"
                        {...register('password', { required: 'Password is required & must be 8 characters', minLength: 8, message: 'Password must be at least 8 characters' })}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm w-full p-2.5 text-gray-700 border border-gray-300"
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                    <input
                        type="text"
                        id="name"
                        {...register('name', { required: false })}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm w-full p-2.5 text-gray-700 border border-gray-300"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="profileImage" className="block text-sm font-medium mb-2">Profile Image</label>
                    <input
                        type="file"
                        id="profileImage"
                        {...register('profileImage', { required:false })}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm w-full p-2.5 text-gray-700 border border-gray-300"
                    />
                    {errors.profileImage && <p className="text-red-500 text-sm mt-1">{errors.profileImage.message}</p>}
                </div>
                <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-md">Sign Up</button>
            </form>
        </div>
       </div>
    );
};

export default Signup;
