"use client";

import { useState, useEffect } from "react";
import styles from "./admin.module.css";

interface Reservation {
  id: string;
  createdAt: string;
  prenom: string;
  nom: string;
  tel: string;
  email: string;
  serviceNom: string;
  servicePrix: number;
  barbierNom: string;
  date: string;
  creneau: string;
  statut: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(false);
  const [error, setError] = useState("");
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("tous");

  const login = async () => {
    setLoading(true);
    const res = await fetch("/api/admin", {
      headers: { "x-admin-password": password },
    });
    if (res.ok) {
      const data = await res.json();
      setReservations(data);
      setAuth(true);
      setError("");
    } else {
      setError("Mot de passe incorrect");
    }
    setLoading(false);
  };

  const updateStatut = async (id: string, statut: string) => {
    await fetch("/api/admin", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password,
      },
      body: JSON.stringify({ id, statut }),
    });
    setReservations(prev =>
      prev.map(r => r.id === id ? { ...r, statut } : r)
    );
  };

  const filtered = reservations.filter(r =>
    filter === "tous" ? true : r.statut === filter
  );

  const stats = {
    total: reservations.length,
    confirme: reservations.filter(r => r.statut === "confirmé").length,
    annule: reservations.filter(r => r.statut === "annulé").length,
    revenus: reservations.filter(r => r.statut === "confirmé").reduce((acc, r) => acc + r.servicePrix, 0),
  };

  if (!auth) {
    return (
      <div className={styles.loginPage}>
        <div className={styles.loginCard}>
          <div className={styles.loginLogo}>✂ ADMIN</div>
          <h1 className={styles.loginTitle}>Accès réservé</h1>
          <p className={styles.loginSub}>Dashboard Barber Lounge</p>
          <div className={styles.loginForm}>
            <input
              type="password"
              className={styles.loginInput}
              placeholder="Mot de passe"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && login()}
            />
            {error && <p className={styles.loginError}>{error}</p>}
            <button className={styles.loginBtn} onClick={login} disabled={loading}>
              {loading ? "Vérification..." : "Accéder →"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>

      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.headerLogo}>✂</span>
          <div>
            <h1 className={styles.headerTitle}>Dashboard Admin</h1>
            <p className={styles.headerSub}>Barber Lounge</p>
          </div>
        </div>
        <button className={styles.logoutBtn} onClick={() => setAuth(false)}>
          Déconnexion
        </button>
      </div>

      {/* STATS */}
      <div className={styles.stats}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{stats.total}</div>
          <div className={styles.statLabel}>Total RDV</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue} style={{ color: "#e8d44d" }}>{stats.confirme}</div>
          <div className={styles.statLabel}>Confirmés</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue} style={{ color: "#ff4444" }}>{stats.annule}</div>
          <div className={styles.statLabel}>Annulés</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue} style={{ color: "#e8d44d" }}>{stats.revenus}€</div>
          <div className={styles.statLabel}>Revenus</div>
        </div>
      </div>

      {/* FILTRES */}
      <div className={styles.filters}>
        {["tous", "confirmé", "annulé"].map(f => (
          <button
            key={f}
            className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ""}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
        <span className={styles.filterCount}>{filtered.length} résultat{filtered.length > 1 ? "s" : ""}</span>
      </div>

      {/* TABLE */}
      <div className={styles.tableWrapper}>
        {filtered.length === 0 ? (
          <div className={styles.empty}>Aucune réservation trouvée</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Client</th>
                <th>Contact</th>
                <th>Service</th>
                <th>Barbier</th>
                <th>Date & Heure</th>
                <th>Prix</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id}>
                  <td>
                    <div className={styles.clientNom}>{r.prenom} {r.nom}</div>
                    <div className={styles.clientDate}>
                      {new Date(r.createdAt).toLocaleDateString("fr-FR")}
                    </div>
                  </td>
                  <td>
                    <div className={styles.contact}>{r.tel}</div>
                    <div className={styles.contactEmail}>{r.email}</div>
                  </td>
                  <td>{r.serviceNom}</td>
                  <td>{r.barbierNom}</td>
                  <td>
                    <div>{new Date(r.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}</div>
                    <div className={styles.creneau}>{r.creneau}</div>
                  </td>
                  <td className={styles.prix}>{r.servicePrix}€</td>
                  <td>
                    <span className={`${styles.badge} ${r.statut === "confirmé" ? styles.badgeConfirme : styles.badgeAnnule}`}>
                      {r.statut}
                    </span>
                  </td>
                  <td>
                    {r.statut === "confirmé" ? (
                      <button
                        className={styles.btnAnnuler}
                        onClick={() => updateStatut(r.id, "annulé")}
                      >
                        Annuler
                      </button>
                    ) : (
                      <button
                        className={styles.btnReactiver}
                        onClick={() => updateStatut(r.id, "confirmé")}
                      >
                        Réactiver
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}