import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudents } from "../../context/StudentContext";
import { validateStudent } from "../../utils/validateStudent";
import StudentForm from "../../components/student/StudentForm";

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
      <StudentForm
        name={name}
        rollNumber={rollNumber}
        grade={grade}
        errors={errors}
        onNameChange={setName}
        onRollNumberChange={setRollNumber}
        onGradeChange={setGrade}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Add Student"
      />
    </div>
  );
}

export default AddStudent;