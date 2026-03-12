import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddHospital from './pages/AddHospital';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-hospital" element={<AddHospital />} />
      </Routes>
    </Router>
  );
}

export default App;
