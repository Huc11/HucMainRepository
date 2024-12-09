
import { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MainPage from './MainPage';
import NavPage from './NavPage';
import Chat from './Chat';
import QuestionForm from './CodeComponents/QuestionForm';
import LoginPage from './LoginRegister/LoginPage';
import RegisterPage from './LoginRegister/RegisterPage';
import QueryCodes from './CodeComponents/QueryCodes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/pet' element={<MainPage />} />
        <Route path="/nav" element={<NavPage />} /> {/* Main page as default */}
        <Route path="/chat" element={<Chat />} /> {/* Chat page route */}
        <Route path="/code" element={<QuestionForm />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/query" element={<QueryCodes />} />

      </Routes>
    </Router>
  );
}

export default App;
