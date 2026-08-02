import { Link } from "react-router-dom";
import Card from "../common/Card";
import styles from "./StudentCard.module.css";

function StudentCard({ student, onDelete }) {
  return (
    <Card>
      <h3 className={styles.name}>{student.name}</h3>
      <p className={styles.detail}>Roll No: {student.rollNumber}</p>
      <p className={styles.detail}>Grade: {student.grade}</p>
      <div className={styles.actions}>
        <Link to={`/students/edit/${student.id}`} className={styles.editLink}>
          Edit
        </Link>
        <button
          type="button"
          className={styles.deleteButton}
          onClick={() => onDelete(student.id)}
        >
          Delete
        </button>
      </div>
    </Card>
  );
}

export default StudentCard;