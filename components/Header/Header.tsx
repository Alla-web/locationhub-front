"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/api";

import css from "./Header.module.css";
import MainNavi from "@/components/MainNavi/MainNavi";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    setIsMenuOpen(false);
    router.push("/login");
  };

  const openMenu = () => {
    if (window.innerWidth >= 1440) return;
    setIsMenuOpen(true);
  };

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1440) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className={css.header}>
      <div className={`container ${css.headerContainer}`}>
        <Link href="/" className={css.logo}>
          <svg className={[css.icon, css.iconLogo].join(" ")}>
            <use href="/icons.svg#icon-map_search" />
          </svg>
          <span className={css.logoText}>Relax Map</span>
        </Link>

        <div className={css.desktopNav}>
          <MainNavi />
        </div>

        <div className={css.actions}>
          <div className={css.desktopActions}>
            {isAuthenticated ? (
              <>
                <Link
                  href="/locations/add"
                  className={`btn-base btn ${css.btnTablet}`}
                >
                  Опублікувати статтю
                </Link>

                <Link
                  href="/locations/add"
                  className={`btn-base btn ${css.btnDesktop}`}
                >
                  Поділитись локацією
                </Link>

                <div className={css.desktopProfile}>
                  <div className={css.profileBox}>
                    <div className={css.avatar}></div>
                    <span className={css.userName}>{user?.name || "Ім’я"}</span>
                  </div>

                  <span className={css.divider}></span>

                  <button
                    type="button"
                    className={`iconBtn ${css.iconBtn}`}
                    onClick={handleLogout}
                    aria-label="Вийти"
                  >
                    <svg className={css.icon}>
                      <use href="/icons.svg#icon-logout" />
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="btn-base btn-white">
                  Вхід
                </Link>

                <Link href="/register" className="btn-base btn">
                  Реєстрація
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            className={`icon-btn ${css.burgerBtn}`}
            onClick={openMenu}
            aria-label="Відкрити меню"
          >
            <svg className={css.icon}>
              <use href="/icons.svg#icon-menu" />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className={css.mobileMenu}>
          <div className={css.mobileMenuHeader}>
            <Link href="/" className={css.logo} onClick={closeMenu}>
              <svg className={css.icon}>
                <use href="/icons.svg#icon-map_search" />
              </svg>
              <span className={css.logoText}>Relax Map</span>
            </Link>

            <div className={css.mobileMenuHeaderRight}>
              {!isAuthenticated && (
                <div className={css.mobileMenuTopActions}>
                  <Link
                    href="/login"
                    className="btn-base btn-white"
                    onClick={closeMenu}
                  >
                    Вхід
                  </Link>

                  <Link
                    href="/register"
                    className="btn-base btn"
                    onClick={closeMenu}
                  >
                    Реєстрація
                  </Link>
                </div>
              )}

              <button
                type="button"
                className={`icon-btn ${css.closeBtn}`}
                onClick={closeMenu}
                aria-label="Закрити меню"
              >
                <svg className={[css.icon, css.iconClose].join(" ")}>
                  <use href="/icons.svg#icon-close" />
                </svg>
              </button>
            </div>
          </div>

          <div className={css.mobileMenuContent}>
            <MainNavi onLinkClick={closeMenu} />

            <div className={css.mobileBottom}>
              {isAuthenticated ? (
                <div className={css.mobileProfile}>
                  <div className={css.avatar}></div>

                  <span className={css.userName}>{user?.name || "Ім’я"}</span>

                  <span className={css.divider}></span>

                  <button
                    type="button"
                    className={`iconBtn ${css.iconBtn}`}
                    onClick={handleLogout}
                    aria-label="Вийти"
                  >
                    <svg className={css.icon}>
                      <use href="/icons.svg#icon-logout" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className={css.mobileAuthButtons}>
                  <Link
                    href="/login"
                    className={`btn-base btn-white ${css.mobileFullBtn}`}
                    onClick={closeMenu}
                  >
                    Вхід
                  </Link>

                  <Link
                    href="/register"
                    className={`btn-base btn ${css.mobileFullBtn}`}
                    onClick={closeMenu}
                  >
                    Реєстрація
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
