import Link from "next/link";
import css from "./AuthHeader.module.css";

const AuthHeader = () => {
  return (
    <header className={css.header}>
      <div className={`container ${css.headerContainer}`}>
        <Link href="/" className={css.logo}>
          <svg className={css.icon}>
            <use href="/icons.svg#icon-map_search" />
          </svg>
          <span className={css.logoText}>Relax Map</span>
        </Link>
      </div>
    </header>
  );
};

export default AuthHeader;
