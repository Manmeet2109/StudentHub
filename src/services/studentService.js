// studentService.js — reads/writes student data.
// Today: Local Storage. Later: this file's internals become fetch() calls
// to a real API — nothing outside this file needs to change when that happens.

const STORAGE_KEY = 'studenthub_students'

// Seed data used only the very first time the app runs (empty Local Storage)
const initialStudents = [
  { id: 1, name: 'Aditi Sharma', rollNumber: 'S101', grade: '10th' },
  { id: 2, name: 'Rohan Mehta', rollNumber: 'S102', grade: '9th' },
  { id: 3, name: 'Priya Nair', rollNumber: 'S103', grade: '10th' },
]

export function getStudents() {
  const stored = localStorage.getItem(STORAGE_KEY)

  if (!stored) {
    // First run: seed Local Storage so future reads are consistent
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialStudents))
    return initialStudents
  }

  return JSON.parse(stored)
}

export function saveStudents(students) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students))
}