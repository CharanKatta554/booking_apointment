import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

type Appointment = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  status: string;
  createdAt: string;
  appointmentDate: string;
  token: number;
};

type GroupedAppointments = {
  [date: string]: Appointment[];
};

interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
  role?: string;
  hospitalId?: number;
}

interface AppointmentHistoryProps {
  user?: User | null;
  onLogout?: () => void;
}

const getLocalDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function AppointmentHistory({
  user,
  onLogout,
}: AppointmentHistoryProps) {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [groupedAppointments, setGroupedAppointments] =
    useState<GroupedAppointments>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointmentHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadAppointmentHistory = async () => {
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
      groupAppointmentsByDate(response.data);
    } catch (error) {
      console.error("Failed to load appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const groupAppointmentsByDate = (data: Appointment[]) => {
    const grouped: GroupedAppointments = {};

    data.forEach((apt) => {
      const created = new Date(apt.createdAt);
      const dateKey = getLocalDateKey(created);

      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }

      grouped[dateKey].push(apt);
    });

    setGroupedAppointments(grouped);
  };

  return (
    <div className="history-container">
      <Header user={user} onLogout={onLogout} />
      <button onClick={() => navigate("/")}>Back</button>
      <h1>Appointment History</h1>

      {loading ? (
        <p>Loading...</p>
      ) : Object.keys(groupedAppointments).length === 0 ? (
        <p>No appointment history</p>
      ) : (
        <div className="history-list">
          {Object.entries(groupedAppointments).map(([date, appts]) => (
            <div key={date} className="date-group">
              <h3>
                {new Date(date).toLocaleDateString()} – {appts.length}{" "}
                Appointment
                {appts.length !== 1 ? "s" : ""}
              </h3>

              <div className="appointments-list">
                {appts.map((apt) => (
                  <div key={apt.id} className="history-card">
                    <p>
                      <strong>
                        {apt.firstName} {apt.lastName}
                      </strong>
                    </p>
                    <p>Phone: {apt.phone}</p>
                    <p>Status: {apt.status}</p>
                    <p>Token: {apt.token}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}