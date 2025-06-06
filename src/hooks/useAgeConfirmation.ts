
import { useState, useEffect } from 'react';

export function useAgeConfirmation() {
  const [showAgeConfirmation, setShowAgeConfirmation] = useState(false);

  useEffect(() => {
    // Verifica se o usuário já confirmou a idade anteriormente
    const hasConfirmedAge = localStorage.getItem('age-confirmed');
    
    if (!hasConfirmedAge) {
      setShowAgeConfirmation(true);
    }
  }, []);

  const confirmAge = () => {
    localStorage.setItem('age-confirmed', 'true');
    setShowAgeConfirmation(false);
  };

  return {
    showAgeConfirmation,
    confirmAge
  };
}
