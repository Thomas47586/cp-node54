# Pinterest Capstone Backend

Đây là dự án Backend API cho ứng dụng quản lý ảnh (giống Pinterest) được xây dựng phục vụ đồ án Capstone.

## 🛠 Công nghệ sử dụng
- **Ngôn ngữ:** JavaScript (ES6+ chuẩn ES Modules)
- **Môi trường chạy:** Node.js
- **Web Framework:** ExpressJS
- **Hệ quản trị CSDL:** MySQL
- **Database ORM:** Prisma v5 (Quản lý schema, auto-generate query)
- **Bảo mật & Xác thực:**
  - `jsonwebtoken`: Tạo và xác thực token JWT
  - `bcrypt`: Mã hóa mật khẩu một chiều an toàn
  - `cors`: Xử lý lỗi cross-origin
- **Tài liệu API:** Swagger UI (`swagger-ui-express`)
- **Công cụ phát triển:** `nodemon` (Tự động restart server)

## 🗄 Database (ERD)
Dự án bao gồm 4 bảng chính:
1. **nguoi_dung:** Thông tin cá nhân của người dùng.
2. **hinh_anh:** Thông tin các bức ảnh do người dùng đăng tải.
3. **binh_luan:** Lưu trữ các bình luận của người dùng trên từng bức ảnh.
4. **luu_anh:** Bảng trung gian (Many-to-Many) lưu trữ việc người dùng "Save" (lưu) một bức ảnh.

*Lưu ý: Mọi bảng đều có 5 cột audit tiêu chuẩn (`deletedBY`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAT`).*


