"use client";
import styles from "./Hero.module.css";
import CoupeCard from "./CoupeCard";
import BarberCard3D from "./BarberCard3D";
import { useGsapAnimations } from "@/hooks/useGsapAnimations";
import {
  Award, Users, Sparkles,
  MapPin, Phone, Clock,
  Instagram, Facebook,
} from "lucide-react";

const features = [
  { icon: <Award size={22} color="#0a0a08" />,    title: "Professionnalisme",     desc: "Maîtres expérimentés avec certifications internationales" },
  { icon: <Users size={22} color="#0a0a08" />,    title: "Approche individuelle", desc: "On prend en compte les particularités de chaque client" },
  { icon: <Sparkles size={22} color="#0a0a08" />, title: "Qualité premium",       desc: "On utilise uniquement des cosmétiques professionnels" },
];

const services = [
  {
    icon: "✂️",
    titre: "Coupe classique",
    description: "Coupes classiques et modernes par des professionnels",
    inclus: ["Consultation styliste", "Mise en forme", "Styling"],
    prix: 25,
    devise: "EUR",
  },
  {
    icon: "🪒",
    titre: "Rasage complet",
    description: "Rasage traditionnel à la lame avec serviette chaude",
    inclus: ["Serviette chaude", "Huile de rasage", "Soin après-rasage"],
    prix: 35,
    devise: "EUR",
  },
  {
    icon: "💈",
    titre: "Coupe + Barbe",
    description: "Le combo parfait pour un look impeccable",
    inclus: ["Coupe personnalisée", "Taille barbe", "Finition"],
    prix: 40,
    devise: "EUR",
  },
];

const barbers = [
  { nom: "Marcus Dupont",  specialite: "Master Barber",   experience: "8 ans d'expérience", styleBarber: "Coupes classiques", color: "#e8d44d" },
  { nom: "Antoine Martin", specialite: "Barber-Styliste", experience: "6 ans d'expérience", styleBarber: "Coupes modernes",   color: "#4da6e8" },
  { nom: "Karim Benali",   specialite: "Barbier",         experience: "5 ans d'expérience", styleBarber: "Barbe & Rasage",    color: "#e84d4d" },
];

