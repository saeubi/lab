import React from 'react';
import './App.css';

import { Provider } from 'react-redux';
import { store } from './utils/store';

// import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { DropDraw, Tmp, Tmp2 } from './pages';

function AppContent() {
  return (
    <Router>
      <div id="nav" style={{position: "absolute"}}>
        <Link to="/tmp">tmp</Link>
        <Link to="/tmp2">tmp2</Link>
      </div>
      <Routes>
          <Route path="/" element={<Navigate to="/dropdraw" />}></Route>
          <Route path="/dropdraw" element={<DropDraw />}></Route>
          <Route path="/tmp" element={<Tmp />}></Route>
          <Route path="/tmp2" element={<Tmp2 />}></Route>
      </Routes>
    </Router>
  );
}




function App() {
  return (
    <>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </>
  );
}

export default App;
