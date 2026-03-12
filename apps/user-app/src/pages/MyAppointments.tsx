import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type Hospital = {
  id: number;
  name: string;
};

type Appointment = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  status: string;
  createdAt: string;
  hospital: Hospital;
};

export default function MyAppointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const userId = 1; // TODO: Get from auth context
        const response = await axios.get<Appointment[]>(
          `/api/appointments/user/${userId}`
        );

        setAppointments(response.data);
      } catch (error) {
        console.error("Failed to load appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();

  }, []);

  return (<div className="my-appointments">
    <button onClick={() => navigate("/")}>Back</button> <h1>My Appointments</h1>

    {loading ? (
      <p>Loading...</p>
    ) : appointments.length === 0 ? (
      <p>No appointments found</p>
    ) : (
      <div className="appointments-list">
        {appointments.map((apt) => (
          <div key={apt.id} className="appointment-card">
            <h3>{apt.hospital.name}</h3>
            <p>
              Name: {apt.firstName} {apt.lastName}
            </p>
            <p>Phone: {apt.phone}</p>
            <p>Status: {apt.status}</p>
            <p>
              Date: {new Date(apt.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    )}
  </div>

  );
}
