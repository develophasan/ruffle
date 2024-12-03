import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Gift, History, LogOut } from 'lucide-react';
import { auth } from '../lib/firebase';

export default function Navbar() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-primary text-light shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Gift className="h-8 w-8 text-accent" />
            <span className="text-xl font-bold">Raffle Master</span>
          </Link>

          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <Link to="/create-raffle" className="hover:text-accent transition-colors">
                  Create Raffle
                </Link>
                <Link to="/history" className="flex items-center space-x-1 hover:text-accent transition-colors">
                  <History className="h-4 w-4" />
                  <span>History</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 hover:text-accent transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-accent transition-colors">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-accent text-primary px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}