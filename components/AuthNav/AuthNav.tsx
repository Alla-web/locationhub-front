"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./AuthNav.module.css";

type Props = {
  onLinkClick?: () => void;
};

const AuthNav = ({ onLinkClick }: Props) => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();

  const getLinkClass = (path: string) =>
    `${css.navLink} ${pathname === path ? css.active : ""}`;

  return (
    <nav className={css.nav}>
      <ul className={css.navList}>
        <li>
          <Link
            href="/"
            className={getLinkClass("/locations")}
            onClick={onLinkClick}
          >
            Головна
          </Link>
        </li>

        <li>
          <Link
            href="/locations"
            className={getLinkClass("/locations")}
            onClick={onLinkClick}
          >
            Місця відпочинку
          </Link>
        </li>

        {isAuthenticated && (
          <li>
            <Link
              href="/pro"
              className={getLinkClass("/pro")}
              onClick={onLinkClick}
            >
              Мій профіль
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default AuthNav;
