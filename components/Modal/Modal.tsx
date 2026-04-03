'use client';

import {
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
  type MouseEvent,
} from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import css from './Modal.module.css';

type ModalProps = {
  children: ReactNode;
};

export default function Modal({ children }: ModalProps) {
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);

  const closeModal = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [closeModal]);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (
      contentRef.current &&
      !contentRef.current.contains(event.target as Node)
    ) {
      closeModal();
    }
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal} ref={contentRef}>
        <button
          type="button"
          className={css.closeBtn}
          onClick={closeModal}
          aria-label="Закрити модальне вікно"
        >
          <Image src="/exit.svg" alt="close" width={13.5} height={13.5} />
        </button>
        {children}
      </div>
    </div>
  );
}