import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { database } from '../lib/firebase';
import { ref, get, update } from 'firebase/database';
import { Coins, Plus, Trash2 } from 'lucide-react';
import DatePicker from 'react-datepicker';
import { addMonths, setDate } from 'date-fns';
import type { Participant } from '../types/raffle';

export default function EditRaffle() {
  const { raffleId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [dayOfMonth, setDayOfMonth] = useState<number>(1);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [newParticipant, setNewParticipant] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRaffle = async () => {
      if (!currentUser || !raffleId) return;

      try {
        const raffleRef = ref(database, `raffles/${currentUser.uid}/${raffleId}`);
        const snapshot = await get(raffleRef);
        
        if (snapshot.exists()) {
          const data = snapshot.val();
          setStartDate(new Date(data.startDate));
          setDayOfMonth(data.dayOfMonth);
          setParticipants(data.participants);
        } else {
          setError('Çekiliş bulunamadı');
          navigate('/history');
        }
      } catch (err) {
        setError('Çekiliş yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchRaffle();
  }, [currentUser, raffleId, navigate]);

  const handleAddParticipant = (e: React.FormEvent) => {
    e.preventDefault();
    if (newParticipant.trim()) {
      const participant: Participant = {
        name: newParticipant.trim(),
        date: startDate.toISOString()
      };
      setParticipants([...participants, participant]);
      setNewParticipant('');
    }
  };

  const handleRemoveParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const generateSchedule = () => {
    const shuffledParticipants = [...participants].sort(() => Math.random() - 0.5);
    const schedule = shuffledParticipants.map((participant, index) => {
      const meetingDate = addMonths(startDate, index);
      return {
        date: setDate(meetingDate, dayOfMonth).toISOString(),
        participant: participant.name
      };
    });
    return schedule;
  };

  const handleSubmit = async () => {
    if (!currentUser || !raffleId) return;
    
    if (participants.length < 2) {
      setError('En az 2 katılımcı eklemelisiniz.');
      return;
    }

    try {
      const schedule = generateSchedule();
      const raffleRef = ref(database, `raffles/${currentUser.uid}/${raffleId}`);
      await update(raffleRef, {
        startDate: startDate.toISOString(),
        participants,
        dayOfMonth,
        schedule,
        updatedAt: new Date().toISOString()
      });
      navigate('/history');
    } catch (err) {
      setError('Çekiliş güncellenirken bir hata oluştu.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <Coins className="w-8 h-8 text-primary" />
        <h1 className="text-2xl font-bold text-primary">Çekilişi Düzenle</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Başlangıç Tarihi
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ayın Günü
            </label>
            <input
              type="number"
              min="1"
              max="31"
              value={dayOfMonth}
              onChange={(e) => setDayOfMonth(parseInt(e.target.value))}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-primary"
            />
          </div>
        </div>

        <form onSubmit={handleAddParticipant} className="mb-6">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newParticipant}
              onChange={(e) => setNewParticipant(e.target.value)}
              placeholder="Katılımcı adı"
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-primary"
            />
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </form>

        <div className="space-y-2 mb-6">
          {participants.map((participant, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
            >
              <span className="font-medium">{participant.name}</span>
              <button
                onClick={() => handleRemoveParticipant(index)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {participants.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Tahmini Program:</h3>
            <div className="space-y-2">
              {generateSchedule().map((meeting, index) => (
                <div key={index} className="bg-gray-50 p-2 rounded-md">
                  <div className="flex justify-between items-center">
                    <span>{new Date(meeting.date).toLocaleDateString('tr-TR')}</span>
                    <span className="font-medium">{meeting.participant}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex space-x-4">
          <button
            onClick={() => navigate('/history')}
            className="flex-1 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition-colors"
          >
            İptal
          </button>
          <button
            onClick={handleSubmit}
            disabled={participants.length < 2}
            className="flex-1 bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Güncelle
          </button>
        </div>
      </div>
    </div>
  );
}