import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

interface LoginResponse {
  message: string;
  user: {
    id: number;
    email: string;
    name: string;
    phone: string;
  };
  access_token: string;
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid credentials');
      }

      const data: LoginResponse = await response.json();

      // Store auth data
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));

      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card hospital-card">
        <div className="login-header">
          <h1>🏢 Hospital Dashboard</h1>
          <p>OP Booking Management System</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">📧 Hospital Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter hospital email"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">🔐 Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="login-btn hospital-btn" disabled={loading}>
            {loading ? 'Authentic...' : 'Login to Dashboard'}
          </button>
        </form>

        <div className="login-footer hospital-footer">
          <p><strong>Hospital Demo Credentials:</strong></p>
          <p>Email: hospital@test.com</p>
          <p>Password: password123</p>
          <p className="note">📌 Credentials are sent via SMS/WhatsApp by admin</p>
        </div>
      </div>
    </div>
  );
}
