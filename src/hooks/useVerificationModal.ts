
import { useState } from 'react';
import { useVerificationStatus } from './useVerificationStatus';

export function useVerificationModal() {
  const [showModal, setShowModal] = useState(false);
  const { isVerified } = useVerificationStatus();

  const checkVerificationAndExecute = (callback: () => void) => {
    if (!isVerified) {
      setShowModal(true);
      return false;
    }
    callback();
    return true;
  };

  const closeModal = () => setShowModal(false);

  return {
    showModal,
    closeModal,
    checkVerificationAndExecute,
    isVerified
  };
}
