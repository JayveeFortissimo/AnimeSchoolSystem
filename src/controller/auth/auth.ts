import { Request, Response, RequestHandler } from "express";
import { prisma } from "../../config/prisma";
import { UserAuthentication } from "../../interface/usersauth.interface";
import bcrypt from "bcrypt";
import createtokens from "../../utils/tokens";

export const register: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { username, email, age, password, contact, image } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const userExist = await prisma.students.findUnique({
      where: {
        email,
      },
    });

    if (userExist) {
      res.json({ message: "Email is already Exist!" });
      return;
    }

    const addUser: UserAuthentication = await prisma.students.create({
      data: {
        username,
        email,
        age,
        password: hashedPassword,
        contact,
        image,
      },
    });

    res.status(201).json({ message: "User Created!", addUser });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An unexpected error occurred during registration." });
  }
};

export const login: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const userunique = await prisma.students.findUnique({
      where: {
        email,
      },
    });

    const passwordCompared = await bcrypt.compare(
      password,
      userunique?.password as string
    );

    if (!passwordCompared) {
      res.json({ message: "Wrong Password" });
      return;
    } else if (
      userunique?.email !== email ||
      userunique?.username !== username
    ) {
      res.json({ message: "Invalid email account or username account" });
      return;
    }

    const { accessToken, refreshToken } = createtokens(
      userunique?.student_id as number
    );

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "strict",
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
      })
      .json({ message: "Logged in", userunique, accessToken, refreshToken });
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ message: "An unexpected error occurred during registration." });
  }
};

export const logout: RequestHandler = async (req: Request, res: Response) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ message: "Logout!" });
};
