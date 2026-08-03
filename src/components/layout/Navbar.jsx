import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <header className={styles.navbar}>
      <span className={styles.logo} aria-hidden="true">🎓</span>
      <h1 className={styles.title}>StudentHub</h1>
    </header>
  );
}

export default Navbar;