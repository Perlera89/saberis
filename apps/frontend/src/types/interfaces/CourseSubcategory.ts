import { CourseClassification } from "./CourseClassification";

export interface CourseSubcategory {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  classifications: CourseClassification[];
}
