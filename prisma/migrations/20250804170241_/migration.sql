/*
  Warnings:

  - You are about to drop the column `coursesCourse_Id` on the `Students` table. All the data in the column will be lost.
  - Added the required column `studentID` to the `Courses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Students" DROP CONSTRAINT "Students_coursesCourse_Id_fkey";

-- AlterTable
ALTER TABLE "public"."Courses" ADD COLUMN     "studentID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Students" DROP COLUMN "coursesCourse_Id";

-- AddForeignKey
ALTER TABLE "public"."Courses" ADD CONSTRAINT "Courses_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "public"."Students"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;
