import { prisma } from "../../config/prisma";
import { Request, Response, RequestHandler } from "express";
import { JwtPayload } from "jsonwebtoken";

const getStudentProfile: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const user = req.user as JwtPayload;
    const studentId = user.userId;

    if (!studentId) {
      return res
        .status(401)
        .json({ message: "Not authorized, user ID missing from token" });
    }

    const student = await prisma.students.findUnique({
      where: {
        student_id: Number(studentId),
      },
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json(student);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getStudentProfile };
