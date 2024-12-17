import React, { useEffect } from 'react';
import './App.css';
import { HashRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Main from './page/main/Main';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/main" />} />
          <Route path="/main" element={
            <Main />
          } />
          <Route path="/move" element={
            <div>
              <p>move</p>
              <Link to="/main">to main</Link>
            </div>
          } />
          
        </Routes>
      </Router>
      <div><h1>hello, world!</h1></div>
    </>
  );
}

export default App;