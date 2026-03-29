import Link from 'next/link';
import styles from './page.module.css';

export default function SignUpPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.topBar}>
          <Link href="/" className={styles.logo}>
            Relax Map
          </Link>
        </div>

        <section className={styles.formWrapper}>
          <div className={styles.tabs}>
            <span className={styles.activeTab}>Реєстрація</span>

            <Link href="/sign-in" className={styles.tabLink}>
              Вхід
            </Link>
          </div>

          <h1 className={styles.title}>Реєстрація</h1>

          <form className={styles.form}>
            <label className={styles.field}>
              <span className={styles.label}>Ім&apos;я*</span>
              <input
                type="text"
                placeholder="Ваше ім’я"
                className={styles.input}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Пошта*</span>
              <input
                type="email"
                placeholder="hello@relaxmap.ua"
                className={styles.input}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Пароль*</span>
              <input
                type="password"
                placeholder="******"
                className={styles.input}
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