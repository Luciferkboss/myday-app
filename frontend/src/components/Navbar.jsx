import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, CalendarCheck, User } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <CalendarCheck size={24} />
        <span>MyDay</span>
      </div>
      {user && (
        <div className="navbar-right">
          <div className="navbar-user">
            <User size={16} />
            <span>{user.name}</span>
          </div>
          <button onClick={handleLogout} className="btn btn-ghost btn-sm">
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
