import Card from "../../components/common/Card";
import { useStudents } from "../../context/StudentContext";
import { getGradeBreakdown } from "../../utils/getGradeBreakdown";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const { students } = useStudents();
  const gradeBreakdown = getGradeBreakdown(students);

  return (
    <div>
      <h2>Dashboard</h2>

      <div className={styles.summaryGrid}>
        <Card>
          <p className={styles.summaryLabel}>Total Students</p>
          <p className={styles.summaryValue}>{students.length}</p>
        </Card>

        {gradeBreakdown.map(({ grade, count }) => (
          <Card key={grade}>
            <p className={styles.summaryLabel}>{grade}</p>
            <p className={styles.summaryValue}>{count}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;