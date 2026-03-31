"use client";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navItems = [
  { name: "Home",         path: "/" },
  { name: "Réservations", path: "/reservation" },
];

interface NavbarProps {
  token: string | null;
  setToken?: (token: string | null) => void;
}

export default function Navbar({ token, setToken }: NavbarProps) {
  const pathname  = usePathname();
  const router    = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Sur la page réservation la navbar est toujours visible
  const isReservation = pathname === "/reservation";
  const visible = isReservation || scrolled;

  useEffect(() => {
    // Inutile d'écouter le scroll si on est sur /reservation
    if (isReservation) return;

    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isReservation]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setToken?.(null);
    router.push("/");
  };

  return (
    <>
      <nav
        className={styles.nav}
        style={{
          transform: visible ? "translateY(0)" : "translateY(-110%)",
          opacity:   visible ? 1 : 0,
          transition: "transform 500ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms ease",
          background:     "rgba(10, 10, 10, 0.92)",
          backdropFilter: "blur(12px)",
          borderBottom:   "1px solid rgba(232, 212, 77, 0.12)",
        }}
      >
        {/* LOGO */}
        <div className={styles.logo}>
          <img
            src="/images/logo.png"
            alt="Barber Lounge"
            style={{ height: "40px", width: "auto", display: "block" }}
          />
        </div>

        {/* LIENS DESKTOP */}
        <div className={styles.links}>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={
                pathname === item.path
                  ? `${styles.link} ${styles.active}`
                  : styles.link
              }
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* BURGER */}
        <button
          className={styles.burger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`${styles.burgerLine} ${menuOpen ? styles.line1Open : ""}`} />
          <span className={`${styles.burgerLine} ${menuOpen ? styles.line2Open : ""}`} />
          <span className={`${styles.burgerLine} ${menuOpen ? styles.line3Open : ""}`} />
        </button>
      </nav>

      {/* MENU MOBILE */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}>
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className={styles.mobileLink}
            onClick={() => setMenuOpen(false)}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* OVERLAY */}
      {menuOpen && (
        <div className={styles.overlay} onClick={() => setMenuOpen(false)} />
      )}
    </>
  );
}