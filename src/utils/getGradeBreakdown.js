// getGradeBreakdown.js — pure computation: student list in, grade counts out.
// SRP: no React, no storage, no UI.
// Always returns all known grades, in a fixed display order, even at zero.
import { GRADES } from "../constants/grades";

export function getGradeBreakdown(students) {
  const counts = GRADES.reduce((result, grade) => {
    result[grade] = 0;
    return result;
  }, {});

  students.forEach((student) => {
    if (Object.hasOwn(counts, student.grade)) {
      counts[student.grade] += 1;
    }
  });

  return GRADES.map((grade) => ({ grade, count: counts[grade] ?? 0 }));
}