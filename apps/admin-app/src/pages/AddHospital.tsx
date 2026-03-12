import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
}

interface AddHospitalProps {
  user?: User | null;
  onLogout?: () => void;
}

export default function AddHospital({ user, onLogout }: AddHospitalProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    pincode: '',
    opFee: '',
    phone: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/admin/hospitals', {
        ...formData,
        opFee: parseFloat(formData.opFee),
      });
      alert('Hospital added successfully!');
      navigate('/');
    } catch (error) {
      console.error('Failed to add hospital:', error);
      alert('Failed to add hospital');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-hospital-container">
      <button onClick={() => navigate('/')}>Back</button>
      <h1>Add Hospital</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Hospital Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Pincode</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>OP Fee</label>
          <input
            type="number"
            name="opFee"
            value={formData.opFee}
            onChange={handleChange}
            step="0.01"
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
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Hospital'}
        </button>
      </form>
    </div>
  );
}
