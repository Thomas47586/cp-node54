import { prisma } from "../common/prisma/connect.prisma.js";

export const imageService = {
  // GET danh sách ảnh
  async getAllImages() {
    return await prisma.hinh_anh.findMany();
  },

  // GET tìm kiếm danh sách ảnh theo tên
  async searchImagesByName(name) {
    return await prisma.hinh_anh.findMany({
      where: {
        ten_hinh: {
          contains: name,
        },
      },
    });
  },

  // GET thông tin ảnh và người tạo ảnh bằng id ảnh
  async getImageDetail(id) {
    const image = await prisma.hinh_anh.findUnique({
      where: { hinh_id: Number(id) },
      include: {
        nguoi_dung: {
          select: {
            nguoi_dung_id: true,
            ho_ten: true,
            email: true,
            anh_dai_dien: true,
          },
        },
      },
    });
    if (!image) throw new Error("Không tìm thấy hình ảnh");
    return image;
  },

  // POST thêm một ảnh của user
  async addImage(userId, data) {
    const { ten_hinh, duong_dan, mo_ta } = data;
    return await prisma.hinh_anh.create({
      data: {
        ten_hinh,
        duong_dan,
        mo_ta,
        nguoi_dung_id: userId,
      },
    });
  },

  // DELETE xóa ảnh đã tạo theo id ảnh
  async deleteImage(userId, imageId) {
    const image = await prisma.hinh_anh.findUnique({
      where: { hinh_id: Number(imageId) },
    });

    if (!image) throw new Error("Không tìm thấy hình ảnh");
    if (image.nguoi_dung_id !== userId) {
      throw new Error("Bạn không có quyền xóa ảnh này");
    }

    return await prisma.hinh_anh.delete({
      where: { hinh_id: Number(imageId) },
    });
  },
};
