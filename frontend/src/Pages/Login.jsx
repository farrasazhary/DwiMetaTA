// import React from 'react'
// import gambar from '../Assets/logo.png';
// const Login = () => {
//   return (
//     <div className="container loginpages">
// 	<div className="screen">
// 		<div className="screen__content">

// 			  {/* TBM Logo */}
// 			  <div className="logo-container">
// 			  <img src={gambar} alt="TBM Logo" className="tbm-logo"width={100} />
//           </div>

// 		  {/* Welcome and Instruction Text */}
// 		  <h2 className="welcome-text">Welcome to TBM Kolong</h2>
//           <p className="login-instruction">Please login to your account</p>

// 			<form className="login">
// 				<div>
// 				<div className="login__field">
// 					<i className="login__icon fas fa-user"></i>
// 					<input type="text" className="login__input" placeholder="User name / Email"/>
// 				</div>
// 				<div className="login__field">
// 					<i className="login__icon fas fa-lock"></i>
// 					<input type="password" className="login__input" placeholder="Password"/>
// 					</div>
// 				</div>
// 				<button className="button login__submit">
// 					<span className="button__text">Login</span>
// 					<i className="button__icon fas fa-chevron-right"></i>
// 				</button>
// 				{/* Forgot Password Link */}
// 				<p className="forgot-password">Forgot password?</p>
// 			</form>

// 		</div>
// 		<div className="screen__background">
// 			<span className="screen__background__shape screen__background__shape4"></span>
// 			<span className="screen__background__shape screen__background__shape3"></span>
// 			<span className="screen__background__shape screen__background__shape2"></span>
// 			<span className="screen__background__shape screen__background__shape1"></span>
// 		</div>
// 	</div>
// </div>
//   )
// }

// export default Login

import React, { useState } from "react";
import gambar from "../Assets/logo.png";
import backgroundImage from "../Assets/gambar-bg.jpeg"; // Impor gambar latar belakang

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    setErrorMessage(""); // Reset pesan error

    try {
      const response = await fetch(
        `http://localhost:${process.env.REACT_APP_API_PORT}/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        // Login berhasil, redirect ke halaman dashboard
        window.location.href = "/"; // Redirect ke halaman tujuan
      } else {
        // Login gagal
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})` }} // Menambahkan gambar latar belakang
    >
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg bg-opacity-3">
        {/* TBM Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={gambar}
            alt="TBM Logo"
            className="object-contain w-24 h-24"
          />
        </div>

        {/* Welcome and Instruction Text */}
        <h2 className="mb-2 text-2xl font-bold text-center text-gray-800">
          Welcome to TBM Kolong
        </h2>
        <p className="mb-6 text-center text-gray-600">
          Please login to your account
        </p>

        {/* Error Message */}
        {errorMessage && (
          <p className="mb-4 text-sm text-center text-red-500">
            {errorMessage}
          </p>
        )}

        {/* Login Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center border-b-2 border-gray-300">
            <i className="mr-2 text-gray-600 fas fa-user"></i>
            <input
              type="text"
              placeholder="Username / Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="flex-1 py-2 px-3 outline-none focus:ring-2 focus:ring-yellow-500 bg-[#FFEBCD] text-gray-500 border-b-2 border-gray-200" // Background color updated
              required
            />
          </div>

          <div className="flex items-center border-b-2 border-gray-300">
            <i className="mr-2 text-gray-600 fas fa-lock"></i>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 py-2 px-3 outline-none focus:ring-2 focus:ring-yellow-500 bg-[#FFEBCD] text-gray-800 border-b-2 border-gray-200" // Background color updated
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-[#FFEBCD] text-gray-500 font-bold rounded-md hover:bg-yellow-500 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
