import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStudents } from "../../context/StudentContext";
import { validateStudent } from "../../utils/validateStudent";
import styles from "./EditStudent.module.css";

function EditStudent() {
  const { id } = useParams();
  const studentId = Number(id);
  const { students, updateStudent } = useStudents();
  const navigate = useNavigate();

  const student = students.find((s) => s.id === studentId);

  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [grade, setGrade] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (student) {
      setName(student.name);
      setRollNumber(student.rollNumber);
      setGrade(student.grade);
    }
  }, [student]);

  if (!student) {
    return (
      <div>
        <h2>Student Not Found</h2>
        <p>No student matches this id.</p>
        <button type="button" onClick={() => navigate("/students")}>
          Back to Students
        </button>
      </div>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateStudent(
      { name, rollNumber, grade },
      students,
      studentId
    );
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    updateStudent({
      id: studentId,
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
    <div>
      <h2>Edit Student</h2>
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
           <div className={styles.buttonRow}>
          <button type="submit">Save Changes</button>
          <button type="button" className={styles.cancelButton} onClick={handleCancel}>
            Cancel
          </button>
        </div>
        
      </form>
    </div>
  );
}

export default EditStudent;
