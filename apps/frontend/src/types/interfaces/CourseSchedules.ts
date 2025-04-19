import { Course } from "./Course";

export interface CourseSchedules {
  id: string;
  day: string;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  updatedAt: Date;
  courseId: string;
  course: Course;
}
