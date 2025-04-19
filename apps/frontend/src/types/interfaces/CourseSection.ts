import { Course } from "./Course";
import { SectionContent } from "./SectionContent";

export interface CourseSection {
  id: string;
  weekNumber?: number;
  title?: string;
  description: string;
  dateRange?: string;
  createdAt: Date;
  updatedAt: Date;
  courseId: string;
  course: Course;
  sectionContent: SectionContent[];
}
