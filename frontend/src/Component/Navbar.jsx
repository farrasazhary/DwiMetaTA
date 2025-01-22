import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/logo.png"; // Ganti dengan logo Anda

const ResponsiveAppBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false); // Tutup menu setelah navigasi
  };

  return (
    <nav className="bg-[#f5e1c0] shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="flex items-center">
            <img
              src={logo}
              alt="TBM Kolong Logo"
              className="h-10 w-10 object-contain mr-2"
            />
            <h1 className="text-lg font-bold text-gray-800">TBM Kolong</h1>

            {/* Navigation Links (Dekatkan ke logo) */}
            <div className="flex ml-4 space-x-4 items-center">
              <button
                className="text-lg font-bold text-gray-800 hover:text-gray-600"
                onClick={() => handleNavigate("/InputDataForm")}
              >
                Input Data
              </button>
              
              <button
                className="text-lg font-bold text-gray-800 hover:text-gray-600"
                onClick={() => handleNavigate("/dataanak")}
              >
                Data Anak
              </button>

              <button
                className="text-lg font-bold text-gray-800 hover:text-gray-600"
                onClick={() => handleNavigate("/datanilai")}
              >
                Data Nilai
              </button>

              <button
                className="text-lg font-bold text-gray-800 hover:text-gray-600"
                onClick={() => handleNavigate("/history")}
              >
                History
              </button>
            </div>
          </div>

          {/* Menu Button for Mobile */}
          <div className="flex items-center md:hidden">
            <button
              onClick={handleToggleMenu}
              className="text-gray-800 hover:text-gray-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Profile Section */}
          <div className="hidden md:flex items-center">
            <button
              className="bg-[#DEB887] text-black px-4 py-2 rounded-lg shadow hover:bg-[#8B4513] focus:outline-none"
              onClick={() => navigate("/login")}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ResponsiveAppBar;
