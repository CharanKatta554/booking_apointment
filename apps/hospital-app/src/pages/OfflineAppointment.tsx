import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "../styles/Login.css";

interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
  role?: string;
  hospitalId?: number;
}

interface OfflineAppointmentProps {
  user?: User | null;
  onLogout?: () => void;
}

export default function OfflineAppointment({
  user,
  onLogout,
}: OfflineAppointmentProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (!user?.hospitalId) {
        setMessage("Hospital information not found");
        setLoading(false);
        return;
      }

      const response = await axios.post(`/api/hospitals/${user.hospitalId}/offline-appointments`, {
        ...formData,
        age: parseInt(formData.age),
      });

      setMessage(
        `Appointment created successfully! Token: ${response.data.token}`
      );

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
        phone: "",
        address: "",
      });

      // Redirect back to dashboard after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || "Failed to create appointment"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Header user={user} onLogout={onLogout} />
      <button onClick={() => navigate("/")} className="back-btn">
        Back to Dashboard
      </button>

      <div className="login-card">
        <h1>Add Offline Appointment</h1>
        <p className="subtitle">Create appointment for walk-in patients</p>

        {message && (
          <div
            className={`message ${message.includes("successfully") ? "success" : "error"}`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="Enter first name"
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Enter last name"
            />
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="1"
              max="150"
              placeholder="Enter age"
            />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Enter phone number"
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Enter address"
              rows={3}
            />
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? "Creating..." : "Create Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
}
