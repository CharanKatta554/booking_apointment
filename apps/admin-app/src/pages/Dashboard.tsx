import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type Hospital = {
  id: number;
  name: string;
  city: string;
  address: string;
  opFee: number;
  phone: string;
};

interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
}

interface DashboardProps {
  user?: User | null;
  onLogout?: () => void;
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHospitals();
  }, []);

  const loadHospitals = async () => {
  setLoading(true);
  try {
    const response = await axios.get<Hospital[]>('/api/admin/hospitals');
    setHospitals(response.data);
  } catch (error) {
    console.error('Failed to load hospitals:', error);
  } finally {
    setLoading(false);
  }
};

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this hospital?')) {
      try {
        await axios.delete(`/api/admin/hospitals/${id}`);
        loadHospitals();
        alert('Hospital deleted successfully');
      } catch (error) {
        console.error('Failed to delete hospital:', error);
        alert('Failed to delete hospital');
      }
    }
  };

  return (
    <div className="admin-container">
      <header>
        <h1>Admin Dashboard</h1>
        <nav>
          <a href="/">Hospitals</a>
        </nav>
      </header>

      <section className="hospitals-section">
        <div className="section-header">
          <h2>Hospitals</h2>
          <button onClick={() => navigate('/add-hospital')}>Add Hospital</button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="hospitals-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>City</th>
                <th>Address</th>
                <th>OP Fee</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {hospitals.map((hospital) => (
                <tr key={hospital.id}>
                  <td>{hospital.name}</td>
                  <td>{hospital.city}</td>
                  <td>{hospital.address}</td>
                  <td>₹{hospital.opFee}</td>
                  <td>{hospital.phone}</td>
                  <td>
                    <button onClick={() => navigate(`/edit-hospital/${hospital.id}`)}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(hospital.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
