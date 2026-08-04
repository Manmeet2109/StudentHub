// sortStudents.js — pure computation: student list + sort key in, sorted list out.
// SRP: no React, no storage, no UI. Never mutates the input array.

export function sortStudents(students, sortBy) {
  const sorted = [...students];

  switch (sortBy) {
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "rollNumber-asc":
      return sorted.sort((a, b) => a.rollNumber.localeCompare(b.rollNumber));
    case "grade-asc":
      return sorted.sort((a, b) => a.grade.localeCompare(b.grade));
    default:
      return sorted;
  }
}