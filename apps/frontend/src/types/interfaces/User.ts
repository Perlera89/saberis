import { UserRole } from "../enums/UserRole";
import { InstructorProfile } from "./InstructorProfile";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  thunbnail: string;
  passwordHash: string;
  role: UserRole;
  refreshToken?: string;
  createdAt: Date;
  modifiedAt: Date;
  instructorProfile: InstructorProfile[];
}
