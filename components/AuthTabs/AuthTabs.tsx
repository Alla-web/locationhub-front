import Link from "next/link";
import css from "./AuthTabs.module.css";

type AuthTabsProps = {
  current: "login" | "register";
};

export default function AuthTabs({ current }: AuthTabsProps) {
  return (
    <nav className={css.tabs} aria-label="Auth tabs">
      <Link
        href="/register"
        className={`${css.tab} ${current === "register" ? css.active : ""}`}
      >
        Реєстрація
      </Link>

      <Link
        href="/login"
        className={`${css.tab} ${current === "login" ? css.active : ""}`}
      >
        Вхід
      </Link>
    </nav>
  );
}