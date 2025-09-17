const envDeadline = process.env.SUBMISSION_DEADLINE;
export const SUBMISSION_DEADLINE: Date = new Date(
  envDeadline || "2025-10-01T23:59:59+03:30"
);
