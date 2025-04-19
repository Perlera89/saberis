import { Announcement } from "./Announcement";
import { CourseClassification } from "./CourseClassification";
import { CourseSchedules } from "./CourseSchedules";
import { CourseSection } from "./CourseSection";
import { InstructorCourses } from "./InstructorCourses";

export interface Course {
  id: string;
  title: string;
  courseCode: string;
  description: string;
  academicPeriod: string;
  credits: number;
  classroomNumber: string;
  preRequisite?: string;
  createdAt: Date;
  updateAt: Date;
  classification: CourseClassification[];
  instructorCoursesProfile: InstructorCourses[];
  CourseSchedules: CourseSchedules[];
  courseSection: CourseSection[];
  announcements: Announcement[];
}
