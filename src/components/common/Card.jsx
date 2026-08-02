// Card.jsx — generic bordered container, used across features
import styles from "./Card.module.css";

function Card({ children }) {
  return (
    <div className={styles.card}>
      {children}
    </div>
  );
}

export default Card;