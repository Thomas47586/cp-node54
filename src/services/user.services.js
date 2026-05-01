import { prisma } from "../common/prisma/connect.prisma.js";

export const userService = {
  // GET thông tin user
  async getProfile(userId) {
    const user = await prisma.nguoi_dung.findUnique({
      where: { nguoi_dung_id: userId },
      select: {
        nguoi_dung_id: true,
        email: true,
        ho_ten: true,
        tuoi: true,
        anh_dai_dien: true,
      },
    });
    return user;
  },

  // PUT thông tin cá nhân của user
  async updateProfile(userId, data) {
    const { ho_ten, tuoi, anh_dai_dien } = data;
    return await prisma.nguoi_dung.update({
      where: { nguoi_dung_id: userId },
      data: {
        ho_ten,
        tuoi: tuoi ? Number(tuoi) : undefined,
        anh_dai_dien,
      },
      select: {
        nguoi_dung_id: true,
        email: true,
        ho_ten: true,
        tuoi: true,
        anh_dai_dien: true,
      },
    });
  },

  // GET danh sách ảnh đã lưu theo user id
  async getSavedImages(userId) {
    const saved = await prisma.luu_anh.findMany({
      where: { nguoi_dung_id: userId },
      include: {
        hinh_anh: true,
      },
    });
    // Extract hình ảnh from luu_anh
    return saved.map((item) => item.hinh_anh);
  },

  // GET danh sách ảnh đã tạo theo user id
  async getCreatedImages(userId) {
    return await prisma.hinh_anh.findMany({
      where: { nguoi_dung_id: userId },
    });
  },

  // GET thông tin đã lưu hình này chưa theo id ảnh
  async checkSavedImage(userId, imageId) {
    const isSaved = await prisma.luu_anh.findUnique({
      where: {
        nguoi_dung_id_hinh_id: {
          nguoi_dung_id: userId,
          hinh_id: Number(imageId),
        },
      },
    });
    return { isSaved: !!isSaved };
  },

  // POST (Toggle) để lưu / bỏ lưu thông tin hình ảnh
  async saveImage(userId, imageId) {
    // Check if image exists
    const imageExists = await prisma.hinh_anh.findUnique({
      where: { hinh_id: Number(imageId) },
    });

    if (!imageExists) {
      throw new Error("Hình ảnh không tồn tại");
    }

    const isSaved = await prisma.luu_anh.findUnique({
      where: {
        nguoi_dung_id_hinh_id: {
          nguoi_dung_id: userId,
          hinh_id: Number(imageId),
        },
      },
    });

    if (isSaved) {
      // Bỏ lưu (un-save)
      await prisma.luu_anh.delete({
        where: {
          nguoi_dung_id_hinh_id: {
            nguoi_dung_id: userId,
            hinh_id: Number(imageId),
          },
        },
      });
      return { saved: false, message: "Đã bỏ lưu ảnh" };
    } else {
      // Lưu
      await prisma.luu_anh.create({
        data: {
          nguoi_dung_id: userId,
          hinh_id: Number(imageId),
        },
      });
      return { saved: true, message: "Đã lưu ảnh thành công" };
    }
  },
};
