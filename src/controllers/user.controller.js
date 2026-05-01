import { userService } from "../services/user.services.js";

export const userController = {
  async getProfile(req, res, next) {
    try {
      const result = await userService.getProfile(req.user.nguoi_dung_id);
      res.status(200).json({ message: "Lấy thông tin cá nhân thành công", data: result });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async updateProfile(req, res, next) {
    try {
      const result = await userService.updateProfile(req.user.nguoi_dung_id, req.body);
      res.status(200).json({ message: "Cập nhật thông tin thành công", data: result });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async getSavedImages(req, res, next) {
    try {
      const result = await userService.getSavedImages(req.user.nguoi_dung_id);
      res.status(200).json({ message: "Lấy ảnh đã lưu thành công", data: result });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async getCreatedImages(req, res, next) {
    try {
      const result = await userService.getCreatedImages(req.user.nguoi_dung_id);
      res.status(200).json({ message: "Lấy ảnh đã tạo thành công", data: result });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async checkSavedImage(req, res, next) {
    try {
      const { imageId } = req.params;
      const result = await userService.checkSavedImage(req.user.nguoi_dung_id, imageId);
      res.status(200).json({ message: "Kiểm tra trạng thái lưu ảnh", data: result });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async saveImage(req, res, next) {
    try {
      const { imageId } = req.params;
      const result = await userService.saveImage(req.user.nguoi_dung_id, imageId);
      res.status(200).json({ message: result.message, data: { saved: result.saved } });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
