"use client";

<<<<<<< HEAD
import { useState, useEffect } from "react";
=======
import { useState } from "react";
>>>>>>> origin/main
import styles from "./ReservationForm.module.css";

const services = [
  { id: "coupe", nom: "Coupe classique", duree: "45 Min", prix: 25 },
  { id: "barbe", nom: "Barbe & Contours", duree: "30 Min", prix: 20 },
  { id: "combo", nom: "Coupe + Barbe", duree: "60 Min", prix: 40 },
  { id: "rasage", nom: "Rasage complet", duree: "30 Min", prix: 25 },
  { id: "soin", nom: "Soin du visage", duree: "45 Min", prix: 30 },
];

const barbers = [
  { id: "marcus", nom: "Marcus", role: "Coupes classiques" },
  { id: "antoine", nom: "Antoine", role: "Styles modernes" },
  { id: "karim", nom: "Karim", role: "Spécialiste Barbe" },
];

const creneaux = [
  "09:00","09:30","10:00","10:30",
  "11:00","11:30","12:00","12:30",
  "13:00","13:30","14:00","14:30",
  "15:00","15:30","16:00","16:30",
  "17:00","17:30","18:00",
];
<<<<<<< HEAD
=======
const indispos = ["10:00", "13:30", "16:00"];
>>>>>>> origin/main

