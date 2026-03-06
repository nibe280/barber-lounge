import styles from './BarberCard.module.css'

interface BarberCardProps {
  photo: string
  nom: string
  specialite: string
  experience: string
  styleBarber: string
}

const BarberCard: React.FC<BarberCardProps> = ({ photo, nom, specialite, experience, styleBarber }) => {
  return (
    <div className={styles.card}>

      {/* Photo */}
      <div className={styles.photoWrapper}>
        <img src={photo} alt={nom} className={styles.photo} />
        {/* Badge icône haut droite */}
        <div className={styles.badge}>🎖️</div>
      </div>

      {/* Infos en dessous */}
      <div className={styles.infos}>
        <h3 className={styles.nom}>{nom}</h3>
        <span className={styles.specialite}>{specialite}</span>
        <span className={styles.experience}>{experience}</span>
        <span className={styles.styleText}>{styleBarber}</span>
      </div>

    </div>
  )
}

export default BarberCard