export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Pinterest Capstone API",
    version: "1.0.0",
    description: "API Documentation for Pinterest Capstone Backend",
  },
  servers: [
    {
      url: "/",
      description: "Current Server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  paths: {
    "/api/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Đăng ký tài khoản",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", example: "test@gmail.com" },
                  mat_khau: { type: "string", example: "123456" },
                  ho_ten: { type: "string", example: "Nguyễn Văn A" },
                  tuoi: { type: "integer", example: 25 },
                },
              },
            },
          },
        },
        responses: { 201: { description: "Đăng ký thành công" } },
      },
    },
    "/api/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Đăng nhập",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", example: "test@gmail.com" },
                  mat_khau: { type: "string", example: "123456" },
                },
              },
            },
          },
        },
        responses: { 200: { description: "Đăng nhập thành công" } },
      },
    },
    "/api/images": {
      get: {
        tags: ["Images"],
        summary: "Lấy danh sách ảnh",
        security: [],
        responses: { 200: { description: "Thành công" } },
      },
      post: {
        tags: ["Images"],
        summary: "Thêm ảnh mới",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  ten_hinh: { type: "string", example: "Ảnh phong cảnh" },
                  duong_dan: { type: "string", example: "https://example.com/image.jpg" },
                  mo_ta: { type: "string", example: "Ảnh chụp tại Đà Lạt" },
                },
              },
            },
          },
        },
        responses: { 201: { description: "Thêm ảnh thành công" } },
      },
    },
    "/api/images/search": {
      get: {
        tags: ["Images"],
        summary: "Tìm kiếm ảnh theo tên",
        security: [],
        parameters: [
          {
            name: "name",
            in: "query",
            schema: { type: "string" },
            description: "Tên hình ảnh cần tìm",
          },
        ],
        responses: { 200: { description: "Thành công" } },
      },
    },
    "/api/images/{id}": {
      get: {
        tags: ["Images"],
        summary: "Lấy chi tiết ảnh",
        security: [],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: { 200: { description: "Thành công" } },
      },
      delete: {
        tags: ["Images"],
        summary: "Xóa ảnh đã tạo",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: { 200: { description: "Xóa thành công" } },
      },
    },
    "/api/comments/{imageId}": {
      get: {
        tags: ["Comments"],
        summary: "Lấy bình luận theo id ảnh",
        security: [],
        parameters: [
          {
            name: "imageId",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: { 200: { description: "Thành công" } },
      },
    },
    "/api/comments": {
      post: {
        tags: ["Comments"],
        summary: "Bình luận về ảnh",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  hinh_id: { type: "integer", example: 1 },
                  noi_dung: { type: "string", example: "Ảnh đẹp quá!" },
                },
              },
            },
          },
        },
        responses: { 201: { description: "Bình luận thành công" } },
      },
    },
    "/api/users/profile": {
      get: {
        tags: ["Users"],
        summary: "Lấy thông tin cá nhân",
        responses: { 200: { description: "Thành công" } },
      },
      put: {
        tags: ["Users"],
        summary: "Cập nhật thông tin cá nhân",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  ho_ten: { type: "string", example: "Nguyễn Văn B" },
                  tuoi: { type: "integer", example: 26 },
                  anh_dai_dien: { type: "string", example: "https://avatar.com/me.jpg" },
                },
              },
            },
          },
        },
        responses: { 200: { description: "Cập nhật thành công" } },
      },
    },
    "/api/users/saved-images": {
      get: {
        tags: ["Users"],
        summary: "Danh sách ảnh đã lưu",
        responses: { 200: { description: "Thành công" } },
      },
    },
    "/api/users/created-images": {
      get: {
        tags: ["Users"],
        summary: "Danh sách ảnh đã tạo",
        responses: { 200: { description: "Thành công" } },
      },
    },
    "/api/users/check-save/{imageId}": {
      get: {
        tags: ["Users"],
        summary: "Kiểm tra ảnh đã lưu chưa",
        parameters: [
          {
            name: "imageId",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: { 200: { description: "Thành công" } },
      },
    },
    "/api/users/save-image/{imageId}": {
      post: {
        tags: ["Users"],
        summary: "Lưu / Bỏ lưu ảnh",
        parameters: [
          {
            name: "imageId",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: { 200: { description: "Thành công" } },
      },
    },
  },
};
