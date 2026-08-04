// StudentContext.jsx — shares student data + operations across the app
// SRP: manages React state and calls the service layer. Never touches
// Local Storage directly — that responsibility belongs to studentService.
import { createContext, useContext, useState, useEffect } from "react";
import { getStudents, saveStudents } from "../services/studentService";

const StudentContext = createContext(null);

export function StudentProvider({ children }) {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load once on mount. getStudents() is async now, so this can no
  // longer be a lazy useState initializer — it must be an effect.
  useEffect(() => {
    let isMounted = true;

    getStudents()
      .then((data) => {
        if (isMounted) {
          setStudents(data);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError("Failed to load students.");
          console.error(err);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Persist on every change — guarded by isLoading so this never fires
  // with the initial empty array before the load effect completes.
  useEffect(() => {
    if (isLoading) {
      return;
    }

    saveStudents(students).catch((err) => {
      setError("Failed to save students.");
      console.error(err);
    });
  }, [students, isLoading]);

  function addStudent(newStudent) {
    setStudents((prev) => [...prev, newStudent]);
  }

  function updateStudent(updatedStudent) {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
  }

  function deleteStudent(id) {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  }

  const value = {
    students,
    isLoading,
    error,
    addStudent,
    updateStudent,
    deleteStudent,
  };

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
}

export function useStudents() {
  const context = useContext(StudentContext);

  if (!context) {
    throw new Error("useStudents must be used within a StudentProvider");
  }

  return context;
}