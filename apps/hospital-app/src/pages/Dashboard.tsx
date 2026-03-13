import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "../App.css";

type Appointment = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  status: string;
  createdAt: string;
  appointmentDate: string;
  token: number;
};

interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
  role?: string;
  hospitalId?: number;
}

interface DashboardProps {
  user?: User | null;
  onLogout?: () => void;
}

type TabKey = "home" | "today" | "history";

const formatDateInputKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const [selectedDate, setSelectedDate] = useState<string>(
    formatDateInputKey(new Date())
  );

  useEffect(() => {
    loadHospitalAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadHospitalAppointments = async () => {
    setLoading(true);
    try {
      if (!user?.hospitalId) {
        console.error("Hospital ID not found in user data");
        setLoading(false);
        return;
      }

      const response = await axios.get<Appointment[]>(
        `/api/appointments/hospital/${user.hospitalId}`
      );

      setAppointments(response.data);
    } catch (error) {
      console.error("Failed to load appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const todayLabel = new Date().toDateString();

  const todayAppointments = appointments.filter((apt) => {
    return new Date(apt.createdAt).toDateString() === todayLabel;
  });

  const selectedDateAppointments = appointments.filter((apt) => {
    const created = new Date(apt.createdAt);
    const createdKey = formatDateInputKey(created);
    return createdKey === selectedDate;
  });

  const renderAppointmentsList = (list: Appointment[]) => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (!list.length) {
      return <p>No appointments found</p>;
    }

    return (
      <div className="appointments-grid">
        {list.map((appointment) => (
          <div key={appointment.id} className="appointment-card">
            <div className="appointment-header">
              <h3>
                {appointment.firstName} {appointment.lastName}
              </h3>
              <span className={`status ${appointment.status.toLowerCase()}`}>
                {appointment.status}
              </span>
            </div>

            <div className="appointment-details">
              <p>
                <strong>Token:</strong> {appointment.token}
              </p>
              <p>
                <strong>Phone:</strong> {appointment.phone}
              </p>
              <p>
                <strong>Address:</strong> {appointment.address}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(
                  appointment.appointmentDate || appointment.createdAt
                ).toLocaleDateString()}
              </p>
              <p>
                <strong>Time:</strong>{" "}
                {new Date(appointment.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="hospital-container">
      <Header user={user} onLogout={onLogout} />

      <section className="dashboard-tabs-section">
        <div className="tabs-header">
          <div className="tabs">
            <button
              className={`tab-button ${activeTab === "home" ? "active" : ""}`}
              onClick={() => setActiveTab("home")}
            >
              Home
            </button>
            <button
              className={`tab-button ${
                activeTab === "today" ? "active" : ""
              }`}
              onClick={() => setActiveTab("today")}
            >
              Today's Appointments
            </button>
            <button
              className={`tab-button ${
                activeTab === "history" ? "active" : ""
              }`}
              onClick={() => setActiveTab("history")}
            >
              History
            </button>
          </div>

          <button
            onClick={() => navigate("/offline-appointment")}
            className="btn btn-primary create-appointment-btn"
          >
            + Create Appointment
          </button>
        </div>

        {activeTab === "home" && (
          <div className="tab-content">
            <h2>Today's Appointments Overview</h2>
            <p>
              View all of today&apos;s appointments with their token numbers and
              quick details.
            </p>
            {renderAppointmentsList(todayAppointments)}
          </div>
        )}

        {activeTab === "today" && (
          <div className="tab-content">
            <h2>Today's Appointments</h2>
            {renderAppointmentsList(todayAppointments)}
          </div>
        )}

        {activeTab === "history" && (
          <div className="tab-content">
            <div className="history-header">
              <h2>Appointment History</h2>
              <div className="date-filter">
                <label htmlFor="history-date">Select Date:</label>
                <input
                  id="history-date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
            </div>

            {renderAppointmentsList(selectedDateAppointments)}
          </div>
        )}
      </section>
    </div>
  );
}
