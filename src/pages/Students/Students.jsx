import StudentCard from "../../components/student/StudentCard";
import { useStudents } from "../../context/StudentContext";
import styles from "./Students.module.css";

function Students() {
  const { students, deleteStudent } = useStudents();

  return (
    <div className="page">
      <h2>Students</h2>

      {students.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyIcon} aria-hidden="true">🎓</p>
          <p className={styles.emptyTitle}>No students yet</p>
          <p className={styles.emptyText}>
            Add your first student to get started.
          </p>
        </div>
      ) : (
        <div className={styles.grid}>
          {students.map((student) => (
            <StudentCard key={student.id} student={student} onDelete={deleteStudent} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Students;