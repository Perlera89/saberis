import { Course } from "./Course";
import { CourseCategory } from "./CourseCategory";
import { CourseSubcategory } from "./CourseSubcategory";

export interface CourseClassification {
  id: string;
  courseId: string;
  course: Course;
  categoryId: number;
  category: CourseCategory;
  subcategoryId: number;
  subcategory: CourseSubcategory;
}
