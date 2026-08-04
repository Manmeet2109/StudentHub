import { useState } from "react";
import StudentCard from "../../components/student/StudentCard";
import { useStudents } from "../../context/StudentContext";
import { filterStudents } from "../../utils/filterStudents";
import { GRADES } from "../../constants/grades";
import styles from "./Students.module.css";

function Students() {
  const { students, deleteStudent } = useStudents();
  const [searchText, setSearchText] = useState("");
  const [gradeFilter, setGradeFilter] = useState("");

  const filteredStudents = filterStudents(students, { searchText, gradeFilter });
  const hasAnyStudents = students.length > 0;
  const hasFiltersApplied = searchText.trim() !== "" || gradeFilter !== "";

  return (
    <div className="page">
      <h2>Students</h2>

      {hasAnyStudents && (
        <div className={styles.filterBar}>
          <input
            type="text"
            placeholder="Search by name or roll number..."
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            aria-label="Search students"
            className={styles.searchInput}
          />
          <select
            value={gradeFilter}
            onChange={(event) => setGradeFilter(event.target.value)}
            aria-label="Filter by grade"
            className={styles.gradeSelect}
          >
            <option value="">All Grades</option>
            {GRADES.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
        </div>
      )}

      {!hasAnyStudents ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyIcon} aria-hidden="true">🎓</p>
          <p className={styles.emptyTitle}>No students yet</p>
          <p className={styles.emptyText}>
            Add your first student to get started.
          </p>
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyIcon} aria-hidden="true">🔍</p>
          <p className={styles.emptyTitle}>No matching students</p>
          <p className={styles.emptyText}>
            Try a different search term or grade filter.
          </p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredStudents.map((student) => (
            <StudentCard key={student.id} student={student} onDelete={deleteStudent} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Students;