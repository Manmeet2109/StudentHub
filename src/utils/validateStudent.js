// validateStudent.js — pure validation rules for student form data.
// SRP: no React, no storage, no UI. Input in, errors out.
import { GRADES } from "../constants/grades";

export function validateStudent(
  { name, rollNumber, grade },
  existingStudents = [],
  currentStudentId = null
) {
  const errors = {};

  if (!name.trim()) {
    errors.name = "Name is required.";
  }

  if (!rollNumber.trim()) {
    errors.rollNumber = "Roll number is required.";
  } else {
    const isDuplicate = existingStudents.some(
      (student) =>
        student.rollNumber.trim().toLowerCase() === rollNumber.trim().toLowerCase() &&
        student.id !== currentStudentId
    );

    if (isDuplicate) {
      errors.rollNumber = "This roll number is already in use.";
    }
  }

  if (!grade) {
    errors.grade = "Please select a grade.";
  } else if (!GRADES.includes(grade)) {
    errors.grade = "Please select a valid grade.";
  }

  return errors;
}