import { useState, useEffect } from "react";
import axios from "axios";

type Hospital = {
  id: number;
  name: string;
  city: string;
  address: string;
  opFee: number;
};

interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
}

interface HomeProps {
  user?: User | null;
  onLogout?: () => void;
}

export default function Home({ user, onLogout }: HomeProps) {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const loadHospitals = async () => {
    setLoading(true);
    try {
      const url = city ? `/api/hospitals?city=${city}` : "/api/hospitals";
      const response = await axios.get<Hospital[]>(url);
      setHospitals(response.data);
    } catch (error) {
      console.error("Failed to load hospitals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHospitals();
  }, [city]);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
  };

  return (
    <div className="home-container">
      <header>
        <h1>Hospital Appointment Booking</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/my-appointments">My Appointments</a>
        </nav>
      </header>

      <section className="health-tips">
        <h2>Health Tips</h2>
        <p>Book your appointments online and visit at your convenient time.</p>
      </section>

      <section className="city-selection">
        <label htmlFor="city">Select City:</label>
        <select id="city" value={city} onChange={handleCityChange}>
          <option value="">All Cities</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
          <option value="Bangalore">Bangalore</option>
        </select>
      </section>

      <section className="hospitals-list">
        <h2>Hospitals</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="hospital-grid">
            {hospitals.map((hospital) => (
              <div key={hospital.id} className="hospital-card">
                <h3>{hospital.name}</h3>
                <p>{hospital.address}</p>
                <p>OP Fee: ₹{hospital.opFee}</p>
                <a href={`/hospital/${hospital.id}`}>View Details</a>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}