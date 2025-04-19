import { AnnouncementType } from "../enums/AnnouncementType";
import { Course } from "./Course";

export interface Announcement {
  id: string;
  title: string;
  description: string;
  type: AnnouncementType;
  createdAt: Date;
  updatedAt: Date;
  courseId: string;
  course: Course;
}
