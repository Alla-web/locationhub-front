import Link from 'next/link';
import styles from './page.module.css';

export default function SignUpPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.topBar}>
          <Link href="/" className={styles.logo} aria-label="Relax Map home">
            <svg
              className={styles.logoIcon}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.30377 20.5935C3.96861 20.7633 3.64261 20.75 3.32577 20.5535C3.00894 20.357 2.85052 20.0642 2.85052 19.675V5.72501C2.85052 5.47651 2.92202 5.25492 3.06502 5.06026C3.20786 4.86576 3.39527 4.72284 3.62727 4.63151L8.15928 3.03751C8.34594 2.96684 8.53453 2.93567 8.72503 2.94401C8.91553 2.95234 9.10411 2.98351 9.29078 3.03751L15.3 5.14451L19.6963 3.38151C20.0314 3.22834 20.3584 3.24584 20.6773 3.43401C20.9961 3.62217 21.1555 3.91084 21.1555 4.30001V12.8325C21.1555 13.0812 21.0737 13.2821 20.91 13.4353C20.7465 13.5886 20.5424 13.6653 20.2978 13.6653C20.0533 13.6653 19.8502 13.5844 19.6885 13.4228C19.527 13.2613 19.4463 13.0562 19.4463 12.8075V5.22776L15.95 6.55976V10.77C15.95 10.9867 15.8792 11.1658 15.7375 11.3075C15.5959 11.4492 15.4167 11.52 15.2 11.52C14.9834 11.52 14.8042 11.4492 14.6625 11.3075C14.5209 11.1658 14.45 10.9867 14.45 10.77V6.55976L9.55003 4.90976V17.6288C9.55003 17.8941 9.47853 18.1355 9.33553 18.353C9.19269 18.5705 8.99894 18.7269 8.75428 18.8223L4.30377 20.5935Z"
                fill="currentColor"
              />
            </svg>
            <span className={styles.logoText}>Relax Map</span>
          </Link>
        </header>

        <section className={styles.content}>
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