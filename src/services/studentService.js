// studentService.js — reads/writes student data.
// Today: Local Storage, wrapped as async. Later: these functions become
// real fetch() calls — their signatures (async, returning a Promise)
// already match what a real API client would look like.
// SRP: pure data operations only. No React, no UI, no business rules.

const STORAGE_KEY = "studenthub_students";

const initialStudents = [
  { id: 1, name: "Aditi Sharma", rollNumber: "S101", grade: "10th" },
  { id: 2, name: "Rohan Mehta", rollNumber: "S102", grade: "9th" },
  { id: 3, name: "Priya Nair", rollNumber: "S103", grade: "10th" },
];

export async function getStudents() {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialStudents));
    return initialStudents;
  }

  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error("Corrupted student data in Local Storage. Resetting.", error);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialStudents));
    return initialStudents;
  }
}

export async function saveStudents(students) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  return students;
}