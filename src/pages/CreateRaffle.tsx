import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { database } from '../lib/firebase';
import { ref, push, set } from 'firebase/database';
import { createPairs, shuffleArray } from '../lib/utils';
import { Trash2, Plus, Gift } from 'lucide-react';
import { useAdTrigger } from '../hooks/useAdTrigger';
import AdModal from '../components/AdModal';
import AdDisplay from '../components/AdDisplay';

// ... rest of your existing imports

export default function CreateRaffle() {
  // ... your existing state
  const { shouldShowAd, setShouldShowAd } = useAdTrigger();

  const handleSubmit = async () => {
    if (participants.length < 2) {
      setError('En az 2 katılımcı eklemelisiniz.');
      return;
    }

    try {
      // ... your existing submit logic
      
      // Show ad after successful raffle creation
      setShouldShowAd(true);
      navigate('/history');
    } catch (err) {
      setError('Çekiliş kaydedilirken bir hata oluştu.');
    }
  };

  return (
    <>
      {/* Your existing JSX */}
      
      {/* Ad Modal */}
      <AdModal 
        isOpen={shouldShowAd} 
        onClose={() => setShouldShowAd(false)} 
      />
      
      {/* Banner Ad */}
      <AdDisplay
        slot="YOUR_BANNER_AD_SLOT"
        className="my-4"
        style={{ minHeight: '100px' }}
      />
    </>
  );
}