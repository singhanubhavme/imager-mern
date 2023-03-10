import React, { useState, useEffect } from 'react';
import Logo from '../icons/logo.png';
import { RegisterIcon, LoginIcon } from '../icons/icons';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {

  useEffect(() => {
    if (localStorage.getItem('username') && localStorage.getItem('token')) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);


  const Logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-16">
        <div className="flex flex-col">
          <nav
            className="flex justify-around py-4 bg-white/80 backdrop-blur-md shadow-md w-full fixed top-0 left-0 right-0 z-11"
          >
            <div className="flex items-center">
              <Link to="/" className="cursor-pointer">
                <h3 className="text-2xl font-medium text-blue-500">
                  <img className="h-10 object-cover" src={Logo} alt="Logo" />
                </h3>
              </Link>
            </div>

            {
              isLoggedIn &&
              <div className="flex items-center lg:flex mr-12">
                Hey There, {localStorage.getItem('username').toUpperCase()}
              </div>
            }

            {/* <div className="items-center hidden space-x-8 lg:flex">
              <Link to="/"
                className="flex text-gray-600 hover:text-blue-500
                            cursor-pointer transition-colors duration-300"
              >
                Home
              </Link>

              <Link
                className="flex text-gray-600 
                            cursor-pointer transition-colors duration-300
                            font-semibold text-blue-600"
              >
                Themes
              </Link>
            </div> */}
            {isLoggedIn === false ? (
              <div className="flex items-center space-x-5">
                <Link
                  to="/register"
                  className={`flex text-gray-600 hover:text-blue-400 cursor-pointer transition-colors duration-300`}
                >
                  <RegisterIcon />
                  Register
                </Link>

                <Link
                  to="/login"
                  className={`flex text-gray-600 hover:text-blue-400 cursor-pointer transition-colors duration-300 font-semibold`}
                >
                  <LoginIcon />
                  Login
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-5">
                <button
                  onClick={() => Logout()}
                  className={`flex text-gray-600 hover:text-blue-400 cursor-pointer transition-colors duration-300`}
                >
                  <RegisterIcon />
                  Logout
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
