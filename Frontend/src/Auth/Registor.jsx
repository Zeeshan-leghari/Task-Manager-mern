import React from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Registor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:4000/register/", data,{
        withCredentials:true
      });
      toast.success("Registration successful!");
      localStorage.setItem("jwt", response.data.token);

      setTimeout(() => {
        navigate("/login");
      }, 1000);
      console.log(response.data);
    } catch (error) {
      const errors = error.response?.data?.errors;
  
      if (errors) {
        if (errors.username) {
          toast.error(errors.username._errors[0]); 
        }
        if (errors.email) {
          toast.error(errors.email._errors[0]); 
        }
        if (errors.password) {
          toast.error(errors.password._errors[0]); 
        }
      } else {
        toast.error(error.response?.data?.message || "Registration failed!");
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-2 border bg-white text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border bg-white text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("email", { 
                required: "Email is required", 
                pattern: {
                  message: "Invalid email address"
                }
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-600 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border bg-white text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-4">
          <span className="text-gray-600">Already have an account? </span>
          <a href="/login" className="text-indigo-600 hover:text-indigo-700">Login</a>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </div>
  );
};

export default Registor;
