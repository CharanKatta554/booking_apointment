import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HospitalDetails from './pages/HospitalDetails';
import BookingForm from './pages/BookingForm';
import MyAppointments from './pages/MyAppointments';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hospital/:id" element={<HospitalDetails />} />
        <Route path="/booking/:id" element={<BookingForm />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
      </Routes>
    </Router>
  );
}

export default App;
