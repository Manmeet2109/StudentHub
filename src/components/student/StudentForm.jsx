import { GRADES } from "../../constants/grades";
import styles from "./StudentForm.module.css";

function StudentForm({
  name,
  rollNumber,
  grade,
  errors,
  onNameChange,
  onRollNumberChange,
  onGradeChange,
  onSubmit,
  onCancel,
  submitLabel,
}) {
  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          aria-describedby={errors.name ? "name-error" : undefined}
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name && (
          <p id="name-error" className={styles.error} role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="rollNumber">Roll Number</label>
        <input
          id="rollNumber"
          type="text"
          value={rollNumber}
          onChange={(event) => onRollNumberChange(event.target.value)}
          aria-describedby={errors.rollNumber ? "rollNumber-error" : undefined}
          aria-invalid={Boolean(errors.rollNumber)}
        />
        {errors.rollNumber && (
          <p id="rollNumber-error" className={styles.error} role="alert">
            {errors.rollNumber}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="grade">Grade</label>
        <select
          id="grade"
          value={grade}
          onChange={(event) => onGradeChange(event.target.value)}
          aria-describedby={errors.grade ? "grade-error" : undefined}
          aria-invalid={Boolean(errors.grade)}
        >
          <option value="">Select a grade</option>
          {GRADES.map((gradeOption) => (
            <option key={gradeOption} value={gradeOption}>
              {gradeOption}
            </option>
          ))}
        </select>
        {errors.grade && (
          <p id="grade-error" className={styles.error} role="alert">
            {errors.grade}
          </p>
        )}
      </div>

      <div className={styles.buttonRow}>
        <button type="submit" className={styles.primaryButton}>
          {submitLabel}
        </button>
        <button type="button" className={styles.cancelButton} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default StudentForm;