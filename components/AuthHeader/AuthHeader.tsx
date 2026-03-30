import Link from 'next/link';
import css from './AuthHeader.module.css';

const AuthHeader = () => {
  return (
    <header className={css.authHeader}>
      <Link href="/" className={css.logo}>
        <svg className={css.icon} aria-hidden="true">
          <use href="/icons.svg#icon-map_search" />
        </svg>
        <span className={css.authHeaderText}>Relax Map</span>
      </Link>
    </header>
  );
};

export default AuthHeader;