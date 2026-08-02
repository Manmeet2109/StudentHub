// Students.jsx — student list page at "/students"
import StudentCard from '../../components/student/StudentCard'
import styles from './Students.module.css'

// Temporary hardcoded data — replaced by Local Storage-backed state in Phase 4
const sampleStudents = [
  { id: 1, name: 'Aditi Sharma', rollNumber: 'S101', grade: '10th' },
  { id: 2, name: 'Rohan Mehta', rollNumber: 'S102', grade: '9th' },
  { id: 3, name: 'Priya Nair', rollNumber: 'S103', grade: '10th' },
]

function Students() {
  return (
    <div>
      <h2>Students</h2>
      <div className={styles.grid}>
        {sampleStudents.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>
    </div>
  )
}

export default Students