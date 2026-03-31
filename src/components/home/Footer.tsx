// components/home/Footer.tsx
import styles from "./Footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>

        {/* LOGO + DESC */}
        <div className={styles.brand}>
          <div className={styles.logo}>
            <img
              src="/images/logo.png"
              alt="Barber Lounge"
              style={{ height: "48px", width: "auto", display: "block" }}
            />
          </div>
          <p className={styles.brandDesc}>
            Barbier premium à Paris. Style et qualité depuis 2018.
          </p>
        </div>

        {/* NAVIGATION */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Navigation</h4>
          <ul className={styles.colLinks}>
            <li><Link href="#about">À propos</Link></li>
            <li><Link href="#services">Services</Link></li>
            <li><Link href="#realisations">Réalisations</Link></li>
            <li><Link href="#contact">Contact</Link></li>
          </ul>
        </div>

        {/* SERVICES */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Services</h4>
          <ul className={styles.colLinks}>
            <li><Link href="#">Coupe classique</Link></li>
            <li><Link href="#">Barbe</Link></li>
            <li><Link href="#">Rasage</Link></li>
            <li><Link href="#">Soin visage</Link></li>
          </ul>
        </div>

        {/* CONTACTS */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Contacts</h4>
          <ul className={styles.colLinks}>
            <li>📞 +33 1 23 45 67 89</li>
            <li>✉️ contact@barberlounge.fr</li>
          </ul>
          <div className={styles.socials}>
            <a href="#" className={styles.socialBtn}>ig</a>
            <a href="#" className={styles.socialBtn}>fb</a>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className={styles.bottom}>
        <p>© 2026 BARBER LOUNGE. Tous droits réservés. | Paris, France</p>
      </div>
    </footer>
  );
}