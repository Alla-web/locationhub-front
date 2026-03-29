'use client';

import { useEffect, useState } from 'react';
import styles from './ConfirmationModal.module.css';

type ConfirmationModalProps = {
    title: string;
    message: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => Promise<void> | void;
  onCancel: () => void;
};

export const ConfirmationModal = ({
    title = 'Ви точно хочете вийти?',
    message ='Ми будемо сумувати за вами!',
  confirmButtonText = 'Вийти',
  cancelButtonText = 'Відмінити',
  onConfirm,
  onCancel,
}: ConfirmationModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
 
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onCancel]);

 const handleBackdropClick = () => {
    onCancel();
  };

      const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    };
    
 const handleConfirm = async () => {
    try {
      setIsLoading(true);
      setError(null);

      await onConfirm(); 

      onCancel(); 
    } catch (err: unknown) {
  if (err instanceof Error) {
    setError(err.message);
  } else {
    setError('Щось пішло не так');
  }
} finally {
      setIsLoading(false);
    }
    };
    
 return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal} onClick={handleModalClick}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onCancel}
          aria-label="Close modal"
        >
          ×
        </button>

             <h2 className={styles.title}>{title}</h2>
             
             <p className={styles.text}>{message}</p>

         {error && <p className={styles.error}>{error}</p>}

        
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.confirmButton}
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Завантаження...' : confirmButtonText}
          </button>

          <button
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}