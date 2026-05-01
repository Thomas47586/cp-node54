import { prisma } from "../common/prisma/connect.prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "pinterest_secret_12345";

export const authService = {
  async register(req) {
    const { email, mat_khau, ho_ten, tuoi } = req.body;

    // Check existing
    const userExists = await prisma.nguoi_dung.findUnique({
      where: { email: email },
    });

    if (userExists) {
      throw new Error("Email đã tồn tại");
    }

    const passwordHash = bcrypt.hashSync(mat_khau, 10);

    const newUser = await prisma.nguoi_dung.create({
      data: {
        email: email,
        mat_khau: passwordHash,
        ho_ten: ho_ten,
        tuoi: Number(tuoi),
      },
    });

    return {
      nguoi_dung_id: newUser.nguoi_dung_id,
      email: newUser.email,
      ho_ten: newUser.ho_ten,
    };
  },

  async login(req) {
    const { email, mat_khau } = req.body;

    const userExists = await prisma.nguoi_dung.findUnique({
      where: { email: email },
    });

    if (!userExists) {
      throw new Error("Email chưa được đăng ký");
    }

    const isPasswordValid = bcrypt.compareSync(mat_khau, userExists.mat_khau);

    if (!isPasswordValid) {
      throw new Error("Mật khẩu không đúng");
    }

    const token = jwt.sign({ nguoi_dung_id: userExists.nguoi_dung_id }, ACCESS_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    return {
      token: token,
      user: {
        nguoi_dung_id: userExists.nguoi_dung_id,
        email: userExists.email,
        ho_ten: userExists.ho_ten,
      },
    };
  },
};
