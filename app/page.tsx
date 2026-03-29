'use client';

import { useState } from 'react';
import AuthModal from '@/components/auth-prompt-modal/auth-prompt-modal';

export default function HomePage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // ❗ пока фейковая авторизация
  const isAuthenticated = false;

  const handleProtectedAction = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    console.log('Protected action');
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '24px',
      }}
    >
      <div>
        <h1>
          Location – simple and efficient application design
        </h1>

        <p>
          Discover locations quickly and manage your experience in a convenient and modern interface.
        </p>

        <button
          onClick={handleProtectedAction}
          style={{
            marginTop: '20px',
            padding: '12px 20px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Спробувати захищену дію
        </button>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </main>
  );
}