/*
  Warnings:

  - The primary key for the `CourseClassifications` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `CourseClassifications` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uuid]` on the table `CourseClassifications` will be added. If there are existing duplicate values, this will fail.
  - The required column `uuid` was added to the `CourseClassifications` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "CourseClassifications" DROP CONSTRAINT "CourseClassifications_pkey",
DROP COLUMN "id",
ADD COLUMN     "uuid" UUID NOT NULL,
ADD CONSTRAINT "CourseClassifications_pkey" PRIMARY KEY ("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "CourseClassifications_uuid_key" ON "CourseClassifications"("uuid");
