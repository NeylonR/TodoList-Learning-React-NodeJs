import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './views/components/Header/index';
import Footer from './views/components/Footer/index';
import Login from './views/pages/Login/index';
import Home from './views/pages/Home/index';
import Signup from './views/pages/Signup';
import App from './app';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StyledGlobalStyle } from './utils/style/GlobalStyle';
import { AuthProvider } from './utils/context/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StyledGlobalStyle/>
    <AuthProvider>
      <Router>
        {/* <Header /> */}
        <Routes >
          <Route path={"/*"} element={<App />}/>
          {/* <Route path={'/'} element={<Home />}/>
          <Route path={'/login'} element={<Login />}/>
          <Route path={'/signup'} element={<Signup />}/> */}
        </Routes>
        {/* <Footer /> */}
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
