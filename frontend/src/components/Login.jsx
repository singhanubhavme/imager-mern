import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { USER_URL } from '../constants';
import { showToast } from '../utils/showToast';

const Login = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      showToast('Please Fill all the fields', 'info');
      return;
    }
    if (username.match(/^[a-zA-Z]+$/)) {
      try {
        let response = axios.post(USER_URL.login, {
          userid: username,
          password: password,
        });
        showToast('Please Wait!!', 'info');
        response = await response;
        if (response.status === 200) {
          const token = response.data.data.token;
          localStorage.setItem('token', token);
          localStorage.setItem('username', username);
          showToast('User Logged in Successfully!!', 'success');
          setIsLoggedIn(true);
          setTimeout(() => {
            navigate('/');
          }, 3000);
        }
      } catch (err) {
        console.log(err);
        showToast('Cannot Login', 'error');
        showToast(err.response.data.message, 'error');
      }
    } else {
      showToast('Please Check the inputs', 'error');
    }
  };

  return (
    <div className="bg-white relative">
      <div
        className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl
        xl:px-5 lg:flex-row"
      >
        <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:flex-row">
          <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
            <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
              <img
                src="https://res.cloudinary.com/macxenon/image/upload/v1631570592/Run_-_Health_qcghbu.png"
                className="btn"
                alt=""
              />
            </div>
          </div>
          <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
            <div
              className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl
              relative z-10"
            >
              <p className="w-full text-4xl font-medium text-center leading-snug font-serif">
                Login
              </p>
              <form
                onSubmit={handleSubmit}
                className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8"
              >
                <div className="relative">
                  <p
                    className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                    absolute"
                  >
                    Username
                  </p>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase())}
                    placeholder="johndoe"
                    type="text"
                    className="border placeholder-gray-400 focus:outline-none
                    focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                    border-gray-300 rounded-md"
                  />
                </div>

                <div className="relative">
                  <p
                    className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                    absolute"
                  >
                    Password
                  </p>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type="password"
                    className="border placeholder-gray-400 focus:outline-none
                    focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                    border-gray-300 rounded-md"
                  />
                </div>

                <div className="relative">
                  <button
                    type="submit"
                    className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500
                    rounded-lg transition duration-200 hover:bg-indigo-600 ease"
                  >
                    Submit
                  </button>
                </div>
              </form>
              <Link to='/register' className="self-end font-small pt-4 pl-1">Do not have an account? Register Now</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
