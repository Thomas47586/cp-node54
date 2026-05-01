import jwt from "jsonwebtoken";
import { prisma } from "../prisma/connect.prisma.js";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "pinterest_capstone_secret_key";

export const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Vui lòng đăng nhập" });
    }

    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    
    const user = await prisma.nguoi_dung.findUnique({
      where: { nguoi_dung_id: decoded.nguoi_dung_id },
      select: { nguoi_dung_id: true, email: true, ho_ten: true, tuoi: true, anh_dai_dien: true }
    });

    if (!user) {
      return res.status(401).json({ message: "Người dùng không tồn tại" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
  }
};
