import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

function linkClassName({ isActive }) {
  return isActive ? `${styles.link} ${styles.linkActive}` : styles.link;
}

function Sidebar() {
  return (
    <nav className={styles.sidebar}>
      <NavLink to="/" end className={linkClassName}>
        <span className={styles.icon} aria-hidden="true">▤</span>
        Dashboard
      </NavLink>
      <NavLink to="/students" className={linkClassName}>
        <span className={styles.icon} aria-hidden="true">🎓</span>
        Students
      </NavLink>
      <NavLink to="/students/add" className={linkClassName}>
        <span className={styles.icon} aria-hidden="true">➕</span>
        Add Student
      </NavLink>
    </nav>
  );
}

export default Sidebar;