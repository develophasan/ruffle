import React from 'react';
import { X } from 'lucide-react';
import AdDisplay from './AdDisplay';

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdModal({ isOpen, onClose }: AdModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative bg-white rounded-lg p-4 w-full max-w-md mx-4">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="mt-6">
          <AdDisplay
            slot="YOUR_INTERSTITIAL_AD_SLOT"
            format="fluid"
            style={{ minHeight: '250px' }}
          />
        </div>
      </div>
    </div>
  );
}