export default function ReservationForm() {
  const [etape, setEtape] = useState(1);
  const [service, setService] = useState<typeof services[0] | null>(null);
  const [barbier, setBarbier] = useState<typeof barbers[0] | null>(null);
  const [date, setDate] = useState("");
  const [creneau, setCreneau] = useState("");
  const [form, setForm] = useState({ prenom: "", nom: "", tel: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [confirme, setConfirme] = useState(false);
<<<<<<< HEAD
  const [indispos, setIndispos] = useState<string[]>([]);

  useEffect(() => {
    if (date && barbier) {
      fetch(`/api/slots?date=${date}&barbierId=${barbier.id}`)
        .then((res) => res.json())
        .then((data) => setIndispos(Array.isArray(data) ? data : []))
        .catch(() => setIndispos([]));
    }
  }, [date, barbier]);
=======
>>>>>>> origin/main

  const today = new Date().toISOString().split("T")[0];
  const dateLabel = date
    ? new Date(date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
    : "—";

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: service!.id,
          serviceNom: service!.nom,
          servicePrix: service!.prix,
          barbierId: barbier!.id,
          barbierNom: barbier!.nom,
          date,
          creneau,
          prenom: form.prenom,
          nom: form.nom,
          tel: form.tel,
          email: form.email,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Erreur lors de la réservation");
        return;
      }

      setConfirme(true);
    } catch (err) {
      alert("Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  const steps = ["Service", "Barbier", "Date & Heure", "Vos infos"];

  if (confirme) {
    return (
      <div className={styles.page}>
        <div className={styles.wrapper}>
          <div className={styles.successIcon}>✓</div>
          <h2 className={styles.successTitle}>Réservation confirmée !</h2>
          <p className={styles.successSub}>Un SMS de confirmation vous sera envoyé.</p>
          <div className={styles.innerCard}>
            <div className={styles.detailRow}><span>Service</span><strong>{service?.nom}</strong></div>
            <div className={styles.detailRow}><span>Barbier</span><strong>{barbier?.nom}</strong></div>
            <div className={styles.detailRow}><span>Date</span><strong>{dateLabel}</strong></div>
            <div className={styles.detailRow}><span>Heure</span><strong>{creneau}</strong></div>
            <div className={styles.detailRow}><span>Prix</span><strong className={styles.prix}>{service?.prix}€</strong></div>
            <div className={styles.detailRow}><span>Client</span><strong>{form.prenom} {form.nom}</strong></div>
          </div>
          <div className={styles.code}>RDV-{Date.now().toString().slice(-6)}</div>
          <a href="/" className={styles.backBtn}>← Retour à l'accueil</a>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>

        {/* ── ÉTAPES ── */}
        <div className={styles.steps}>
          {steps.map((label, i) => (
            <div key={label} className={styles.stepItem}>
              <div className={`${styles.stepCircle} ${etape === i + 1 ? styles.active : ""} ${etape > i + 1 ? styles.done : ""}`}>
                {etape > i + 1 ? "✓" : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={`${styles.stepLine} ${etape > i + 1 ? styles.stepLineDone : ""}`} />
              )}
            </div>
          ))}
        </div>

        {/* ── ÉTAPE 1 : SERVICE ── */}
        {etape === 1 && (
          <div className={styles.innerCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIcon}>✂</span>
              <h2 className={styles.sectionTitle}>Choisissez un service</h2>
            </div>
            <div className={styles.list}>
              {services.map((s) => (
                <div
                  key={s.id}
                  className={`${styles.listItem} ${service?.id === s.id ? styles.listItemSelected : ""}`}
                  onClick={() => { setService(s); setEtape(2); }}
                >
                  <div>
                    <div className={styles.listItemTitle}>{s.nom}</div>
                    <div className={styles.listItemSub}>{s.duree}</div>
                  </div>
                  <div className={styles.listItemPrix}>{s.prix}€</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ÉTAPE 2 : BARBIER ── */}
        {etape === 2 && (
          <div className={styles.innerCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIcon}>👤</span>
              <h2 className={styles.sectionTitle}>Choisissez un barbier</h2>
            </div>
            <div className={styles.list}>
              {barbers.map((b) => (
                <div
                  key={b.id}
                  className={`${styles.listItem} ${barbier?.id === b.id ? styles.listItemSelected : ""}`}
                  onClick={() => setBarbier(b)}
                >
                  <div>
                    <div className={styles.listItemTitle}>{b.nom}</div>
                    <div className={styles.listItemSub}>{b.role}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.nav}>
              <button className={styles.btnBack} onClick={() => setEtape(1)}>Retour</button>
              <button className={styles.btnNext} onClick={() => setEtape(3)} disabled={!barbier}>Suivant</button>
            </div>
          </div>
        )}

        {/* ── ÉTAPE 3 : DATE & HEURE ── */}
        {etape === 3 && (
          <div className={styles.innerCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIcon}>📅</span>
              <h2 className={styles.sectionTitle}>Date & Heure</h2>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Date</label>
              <input
                type="date"
                className={styles.dateInput}
                min={today}
                value={date}
                onChange={e => { setDate(e.target.value); setCreneau(""); }}
              />
            </div>

            {date && (
              <div className={styles.formGroup}>
                <div className={styles.creneauHeader}>
                  <span className={styles.sectionIcon}>🕐</span>
                  <label className={styles.label}>Heure</label>
                </div>
                <div className={styles.creneaux}>
                  {creneaux.map((c) => {
                    const indispo = indispos.includes(c);
                    return (
                      <button
                        key={c}
                        className={`${styles.creneau} ${indispo ? styles.creneauIndispo : ""} ${creneau === c ? styles.creneauSelected : ""}`}
                        onClick={() => !indispo && setCreneau(c)}
                        disabled={indispo}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className={styles.nav}>
              <button className={styles.btnBack} onClick={() => setEtape(2)}>Retour</button>
              <button className={styles.btnNext} onClick={() => setEtape(4)} disabled={!date || !creneau}>Suivant</button>
            </div>
          </div>
        )}

        {/* ── ÉTAPE 4 : INFOS ── */}
        {etape === 4 && (
          <div className={styles.innerCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIcon}>📋</span>
              <h2 className={styles.sectionTitle}>Vos informations</h2>
            </div>

            <div className={styles.recap}>
              <div className={styles.recapRow}><span>Service</span><strong>{service?.nom} — {service?.prix}€</strong></div>
              <div className={styles.recapRow}><span>Barbier</span><strong>{barbier?.nom}</strong></div>
              <div className={styles.recapRow}><span>Date</span><strong>{dateLabel} à {creneau}</strong></div>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Prénom *</label>
                <input className={styles.input} placeholder="Jean" value={form.prenom} onChange={e => setForm({ ...form, prenom: e.target.value })} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Nom *</label>
                <input className={styles.input} placeholder="Dupont" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Téléphone *</label>
                <input className={styles.input} placeholder="06 12 34 56 78" value={form.tel} onChange={e => setForm({ ...form, tel: e.target.value })} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Email *</label>
                <input className={styles.input} placeholder="jean@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>

            <div className={styles.nav}>
              <button className={styles.btnBack} onClick={() => setEtape(3)}>Retour</button>
              <button
                className={styles.btnConfirm}
                onClick={handleSubmit}
                disabled={!form.prenom || !form.nom || !form.tel || !form.email || loading}
              >
                {loading ? "Confirmation..." : "Confirmer le RDV"}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}