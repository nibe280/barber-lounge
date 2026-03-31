import styles from './CoupeCard.module.css'
import { Scissors, Zap, Layers } from 'lucide-react'
import type { ReactNode } from 'react'

const iconMap: Record<string, ReactNode> = {
  "✂️": <Scissors size={22} color="#0a0a08" />,
  "🪒": <Zap      size={22} color="#0a0a08" />,
  "💈": <Layers   size={22} color="#0a0a08" />,
}

interface CoupeCardProps {
  icon: string
  titre: string
  description: string
  inclus: string[]
  prix: number
  devise?: string
}

const CoupeCard: React.FC<CoupeCardProps> = ({
  icon,
  titre,
  description,
  inclus,
  prix,
  devise = "EUR"
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.iconBox}>
        {iconMap[icon] ?? <Scissors size={22} color="#0a0a08" />}
      </div>
      <h3 className={styles.titre}>{titre}</h3>
      <p className={styles.description}>{description}</p>

      <ul className={styles.list} style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {inclus.map((item) => (
          <li key={item} className={styles.listItem} style={{ listStyle: "none" }}>
            {item}
          </li>
        ))}
      </ul>

      <div className={styles.footer}>
        <span className={styles.from}>à partir de</span>
        <span className={styles.prix}>{prix} {devise}</span>
      </div>
    </div>
  )
}

export default CoupeCard