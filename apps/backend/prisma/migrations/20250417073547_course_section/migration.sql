-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('Documento', 'Video', 'Tarea', 'Imagen', 'Cuestionario', 'Enlace', 'Otro');

-- CreateEnum
CREATE TYPE "AnnouncementType" AS ENUM ('Normal', 'Importante', 'Urgente');

-- CreateTable
CREATE TABLE "CourseSections" (
    "uuid" UUID NOT NULL,
    "week_number" INTEGER,
    "title" VARCHAR(200),
    "description" TEXT NOT NULL,
    "date_range" VARCHAR(50),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "course_id" UUID NOT NULL,

    CONSTRAINT "CourseSections_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "SectionContents" (
    "uuid" UUID NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "description" TEXT NOT NULL,
    "type" "ResourceType" NOT NULL DEFAULT 'Documento',
    "url" VARCHAR(255),
    "limit_date" TIMESTAMP,
    "time_limit" TIME,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "section_id" UUID NOT NULL,

    CONSTRAINT "SectionContents_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Announcements" (
    "uuid" UUID NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "description" TEXT NOT NULL,
    "type" "AnnouncementType" NOT NULL DEFAULT 'Normal',
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "course_id" UUID NOT NULL,

    CONSTRAINT "Announcements_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "CourseSections_uuid_key" ON "CourseSections"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "SectionContents_uuid_key" ON "SectionContents"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Announcements_uuid_key" ON "Announcements"("uuid");

-- AddForeignKey
ALTER TABLE "CourseSections" ADD CONSTRAINT "CourseSections_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Courses"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionContents" ADD CONSTRAINT "SectionContents_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "CourseSections"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcements" ADD CONSTRAINT "Announcements_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Courses"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
