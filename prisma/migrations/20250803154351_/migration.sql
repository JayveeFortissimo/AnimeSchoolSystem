/*
  Warnings:

  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Users";

-- CreateTable
CREATE TABLE "public"."Students" (
    "student_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "contact" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "coursesCourse_Id" INTEGER,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "public"."Courses" (
    "course_Id" SERIAL NOT NULL,
    "courseName" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "schedule" TEXT NOT NULL,
    "teacher" TEXT NOT NULL,
    "units" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("course_Id")
);

-- CreateTable
CREATE TABLE "public"."Attendance" (
    "attendance_Id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "courseID" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("attendance_Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Students_student_id_key" ON "public"."Students"("student_id");

-- CreateIndex
CREATE UNIQUE INDEX "Students_email_key" ON "public"."Students"("email");

-- AddForeignKey
ALTER TABLE "public"."Students" ADD CONSTRAINT "Students_coursesCourse_Id_fkey" FOREIGN KEY ("coursesCourse_Id") REFERENCES "public"."Courses"("course_Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Attendance" ADD CONSTRAINT "Attendance_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Students"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Attendance" ADD CONSTRAINT "Attendance_courseID_fkey" FOREIGN KEY ("courseID") REFERENCES "public"."Courses"("course_Id") ON DELETE RESTRICT ON UPDATE CASCADE;
