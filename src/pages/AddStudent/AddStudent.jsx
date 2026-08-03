import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudents } from "../../context/StudentContext";
import { validateStudent } from "../../utils/validateStudent";
import { GRADES } from "../../constants/grades";
import styles from "./AddStudent.module.css";

function AddStudent() {
  const { students, addStudent } = useStudents();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [grade, setGrade] = useState("");
  const [errors, setErrors] = useState({});

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateStudent({ name, rollNumber, grade }, students);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const nextId =
      students.length > 0
        ? Math.max(...students.map((student) => student.id)) + 1
        : 1;

    addStudent({
      id: nextId,
      name: name.trim(),
      rollNumber: rollNumber.trim(),
      grade,
    });
    navigate("/students");
  }

  function handleCancel() {
    navigate("/students");
  }

  return (
    <div className="page">
      <h2>Add Student</h2>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
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
            onChange={(event) => setRollNumber(event.target.value)}
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
            onChange={(event) => setGrade(event.target.value)}
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
            Add Student
          </button>
          <button type="button" className={styles.cancelButton} onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddStudent;