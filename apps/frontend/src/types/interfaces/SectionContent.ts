import { ResourceType } from "../enums/ResourceType";
import { CourseSection } from "./CourseSection";

export interface SectionContent {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  url?: string;
  limitDate?: Date;
  timeLimit?: Date;
  createdAt: Date;
  updatedAt: Date;
  sectionId: string;
  section: CourseSection;
}
