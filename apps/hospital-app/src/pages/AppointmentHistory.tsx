import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type Appointment = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  status: string;
  createdAt: string;
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

export default function AppointmentHistory({ user, onLogout }: AppointmentHistoryProps) {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [groupedAppointments, setGroupedAppointments] = useState<GroupedAppointments>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointmentHistory();
  }, []);

  const loadAppointmentHistory = async () => {
    setLoading(true);
    try {
      if (!user?.hospitalId) {
        console.error('Hospital ID not found in user data');
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
      const date = new Date(apt.createdAt).toLocaleDateString();

      if (!grouped[date]) {
        grouped[date] = [];
      }

      grouped[date].push(apt);
    });

    setGroupedAppointments(grouped);
  };

  return (
    <div className="history-container">
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
                {date} – {appts.length} Appointment
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