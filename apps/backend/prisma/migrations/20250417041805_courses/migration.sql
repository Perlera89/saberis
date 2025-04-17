/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Users" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(128) NOT NULL,
    "password_hash" VARCHAR(512) NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'student',
    "refresh_token" TEXT,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstructorProfiles" (
    "id" UUID NOT NULL,
    "names" VARCHAR(100) NOT NULL,
    "surnames" VARCHAR(100) NOT NULL,
    "about_me" TEXT,
    "title" VARCHAR(5),
    "suffix" VARCHAR(5),
    "contact_info" TEXT,
    "social_links" TEXT,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "InstructorProfiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseCategories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "CourseCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseSubcategories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "CourseSubcategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Courses" (
    "uuid" UUID NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "course_code" VARCHAR(25) NOT NULL,
    "description" TEXT NOT NULL,
    "academic_period" VARCHAR(50) NOT NULL,
    "credits" INTEGER NOT NULL,
    "classroom_number" VARCHAR(10) NOT NULL,
    "pre_requisite" TEXT DEFAULT 'Ninguno',
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "CourseSchedules" (
    "uuid" UUID NOT NULL,
    "day" VARCHAR(10) NOT NULL,
    "start_time" TIME NOT NULL,
    "end_time" TIME NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "course_id" UUID NOT NULL,

    CONSTRAINT "CourseSchedules_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "InstructorCourses" (
    "uuid" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "course_id" UUID NOT NULL,
    "instructor_id" UUID NOT NULL,

    CONSTRAINT "InstructorCourses_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "CourseClassifications" (
    "id" SERIAL NOT NULL,
    "course_id" UUID NOT NULL,
    "category_id" INTEGER NOT NULL,
    "subcategory_id" INTEGER NOT NULL,

    CONSTRAINT "CourseClassifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "Users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "InstructorProfiles_id_key" ON "InstructorProfiles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CourseCategories_name_key" ON "CourseCategories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CourseSubcategories_name_key" ON "CourseSubcategories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Courses_uuid_key" ON "Courses"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Courses_course_code_key" ON "Courses"("course_code");

-- CreateIndex
CREATE UNIQUE INDEX "CourseSchedules_uuid_key" ON "CourseSchedules"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "InstructorCourses_uuid_key" ON "InstructorCourses"("uuid");

-- AddForeignKey
ALTER TABLE "InstructorProfiles" ADD CONSTRAINT "InstructorProfiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseSchedules" ADD CONSTRAINT "CourseSchedules_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Courses"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstructorCourses" ADD CONSTRAINT "InstructorCourses_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Courses"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstructorCourses" ADD CONSTRAINT "InstructorCourses_instructor_id_fkey" FOREIGN KEY ("instructor_id") REFERENCES "InstructorProfiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseClassifications" ADD CONSTRAINT "CourseClassifications_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Courses"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseClassifications" ADD CONSTRAINT "CourseClassifications_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "CourseCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseClassifications" ADD CONSTRAINT "CourseClassifications_subcategory_id_fkey" FOREIGN KEY ("subcategory_id") REFERENCES "CourseSubcategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
