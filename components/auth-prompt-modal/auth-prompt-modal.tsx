'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './auth-prompt-modal.module.css';

type AuthPromptModalProps = {
  title?: string;
  message?: string;
  closeMode?: 'back' | 'home';
};

export default function AuthPromptModal({
  title = 'Потрібна авторизація',
  message = 'Щоб додати це місце до обраних, будь ласка, увійдіть у свій акаунт або зареєструйтеся.',
  closeMode = 'back',
}: AuthPromptModalProps) {
  const router = useRouter();

  const handleClose = () => {
    if (closeMode === 'home') {
      router.push('/');
      return;
    }

    router.back();
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleBackdropClick = () => {
    handleClose();
  };

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal} onClick={handleModalClick}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Закрити модальне вікно"
        >
          ×
        </button>

        <h2 className={styles.title}>{title}</h2>

        <p className={styles.text}>{message}</p>

        <div className={styles.actions}>
          <Link href="/sign-in" className={styles.primaryButton}>
            Увійти
          </Link>

          <Link href="/sign-up" className={styles.secondaryButton}>
            Зареєструватися
          </Link>
        </div>
      </div>
    </div>
  );
}