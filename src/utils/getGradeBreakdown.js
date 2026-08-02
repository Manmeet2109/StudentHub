// getGradeBreakdown.js — pure computation: student list in, grade counts out.
// SRP: no React, no storage, no UI.
// Always returns all known grades, in a fixed display order, even at zero.

const GRADE_ORDER = ["9th", "10th", "11th", "12th"];

export function getGradeBreakdown(students) {
  const counts = GRADE_ORDER.reduce((result, grade) => {
    result[grade] = 0;
    return result;
  }, {});

  students.forEach((student) => {
    if (Object.hasOwn(counts, student.grade)) {
      counts[student.grade] += 1;
    }
  });

  return GRADE_ORDER.map((grade) => ({ grade, count: counts[grade] ?? 0 }));
}