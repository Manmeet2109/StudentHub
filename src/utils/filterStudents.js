// filterStudents.js — pure computation: student list + filters in, matching list out.
// SRP: no React, no storage, no UI.

export function filterStudents(students, { searchText = "", gradeFilter = "" } = {}) {
  const normalizedSearch = searchText.trim().toLowerCase();

  return students.filter((student) => {
    const matchesGrade = !gradeFilter || student.grade === gradeFilter;

    const matchesSearch =
      !normalizedSearch ||
      student.name.toLowerCase().includes(normalizedSearch) ||
      student.rollNumber.toLowerCase().includes(normalizedSearch);

    return matchesGrade && matchesSearch;
  });
}