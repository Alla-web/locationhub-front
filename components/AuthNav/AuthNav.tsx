'use client'

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { logout } from '@/lib/api/api';
import css from './AuthNav.module.css'

const AuthNav = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    router.push('/login');
  };

  const pathname = usePathname();

  return isAuthenticated ? (
    <li>
      <p>{user?.email}</p>
          <button
            className={css.logoutButton}
            type="button"
              onClick={handleLogout}>
              Вихід
          </button>
    </li>
  ) : (
      <nav className={css.navAuth}>
      <ul className={css.navList}>
        <li>
          <Link
            href="/sign-up"
            className={`${css.navLinkRegistration} ${
              pathname === '/sign-up' ? css.active : ''
            }`}
          >
            Реєстрація
          </Link>
          </li>

          <li>
          <Link
            href="/login"
            prefetch={false}
            className={`${css.navLinkLogin} ${
              pathname === '/login' ? css.active : ''
            }`}
          >
            Вхід
          </Link>
        </li>
        </ul>
        <div className={css.line} />
    </nav>
  );
};

export default AuthNav;