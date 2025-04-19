import { CourseClassification } from "./CourseClassification";

export interface CourseCategory {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  classifications: CourseClassification[];
}
