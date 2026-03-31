import Link from "next/link";
import css from "./Footer.module.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={css.footer}>
      <div className={`container ${css.footerContainer}`}>
        <div className={css.topRow}>
          <Link href="/" className={css.logo}>
            <svg className={css.logoIcon}>
              <use href="/icons.svg#icon-map_search" />
            </svg>
            <span className={css.logoText}>Relax Map</span>
          </Link>

          <div className={css.socials}>
            <a href="#" className={css.socialLink} aria-label="Facebook">
              <svg className={css.socialIcon}>
                <use href="/icons.svg#icon-Facebook" />
              </svg>
            </a>

            <a href="#" className={css.socialLink} aria-label="Instagram">
              <svg className={css.socialIcon}>
                <use href="/icons.svg#icon-Instagram" />
              </svg>
            </a>

            <a href="#" className={css.socialLink} aria-label="X">
              <svg className={css.socialIcon}>
                <use href="/icons.svg#icon-X" />
              </svg>
            </a>

            <a href="#" className={css.socialLink} aria-label="YouTube">
              <svg className={css.socialIcon}>
                <use href="/icons.svg#icon-Youtube" />
              </svg>
            </a>
          </div>

          <nav className={css.nav}>
            <Link href="/" className={`link ${css.footerLink}`}>
              Головна
            </Link>
            <Link href="/locations" className={`link ${css.footerLink}`}>
              Місця відпочинку
            </Link>
          </nav>
        </div>

        <div className={css.bottomRow}>
          <p className={css.copy}>
            © {year} Природні Мандри. Усі права захищені.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
