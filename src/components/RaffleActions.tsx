import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, Trash2 } from 'lucide-react';
import { deleteRaffle } from '../lib/firebase/raffles';
import { useAuth } from '../contexts/AuthContext';

interface RaffleActionsProps {
  raffleId: string;
  onDelete: () => void;
}

export default function RaffleActions({ raffleId, onDelete }: RaffleActionsProps) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleEdit = () => {
    navigate(`/edit-raffle/${raffleId}`);
  };

  const handleDelete = async () => {
    if (!currentUser) return;
    
    if (window.confirm('Bu çekilişi silmek istediğinizden emin misiniz?')) {
      try {
        await deleteRaffle(currentUser.uid, raffleId);
        onDelete();
      } catch (error) {
        console.error('Error deleting raffle:', error);
      }
    }
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={handleEdit}
        className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
        title="Düzenle"
      >
        <Edit2 className="w-4 h-4" />
      </button>
      <button
        onClick={handleDelete}
        className="p-1 text-red-600 hover:text-red-800 transition-colors"
        title="Sil"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}