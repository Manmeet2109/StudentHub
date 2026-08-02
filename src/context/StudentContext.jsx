// StudentContext.jsx — shares student data + operations across the app
import { createContext, useContext, useState, useEffect } from 'react'
import { getStudents, saveStudents } from '../services/studentService'

const StudentContext = createContext(null)

export function StudentProvider({ children }) {
  const [students, setStudents] = useState([])

  // Load once when the app first mounts
  useEffect(() => {
    setStudents(getStudents())
  }, [])

  // Persist to Local Storage any time the list changes
  useEffect(() => {
    saveStudents(students)
  }, [students])

  function addStudent(newStudent) {
    setStudents((prev) => [...prev, newStudent])
  }

  function updateStudent(updatedStudent) {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    )
  }

  function deleteStudent(id) {
    setStudents((prev) => prev.filter((student) => student.id !== id))
  }

  const value = { students, addStudent, updateStudent, deleteStudent }

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  )
}

// Custom hook — components call useStudents() instead of useContext(StudentContext)
// directly, so they never need to import StudentContext itself.
export function useStudents() {
  const context = useContext(StudentContext)

  if (!context) {
    throw new Error('useStudents must be used within a StudentProvider')
  }

  return context
}