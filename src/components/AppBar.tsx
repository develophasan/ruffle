import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Menu } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AppBarProps {
  onMenuClick: () => void;
}

export default function AppBar({ onMenuClick }: AppBarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Raffle Master';
      case '/login':
        return 'Giriş Yap';
      case '/register':
        return 'Kayıt Ol';
      case '/create-raffle':
        return 'Çekiliş Oluştur';
      case '/create-gold-day':
        return 'Altın Günü Oluştur';
      case '/history':
        return 'Çekiliş Geçmişi';
      default:
        if (location.pathname.startsWith('/edit-raffle/')) {
          return 'Çekilişi Düzenle';
        }
        return '';
    }
  };

  const showBackButton = location.pathname !== '/';

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-primary text-white h-14 flex items-center px-4 shadow-lg">
      <div className="flex-1 flex items-center">
        {showBackButton ? (
          <button
            onClick={() => navigate(-1)}
            className="mr-4 p-2 hover:bg-primary-dark rounded-full transition-colors"
            aria-label="Geri"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        ) : (
          <button
            onClick={onMenuClick}
            className="mr-4 p-2 hover:bg-primary-dark rounded-full transition-colors"
            aria-label="Menü"
          >
            <Menu className="w-6 h-6" />
          </button>
        )}
        <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
      </div>
    </div>
  );
}