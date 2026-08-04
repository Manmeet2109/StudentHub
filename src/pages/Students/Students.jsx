import { useState } from "react";
import StudentCard from "../../components/student/StudentCard";
import { useStudents } from "../../context/StudentContext";
import { filterStudents } from "../../utils/filterStudents";
import { sortStudents } from "../../utils/sortStudents";
import { GRADES } from "../../constants/grades";
import styles from "./Students.module.css";

const SORT_OPTIONS = [
  { value: "name-asc", label: "Name (A–Z)" },
  { value: "name-desc", label: "Name (Z–A)" },
  { value: "rollNumber-asc", label: "Roll Number" },
  { value: "grade-asc", label: "Grade" },
];

function Students() {
  const { students, deleteStudent } = useStudents();
  const [searchText, setSearchText] = useState("");
  const [gradeFilter, setGradeFilter] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");

  const filteredStudents = filterStudents(students, { searchText, gradeFilter });
  const visibleStudents = sortStudents(filteredStudents, sortBy);

  const hasAnyStudents = students.length > 0;

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
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            aria-label="Sort students"
            className={styles.sortSelect}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                Sort: {option.label}
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
      ) : visibleStudents.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyIcon} aria-hidden="true">🔍</p>
          <p className={styles.emptyTitle}>No matching students</p>
          <p className={styles.emptyText}>
            Try a different search term or grade filter.
          </p>
        </div>
      ) : (
        <div className={styles.grid}>
          {visibleStudents.map((student) => (
            <StudentCard key={student.id} student={student} onDelete={deleteStudent} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Students;