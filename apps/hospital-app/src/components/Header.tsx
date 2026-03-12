import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
  role?: string;
  hospitalId?: number;
}

interface HeaderProps {
  user?: User | null;
  onLogout?: () => void;
}

export default function Header({ user, onLogout }: HeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Get first letter of name for avatar
  const avatarLetter = user?.name ? user.name.charAt(0).toUpperCase() : 'H';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setShowDropdown(false);
    if (onLogout) {
      onLogout();
      navigate('/login');
    }
  };

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-logo">
          <h1>🏢 Hospital Dashboard</h1>
        </div>

        <div className="header-profile" ref={dropdownRef}>
          <button
            className="profile-button"
            onClick={() => setShowDropdown(!showDropdown)}
            title={user?.email}
          >
            <div className="profile-avatar">{avatarLetter}</div>
            <div className="profile-info">
              <span className="profile-name">{user?.name || 'Hospital'}</span>
              <span className="profile-email">{user?.email}</span>
            </div>
            <span className={`dropdown-icon ${showDropdown ? 'open' : ''}`}>▼</span>
          </button>

          {showDropdown && (
            <div className="profile-dropdown">
              <div className="dropdown-content">
                <div className="dropdown-user-info">
                  <div className="dropdown-avatar">{avatarLetter}</div>
                  <div className="dropdown-user-details">
                    <p className="dropdown-name">{user?.name}</p>
                    <p className="dropdown-email">{user?.email}</p>
                  </div>
                </div>
                <hr className="dropdown-divider" />
                <button className="dropdown-logout-btn" onClick={handleLogout}>
                  🚪 Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
