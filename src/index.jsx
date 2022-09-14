import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './views/components/Header/index';
import Footer from './views/components/Footer/index';
import Login from './views/pages/Login/index';
import Home from './views/pages/Home/index';
import Signup from './views/pages/Signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StyledGlobalStyle } from './utils/style/GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StyledGlobalStyle/>
    <Router>
      <Header />
      <Routes >
        <Route path={'/'} element={<Home />}/>
        <Route path={'/login'} element={<Login />}/>
        <Route path={'/signup'} element={<Signup />}/>
      </Routes>
      <Footer />
    </Router>
  </React.StrictMode>
);
