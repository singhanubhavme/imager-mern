import React, { useEffect, useState } from 'react';
import Logo from '../icons/logo.png';
import { RegisterIcon, LoginIcon } from '../icons/icons';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { USER_URL } from '../constants';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isModerator, setIsModerator] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const getUserRole = async () => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(USER_URL.getrole, {
        username: username
      }, {
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (response.status === 200) {
        if (response.data.data.role === 'moderator') {
          setIsModerator(true);
          setIsAdmin(false);
        } else if (response.data.data.role === 'admin') {
          setIsAdmin(true);
          setIsModerator(false);
        } else {
          setIsModerator(false);
          setIsAdmin(false);
        }
      } else {
        console.log('Cannot get user role');
      }
    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    if (localStorage.getItem('username') && localStorage.getItem('token')) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  useEffect(() => {
    if (isLoggedIn)
      getUserRole();
  }, [isLoggedIn]);

  const Logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-4">
        <div className="flex flex-col">
          <nav
            className="flex pb-4 bg-white/80 backdrop-blur-md shadow-md w-screen"
          >
            <div className="flex items-center">
              <NavLink to="/" className="cursor-pointer">
                <h3 className="text-2xl font-medium text-blue-500">
                  <img className="h-10 object-cover" src={Logo} alt="Logo" />
                </h3>
              </NavLink>
            </div>

            <div className="items-center hidden space-x-8 lg:flex">
              <NavLink
                style={({ isActive }) => ({ color: isActive ? 'rgb(29, 78, 216)' : '' })}
                to="/"
                className='flex
                cursor-pointer transition-colors duration-300
                font-semibold'
              >
                Home
              </NavLink>

              <NavLink
                style={({ isActive }) => ({ color: isActive ? 'rgb(29, 78, 216)' : '' })}
                to="/upload"
                className='flex text-gray-600 
                cursor-pointer transition-colors duration-300
                font-semibold text-blue-600'
              >
                Upload Images
              </NavLink>

              {
                isLoggedIn && isModerator &&
                <NavLink
                  style={({ isActive }) => ({ color: isActive ? 'rgb(29, 78, 216)' : '' })}
                  to='/moderator'
                  className="flex text-gray-600 
                            cursor-pointer transition-colors duration-300
                            font-semibold text-blue-600"
                >
                  Dashboard
                </NavLink>
              }
              {
                isLoggedIn && isAdmin &&
                <NavLink
                  style={({ isActive }) => ({ color: isActive ? 'rgb(29, 78, 216)' : '' })}
                  to='/admin'
                  className="flex text-gray-600 
                            cursor-pointer transition-colors duration-300
                            font-semibold text-blue-600"
                >
                  Dashboard
                </NavLink>
              }

            </div>


            {isLoggedIn === false ? (
              <div className="flex items-center space-x-5 ml-auto mr-5">
                <NavLink
                  style={({ isActive }) => ({ color: isActive ? 'rgb(29, 78, 216)' : '' })}
                  to="/register"
                  className={`flex text-gray-600 hover:text-blue-400 cursor-pointer transition-colors duration-300`}
                >
                  <RegisterIcon />
                  Register
                </NavLink>

                <NavLink
                  style={({ isActive }) => ({ color: isActive ? 'rgb(29, 78, 216)' : '' })}
                  to="/login"
                  className={`flex text-gray-600 hover:text-blue-400 cursor-pointer transition-colors duration-300 font-semibold`}
                >
                  <LoginIcon />
                  Login
                </NavLink>
              </div>
            ) : (
              <div className="flex items-center space-x-5 ml-auto mr-5">
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
        </div >
      </div >
    </>
  );
};

export default Navbar;
