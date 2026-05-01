import { commentService } from "../services/comment.services.js";

export const commentController = {
  async getCommentsByImage(req, res, next) {
    try {
      const { imageId } = req.params;
      const result = await commentService.getCommentsByImage(imageId);
      res.status(200).json({ message: "Lấy bình luận thành công", data: result });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async addComment(req, res, next) {
    try {
      const result = await commentService.addComment(req.user.nguoi_dung_id, req.body);
      res.status(201).json({ message: "Bình luận thành công", data: result });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
