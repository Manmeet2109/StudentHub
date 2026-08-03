import { Link } from "react-router-dom";
import Card from "../common/Card";
import styles from "./StudentCard.module.css";

function StudentCard({ student, onDelete }) {
  function handleDeleteClick() {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${student.name}"?\nThis action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    onDelete(student.id);
  }

  return (
    <Card>
      <h3 className={styles.name}>{student.name}</h3>
      <p className={styles.detail}>
        <span aria-hidden="true">🪪</span> Roll No: {student.rollNumber}
      </p>
      <p className={styles.detail}>
        <span aria-hidden="true">🎒</span> Grade: {student.grade}
      </p>
      <div className={styles.actions}>
        <Link to={`/students/edit/${student.id}`} className={styles.editLink}>
          ✎ Edit
        </Link>
        <button
          type="button"
          className={styles.deleteButton}
          onClick={handleDeleteClick}
        >
          🗑 Delete
        </button>
      </div>
    </Card>
  );
}

export default StudentCard;