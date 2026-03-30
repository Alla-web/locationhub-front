import Link from 'next/link';
import css from './AuthHeader.module.css';

const AuthHeader = () => {
  return (
    <header className={css.authHeader}>
      <Link href="/" className={css.logo}>
        <span className={css.icon} />
        <span className={css.authHeaderText}>Relax Map</span>
      </Link>
    </header>
  );
};

export default AuthHeader;