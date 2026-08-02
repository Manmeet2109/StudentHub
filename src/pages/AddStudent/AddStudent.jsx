import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudents } from "../../context/StudentContext";
import { validateStudent } from "../../utils/validateStudent";
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

  return (
    <div>
      <h2>Add Student</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>

        <div className={styles.field}>
          <label htmlFor="rollNumber">Roll Number</label>
          <input
            id="rollNumber"
            type="text"
            value={rollNumber}
            onChange={(event) => setRollNumber(event.target.value)}
          />
          {errors.rollNumber && <p className={styles.error}>{errors.rollNumber}</p>}
        </div>

        <div className={styles.field}>
          <label htmlFor="grade">Grade</label>
          <select
            id="grade"
            value={grade}
            onChange={(event) => setGrade(event.target.value)}
          >
            <option value="">Select a grade</option>
            <option value="9th">9th</option>
            <option value="10th">10th</option>
            <option value="11th">11th</option>
            <option value="12th">12th</option>
          </select>
          {errors.grade && <p className={styles.error}>{errors.grade}</p>}
        </div>

        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}

export default AddStudent;