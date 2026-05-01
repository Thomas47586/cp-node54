import { prisma } from "../common/prisma/connect.prisma.js";

export const commentService = {
  // GET thông tin bình luận theo id ảnh
  async getCommentsByImage(imageId) {
    return await prisma.binh_luan.findMany({
      where: { hinh_id: Number(imageId) },
      include: {
        nguoi_dung: {
          select: {
            nguoi_dung_id: true,
            ho_ten: true,
            anh_dai_dien: true,
          },
        },
      },
      orderBy: {
        ngay_binh_luan: 'desc'
      }
    });
  },

  // POST để lưu thông tin bình luận của người dùng với hình ảnh
  async addComment(userId, data) {
    const { hinh_id, noi_dung } = data;
    
    // Check if image exists
    const imageExists = await prisma.hinh_anh.findUnique({
      where: { hinh_id: Number(hinh_id) }
    });

    if (!imageExists) {
      throw new Error("Hình ảnh không tồn tại");
    }

    return await prisma.binh_luan.create({
      data: {
        nguoi_dung_id: userId,
        hinh_id: Number(hinh_id),
        noi_dung: noi_dung,
      },
    });
  },
};
