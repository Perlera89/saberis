import { InstructorCourses } from "./InstructorCourses";
import { User } from "./User";

export interface InstructorProfile {
  id: string;
  names: string;
  surnames: string;
  aboutMe?: string;
  title?: string;
  suffix?: string;
  contactInfo?: string;
  socialLinks?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: User;
  instructorCoursesProfile: InstructorCourses[];
}
