import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
}

interface BookingFormProps {
  user?: User | null;
  onLogout?: () => void;
}

export default function BookingForm({ user, onLogout }: BookingFormProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userId = 1; // TODO: Get from auth context
      await axios.post('/api/appointments', {
        ...formData,
        userId,
        hospitalId: parseInt(id!),
      });
      alert('Appointment booked successfully!');
      navigate('/my-appointments');
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-form">
      <Header user={user} onLogout={onLogout} />
      <button onClick={() => navigate('/')}>Back</button>
      <h1>Book Appointment</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Booking...' : 'Submit Booking'}
        </button>
      </form>
    </div>
  );
}
