"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./MainNavi.module.css";

type Props = {
  onLinkClick?: () => void;
};

const MainNavi = ({ onLinkClick }: Props) => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();

  const getLinkClass = (path: string) =>
    `${css.navLink} ${pathname === path ? css.active : ""}`;

  return (
    <nav className={css.nav}>
      <ul className={css.navList}>
        <li>
          <Link href="/" className={getLinkClass("/")} onClick={onLinkClick}>
            Головна
          </Link>
        </li>

        <li>
          <Link
            href="/locations/filter/all"
            className={getLinkClass("/locations")}
            onClick={onLinkClick}
          >
            Місця відпочинку
          </Link>
        </li>

        {isAuthenticated && (
          <li>
            <Link
              href="/profile"
              className={getLinkClass("/profile")}
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

export default MainNavi;
