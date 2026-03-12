import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
}

interface HospitalDetailsProps {
  user?: User | null;
  onLogout?: () => void;
}

export default function HospitalDetails({ user, onLogout }: HospitalDetailsProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hospital, setHospital] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHospital = async () => {
      try {
        const response = await axios.get(`/api/hospitals/${id}`);
        setHospital(response.data);
      } catch (error) {
        console.error('Failed to load hospital:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHospital();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!hospital) return <div>Hospital not found</div>;

  return (
    <div className="hospital-details">
      <Header user={user} onLogout={onLogout} />
      <button onClick={() => navigate('/')}>Back</button>
      <h1>{hospital.name}</h1>
      <p><strong>Address:</strong> {hospital.address}</p>
      <p><strong>City:</strong> {hospital.city}</p>
      <p><strong>Pincode:</strong> {hospital.pincode}</p>
      <p><strong>OP Fee:</strong> ₹{hospital.opFee}</p>
      <p><strong>Phone:</strong> {hospital.phone}</p>
      <button onClick={() => navigate(`/booking/${hospital.id}`)}>
        Book Appointment
      </button>
    </div>
  );
}
