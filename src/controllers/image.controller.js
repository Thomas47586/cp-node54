import { imageService } from "../services/image.services.js";

export const imageController = {
  async getAllImages(req, res, next) {
    try {
      const result = await imageService.getAllImages();
      res.status(200).json({ message: "Lấy danh sách ảnh thành công", data: result });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async searchImagesByName(req, res, next) {
    try {
      const { name } = req.query;
      const result = await imageService.searchImagesByName(name || "");
      res.status(200).json({ message: "Tìm kiếm ảnh thành công", data: result });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async getImageDetail(req, res, next) {
    try {
      const { id } = req.params;
      const result = await imageService.getImageDetail(id);
      res.status(200).json({ message: "Lấy chi tiết ảnh thành công", data: result });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async addImage(req, res, next) {
    try {
      const result = await imageService.addImage(req.user.nguoi_dung_id, req.body);
      res.status(201).json({ message: "Thêm ảnh thành công", data: result });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async deleteImage(req, res, next) {
    try {
      const { id } = req.params;
      await imageService.deleteImage(req.user.nguoi_dung_id, id);
      res.status(200).json({ message: "Xóa ảnh thành công" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
