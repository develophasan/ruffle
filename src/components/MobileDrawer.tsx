import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Gift, History, LogOut, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../lib/firebase';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      onClose();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 transition-opacity"
          onClick={onClose}
        />
      )}
      <div 
        className={`fixed inset-y-0 left-0 w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-primary">Menü</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {currentUser ? (
          <div className="py-4">
            <div className="px-4 mb-4 border-b border-gray-100 pb-4">
              <p className="text-sm text-gray-600">Hoş geldiniz,</p>
              <p className="font-medium truncate">{currentUser.email}</p>
            </div>
            
            <Link
              to="/create-raffle"
              className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 transition-colors"
              onClick={onClose}
            >
              <Gift className="w-5 h-5 text-primary" />
              <span>Çekiliş Oluştur</span>
            </Link>
            
            <Link
              to="/history"
              className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 transition-colors"
              onClick={onClose}
            >
              <History className="w-5 h-5 text-primary" />
              <span>Geçmiş</span>
            </Link>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 transition-colors text-red-600"
            >
              <LogOut className="w-5 h-5" />
              <span>Çıkış Yap</span>
            </button>
          </div>
        ) : (
          <div className="py-4">
            <Link
              to="/login"
              className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 transition-colors"
              onClick={onClose}
            >
              <span>Giriş Yap</span>
            </Link>
            <Link
              to="/register"
              className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 transition-colors"
              onClick={onClose}
            >
              <span>Kayıt Ol</span>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}