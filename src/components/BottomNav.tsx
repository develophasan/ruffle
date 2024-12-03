import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Gift, Users, Coins, History } from 'lucide-react';

export default function BottomNav() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe">
      <div className="flex justify-around items-center h-16">
        <Link
          to="/"
          className={`flex flex-col items-center space-y-1 ${
            isActive('/') ? 'text-primary' : 'text-gray-600'
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs">Ana Sayfa</span>
        </Link>
        
        <Link
          to="/create-raffle"
          className={`flex flex-col items-center space-y-1 ${
            isActive('/create-raffle') ? 'text-primary' : 'text-gray-600'
          }`}
        >
          <Gift className="w-6 h-6" />
          <span className="text-xs">Çekiliş</span>
        </Link>

        <Link
          to="/create-gold-day"
          className={`flex flex-col items-center space-y-1 ${
            isActive('/create-gold-day') ? 'text-primary' : 'text-gray-600'
          }`}
        >
          <Coins className="w-6 h-6" />
          <span className="text-xs">Altın Günü</span>
        </Link>

        <Link
          to="/history"
          className={`flex flex-col items-center space-y-1 ${
            isActive('/history') ? 'text-primary' : 'text-gray-600'
          }`}
        >
          <History className="w-6 h-6" />
          <span className="text-xs">Geçmiş</span>
        </Link>
      </div>
    </div>
  );
}