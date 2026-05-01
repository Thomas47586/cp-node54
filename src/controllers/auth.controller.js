import { authService } from "../services/auth.services.js";

export const authController = {
  async register(req, res, next) {
    try {
      const result = await authService.register(req);
      res.status(201).json({ message: "Đăng ký thành công", data: result });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  },

  async login(req, res, next) {
    try {
      const result = await authService.login(req);
      res.status(200).json({ message: "Đăng nhập thành công", data: result });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  },
};
