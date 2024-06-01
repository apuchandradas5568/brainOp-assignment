import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // Assuming you have react-router-dom installed

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMessage(null); // Clear any previous errors

    try {
      // Simulate API call for login (replace with your actual API call)
      const res = axios
        .post("http://localhost:3333/auth/sign-in", data, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data.data);
          localStorage.setItem("userdata", JSON.stringify(res.data.data));
          if (res.data.success === true) {
            setSuccessMessage("SignIn successful! Welcome to MelodyVerse");
            navigate("/posts");
          } else {
            setErrorMessage(res.data.error);
          }
        });

      // if (response.ok) {
      //     setSuccessMessage('Login successful!');
      //     // Simulate storing user data in local storage (replace with your logic)
      //     localStorage.setItem('user', JSON.stringify(data));
      //     navigate('/posts'); // Redirect to post list after successful login
      // } else {
      //     throw new Error('Login failed');
      // }
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
    <div className="flex items-center justify-center h-screen">
      <div className="login-container signup-container h-fit   lg:max-w-[600px] container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">MelodyVerse Login</h1>
        {errorMessage && (
          <p className="text-red-500 text-base mb-4">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-green-500 text-base mb-4">{successMessage}</p>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email format",
                },
              })}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm w-full p-2.5 text-gray-700 border border-gray-300"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: 8,
                message: "Password must be at least 8 characters",
              })}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm w-full p-2.5 text-gray-700 border border-gray-300"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
