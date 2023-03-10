import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <React.Fragment>
      <Router>
        <Navbar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
            }
          />
          <Route
            exact
            path="/register"
            element={
              <Register setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
            }
          />
          <Route
            exact
            path="/login"
            element={
              <Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
            }
          />
        </Routes>
      </Router>
    </React.Fragment>
  );
};

export default App;
