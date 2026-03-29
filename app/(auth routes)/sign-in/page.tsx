import Link from 'next/link';
import styles from './page.module.css';

export default function SignInPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.topBar}>
          <Link href="/" className={styles.logo} aria-label="Relax Map home">
            Relax Map
          </Link>
        </header>

        <section className={styles.formWrapper}>
          <div className={styles.tabs}>
            <Link href="/sign-up" className={styles.tabLink}>
              Реєстрація
            </Link>

            <span className={styles.activeTab}>Вхід</span>
          </div>

          <h1 className={styles.title}>Вхід</h1>

          <form className={styles.form} aria-label="Форма входу">
            <label className={styles.field} htmlFor="email">
              <span className={styles.label}>Пошта*</span>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="hello@relaxmap.ua"
                className={styles.input}
                autoComplete="email"
                required
              />
            </label>

            <label className={styles.field} htmlFor="password">
              <span className={styles.label}>Пароль*</span>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="******"
                className={styles.input}
                autoComplete="current-password"
                required
              />
            </label>

            <button type="submit" className={styles.submitButton}>
              Увійти
            </button>
          </form>
        </section>

        <footer className={styles.footer}>© 2025 Relax Map</footer>
      </div>
    </main>
  );
}