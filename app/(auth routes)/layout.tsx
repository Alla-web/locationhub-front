import AuthHeader from "@/components/AuthHeader/AuthHeader";
import css from "./AuthLayout.module.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  const year = new Date().getFullYear();
  return (
    <div className={css.wrapper}>
      <AuthHeader />
      <main className={css.authContainer}>{children}</main>
      <footer className={css.authFooter}>
        © {year} Relax Map
      </footer>
    </div>
  );
}
