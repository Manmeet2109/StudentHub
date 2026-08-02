import StudentCard from "../../components/student/StudentCard";
import { useStudents } from "../../context/StudentContext";
import styles from "./Students.module.css";

function Students() {
  const { students, deleteStudent } = useStudents();

  return (
    <div>
      <h2>Students</h2>
      <div className={styles.grid}>
        {students.map((student) => (
          <StudentCard key={student.id} student={student} onDelete={deleteStudent} />
        ))}
      </div>
    </div>
  );
}

export default Students;