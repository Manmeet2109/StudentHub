// StudentCard.jsx — displays one student's summary info
import Card from '../common/Card'
import styles from './StudentCard.module.css'

function StudentCard({ student }) {
  return (
    <Card>
      <h3 className={styles.name}>{student.name}</h3>
      <p className={styles.detail}>Roll No: {student.rollNumber}</p>
      <p className={styles.detail}>Grade: {student.grade}</p>
    </Card>
  )
}

export default StudentCard