export default function Hero() {
  useGsapAnimations();

  return (
    <>
      {/* ─── SECTION 1 : HERO ─────────────────────────────── */}
      <section className={styles.hero}>
        <video autoPlay muted loop playsInline className={styles.videoBg}>
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className={styles.videoOverlay} />
        <div className={styles.heroContent}>

          {/* Logo responsive */}
          <div className="hero-logo" style={{ marginBottom: "32px", display: "flex", justifyContent: "center" }}>
            <img
              src="/images/logo.png"
              alt="Barber Lounge"
              style={{ width: "clamp(140px, 30vw, 320px)", height: "auto", display: "block", mixBlendMode: "luminosity" }}
            />
          </div>

          {/* Paragraphe responsive */}
          <p
            className="hero-sub"
            style={{ fontSize: "clamp(14px, 2vw, 18px)", maxWidth: "clamp(280px, 60vw, 560px)", margin: "0 auto 32px", lineHeight: 1.7, textAlign: "center" }}
          >
            Une expérience de grooming d&apos;exception. Prenez rendez-vous et
            laissez nos maîtres barbiers révéler le meilleur de vous.
          </p>

          {/* Bouton hero — plus petit sur mobile */}
          <a
            href="/reservation"
            className={`${styles.btn} hero-btn`}
            style={{
              borderRadius: "40px",
              fontSize: "clamp(11px, 1.5vw, 15px)",
              padding: "clamp(8px, 1.5vw, 14px) clamp(16px, 3vw, 36px)",
            }}
          >
            Réserver maintenant
          </a>
        </div>
      </section>

      {/* ─── SECTION 2 : À PROPOS ─────────────────────────── */}
      <section className={styles.about}>
        <div className={`${styles.imageWrapper} reveal from-left`}>
          <img src="/images/AdobeStock_666745197.jpeg" alt="Barber Lounge" className={styles.image} />
        </div>
        <div className={styles.content}>
          <span className={`${styles.tag} reveal from-right`}>À PROPOS</span>
          <h2 className={`${styles.title} reveal from-right d-100`}>
            Le style masculin<br />dans chaque détail
          </h2>
          <p className={`${styles.desc} reveal from-right d-200`}>
            Barber Lounge — c&apos;est bien plus qu&apos;un simple barbier.
            C&apos;est un endroit où se crée le style, l&apos;atmosphère et la confiance.
          </p>
          <div className={styles.features}>
            {features.map((f, i) => (
              <div key={f.title} className={`${styles.featureItem} reveal d-${(i + 1) * 100 + 200}`}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <div>
                  <div className={styles.featureTitle}>{f.title}</div>
                  <div className={styles.featureDesc}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 3 : SERVICES ─────────────────────────── */}
      <section className={styles.servicesSection} id="services">
        <span className={`${styles.tag} reveal`}>NOS SERVICES</span>
        <h2 className={`${styles.title} reveal d-100`}>Nos prestations</h2>
        <div className={styles.servicesGrid}>
          {services.map((s, i) => (
            <div key={s.titre} className={`reveal scale-in d-${(i + 1) * 100}`}>
              <CoupeCard {...s} />
            </div>
          ))}
        </div>
      </section>

      {/* ─── SECTION 4 : RÉALISATIONS ─────────────────────── */}
      <section className={styles.realisations}>
        <h2 className={`${styles.realisationsTitle} reveal`}>
          Nos <span>réalisations</span>
        </h2>
        <p className={`${styles.realisationsSub} reveal d-100`}>Un aperçu de notre travail</p>
        <div className={styles.grid}>
          <img src="/images/AdobeStock_707404065.jpeg"  alt="Réalisation 1" className={`${styles.photo} ${styles.photoLarge} reveal d-100`} />
          <img src="/images/AdobeStock_666745213.jpeg"  alt="Réalisation 2" className={`${styles.photo} reveal d-200`} />
          <img src="/images/AdobeStock_666745216.jpeg"  alt="Réalisation 3" className={`${styles.photo} reveal d-300`} />
          <img src="/images/AdobeStock_750366393.jpeg"  alt="Réalisation 4" className={`${styles.photo} reveal d-400`} />
          <img src="/images/AdobeStock_1115785972.jpeg" alt="Réalisation 5" className={`${styles.photo} reveal d-500`} />
        </div>
      </section>

      {/* ─── SECTION 5 : ÉQUIPE ───────────────────────────── */}
      <section className={styles.equipe}>
        <span className={`${styles.tag} reveal`}>NOTRE ÉQUIPE</span>
        <h2 className={`${styles.equipeTitle} reveal d-100`}>Barbiers professionnels</h2>
        <p className={`${styles.realisationsSub} reveal d-200`}>
          Chaque barbier est un expert dans son domaine et possède des certifications internationales.
        </p>
        <div className={styles.barbersGrid}>
          {barbers.map((b, i) => (
            <div key={b.nom} className={`reveal scale-in d-${(i + 1) * 100 + 200}`}>
              <BarberCard3D {...b} />
            </div>
          ))}
        </div>
      </section>

      {/* ─── SECTION 6 : CONTACT ──────────────────────────── */}
      <section className={`${styles.contact}`} id="contact">
        <div className={`${styles.contactLeft} reveal from-left`}>
          <span className={styles.tag}>CONTACT</span>
          <h2 className={styles.title}>Nous trouver</h2>
          <div className={styles.contactInfos}>
            <div className={`${styles.contactItem} reveal d-100`}>
              <div className={styles.contactIcon}><MapPin size={20} color="#e8d44d" /></div>
              <div>
                <div className={styles.contactLabel}>ADRESSE</div>
                <div className={styles.contactValue}>12 Rue du Faubourg Saint-Antoine<br />75012 Paris</div>
              </div>
            </div>
            <div className={`${styles.contactItem} reveal d-200`}>
              <div className={styles.contactIcon}><Phone size={20} color="#e8d44d" /></div>
              <div>
                <div className={styles.contactLabel}>TÉLÉPHONE</div>
                <div className={styles.contactValue}>+33 1 23 45 67 89</div>
              </div>
            </div>
            <div className={`${styles.contactItem} reveal d-300`}>
              <div className={styles.contactIcon}><Clock size={20} color="#e8d44d" /></div>
              <div>
                <div className={styles.contactLabel}>HORAIRES</div>
                <div className={styles.contactValue}>Lun – Sam : 9h00 – 19h00<br />Dimanche : Fermé</div>
              </div>
            </div>
          </div>
          <div className={`${styles.socialsRow} reveal d-400`}>
            <a href="#" className={styles.socialBtn} aria-label="Instagram"><Instagram size={18} /></a>
            <a href="#" className={styles.socialBtn} aria-label="Facebook"><Facebook size={18} /></a>
            <a href="#" className={styles.socialBtn} aria-label="TikTok">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
              </svg>
            </a>
          </div>
        </div>
        <div className={`${styles.contactRight} reveal from-right d-200`}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937604!2d2.3700!3d48.8534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDUxJzEyLjMiTiAyws8yMicxMi4wIkU!5e0!3m2!1sfr!2sfr!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </div>
      </section>

      {/* ─── SECTION 7 : CTA ──────────────────────────────── */}
      <section className={`${styles.ctaBanner}`}>
        <h2
          className={`${styles.ctaTitle} reveal`}
          style={{ fontSize: "clamp(22px, 4vw, 48px)" }}
        >
          Prêt pour un nouveau look ?
        </h2>
        <p
          className={`${styles.ctaDesc} reveal d-100`}
          style={{ fontSize: "clamp(13px, 1.8vw, 18px)" }}
        >
          Réservez en ligne et bénéficiez de 10% sur votre première visite
        </p>
        <a
href="/reservation"
  className={`${styles.ctaBtn} reveal d-200`}
  style={{
    borderRadius: "40px",
    fontSize: "clamp(10px, 1.5vw, 16px)",
    padding: "clamp(6px, 1.5vw, 16px) clamp(12px, 3vw, 40px)",
    width: "fit-content",      // ← empêche de prendre toute la largeur
    display: "inline-block",   // ← nécessaire pour que fit-content fonctionne
  }}
>
  Réserver maintenant
</a>
      </section>
    </>
  );
}