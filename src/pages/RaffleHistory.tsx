import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { database } from '../lib/firebase';
import { ref, onValue } from 'firebase/database';
import { History } from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import RaffleActions from '../components/RaffleActions';

interface RaffleResult {
  type: 'matching' | 'winner' | 'grouping' | 'backup' | 'gold-day';
  participants: string[];
  results: any;
  createdAt: string;
  startDate?: string;
  schedule?: Array<{ date: string; participant: string }>;
}

interface RaffleData {
  [key: string]: RaffleResult;
}

export default function RaffleHistory() {
  const { currentUser } = useAuth();
  const [raffles, setRaffles] = useState<RaffleData>({});

  useEffect(() => {
    if (currentUser) {
      const rafflesRef = ref(database, `raffles/${currentUser.uid}`);
      const unsubscribe = onValue(rafflesRef, (snapshot) => {
        if (snapshot.exists()) {
          setRaffles(snapshot.val());
        }
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd MMMM yyyy HH:mm', { locale: tr });
  };

  const handleRaffleDeleted = () => {
    // Refresh will happen automatically through the onValue listener
  };

  const renderResults = (raffle: RaffleResult, id: string) => {
    switch (raffle.type) {
      case 'matching':
        return (
          <div className="space-y-2">
            {raffle.results.map((pair: string[], index: number) => (
              <div key={index} className="bg-gray-50 p-2 rounded-md">
                {pair[0]} ↔️ {pair[1]}
              </div>
            ))}
          </div>
        );
      case 'winner':
        return (
          <div className="space-y-2">
            {raffle.results.map((winner: string, index: number) => (
              <div key={index} className="bg-gray-50 p-2 rounded-md">
                {index + 1}. Kazanan: {winner}
              </div>
            ))}
          </div>
        );
      case 'grouping':
        return (
          <div className="space-y-2">
            {raffle.results.map((group: string[], index: number) => (
              <div key={index} className="bg-gray-50 p-2 rounded-md">
                <div className="font-semibold">Grup {index + 1}</div>
                <div>{group.join(', ')}</div>
              </div>
            ))}
          </div>
        );
      case 'backup':
        return (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Kazananlar</h4>
              <div className="space-y-2">
                {raffle.results.winners.map((winner: string, index: number) => (
                  <div key={index} className="bg-gray-50 p-2 rounded-md">
                    {index + 1}. Kazanan: {winner}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Yedekler</h4>
              <div className="space-y-2">
                {raffle.results.backups.map((backup: string, index: number) => (
                  <div key={index} className="bg-gray-50 p-2 rounded-md">
                    {index + 1}. Yedek: {backup}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'gold-day':
        if (!raffle.schedule) return null;
        return (
          <div className="space-y-2">
            {raffle.schedule.map((meeting, index) => (
              <div key={index} className="bg-gray-50 p-2 rounded-md">
                <div className="flex justify-between items-center">
                  <span>{formatDate(meeting.date)}</span>
                  <span className="font-medium">{meeting.participant}</span>
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center space-x-3 mb-8">
        <History className="w-8 h-8 text-primary" />
        <h1 className="text-2xl font-bold text-primary">Çekiliş Geçmişi</h1>
      </div>

      <div className="space-y-6">
        {Object.entries(raffles)
          .sort(([, a], [, b]) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map(([id, raffle]) => (
            <div key={id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-primary">
                    {raffle.type === 'matching' && 'Eşleştirme Çekilişi'}
                    {raffle.type === 'winner' && 'Kazanan Belirleme'}
                    {raffle.type === 'grouping' && 'Gruplama Çekilişi'}
                    {raffle.type === 'backup' && 'Yedekli Çekiliş'}
                    {raffle.type === 'gold-day' && 'Altın Günü'}
                  </h3>
                  <p className="text-sm text-gray-500">{formatDate(raffle.createdAt)}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    {raffle.participants.length} Katılımcı
                  </span>
                  <RaffleActions raffleId={id} onDelete={handleRaffleDeleted} />
                </div>
              </div>
              {renderResults(raffle, id)}
            </div>
          ))}
      </div>
    </div>
  );
}