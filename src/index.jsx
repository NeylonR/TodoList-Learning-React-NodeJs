import React from 'react';
import ReactDOM from 'react-dom/client';
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
        <Routes >
          <Route path={"/*"} element={<App />}/>
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
