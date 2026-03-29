import Link from 'next/link';
import styles from './page.module.css';

export default function SignUpPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.topBar}>
          <Link href="/" className={styles.logo} aria-label="Relax Map home">
            <span className={styles.logoIcon} aria-hidden="true">
              ⌂
            </span>
            <span className={styles.logoText}>Relax Map</span>
          </Link>
        </header>

        <section className={styles.formWrapper}>
          <div className={styles.tabs}>
            <span className={styles.activeTab}>Реєстрація</span>

            <Link href="/sign-in" className={styles.tabLink}>
              Вхід
            </Link>
          </div>

          <h1 className={styles.title}>Реєстрація</h1>

          <form className={styles.form} aria-label="Форма реєстрації">
            <label className={styles.field} htmlFor="name">
              <span className={styles.label}>Ім&apos;я*</span>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Ваше ім'я"
                className={styles.input}
                autoComplete="name"
                required
              />
            </label>

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
                placeholder="********"
                className={styles.input}
                autoComplete="new-password"
                required
              />
            </label>

            <button type="submit" className={styles.submitButton}>
              Зареєструватись
            </button>
          </form>
        </section>

        <footer className={styles.footer}>© 2025 Relax Map</footer>
      </div>
    </main>
  );
}