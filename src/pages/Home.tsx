import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Gift, Users, UserPlus, Shuffle, Coins } from 'lucide-react';

const raffleTypes = [
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Eşleştirme Çekilişi',
    description: 'Kişileri birbiriyle rastgele eşleştirin',
    type: 'matching'
  },
  {
    icon: <Gift className="w-8 h-8" />,
    title: 'Kazanan Belirleme',
    description: 'Listeden rastgele kazananlar seçin',
    type: 'winner'
  },
  {
    icon: <UserPlus className="w-8 h-8" />,
    title: 'Gruplama Çekilişi',
    description: 'Kişileri rastgele gruplara ayırın',
    type: 'grouping'
  },
  {
    icon: <Shuffle className="w-8 h-8" />,
    title: 'Yedekli Çekiliş',
    description: 'Ana kazananlar ve yedekler belirleyin',
    type: 'backup'
  },
  {
    icon: <Coins className="w-8 h-8" />,
    title: 'Altın Günü',
    description: 'Altın günü organizasyonu oluşturun',
    type: 'gold-day'
  }
];

export default function Home() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-primary mb-4">Raffle Master</h1>
        <p className="text-lg text-gray-600 mb-8">Çekiliş ve organizasyonlarınız için güvenilir çözüm</p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="inline-block px-6 py-3 text-primary border-2 border-primary rounded-md hover:bg-primary hover:text-white transition-colors"
          >
            Giriş Yap
          </Link>
          <Link
            to="/register"
            className="inline-block px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Kayıt Ol
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Merhaba, {currentUser.email}!
        </h1>
        <p className="text-gray-600">Bugün nasıl bir çekiliş yapmak istersiniz?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {raffleTypes.map((type) => (
          <Link
            key={type.type}
            to={type.type === 'gold-day' ? '/create-gold-day' : `/create-raffle?type=${type.type}`}
            className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg text-primary">
                {type.icon}
              </div>
              <h2 className="text-xl font-semibold text-gray-900">{type.title}</h2>
            </div>
            <p className="text-gray-600">{type.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}