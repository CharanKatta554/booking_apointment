import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type Appointment = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  status: string;
  createdAt: string;
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTodayAppointments();
  }, []);

  const loadTodayAppointments = async () => {
    setLoading(true);
    try {
      const hospitalId = 1; // TODO: Get from auth context

      const response = await axios.get<Appointment[]>(
        `/api/appointments/hospital/${hospitalId}`
      );

      const today = new Date().toDateString();

      const todayAppointments = response.data.filter((apt) => {
        return new Date(apt.createdAt).toDateString() === today;
      });

      setAppointments(todayAppointments);
    } catch (error) {
      console.error("Failed to load appointments:", error);
    } finally {
      setLoading(false);
    }

  };

  return (<div className="hospital-container"> <header> <h1>Hospital Dashboard</h1> <nav> <a href="/">Today's Appointments</a> <a href="/history">History</a> </nav> </header>

    <section className="today-appointments">
      <h2>Today's Appointments</h2>

      {loading ? (
        <p>Loading...</p>
      ) : appointments.length === 0 ? (
        <p>No appointments for today</p>
      ) : (
        <div className="appointments-grid">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="appointment-card">
              <div className="appointment-header">
                <h3>
                  {appointment.firstName} {appointment.lastName}
                </h3>
                <span
                  className={`status ${appointment.status.toLowerCase()}`}
                >
                  {appointment.status}
                </span>
              </div>

              <div className="appointment-details">
                <p>
                  <strong>Phone:</strong> {appointment.phone}
                </p>
                <p>
                  <strong>Address:</strong> {appointment.address}
                </p>
                <p>
                  <strong>Time:</strong>{" "}
                  {new Date(appointment.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  </div>

  );
}
