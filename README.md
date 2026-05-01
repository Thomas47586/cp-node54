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

## 🚀 Hướng dẫn khởi chạy

1. Cài đặt thư viện:
   ```bash
   npm install
   ```

2. Cấu hình biến môi trường:
   Mở file `.env` và cập nhật chuỗi kết nối `DATABASE_URL` tới database MySQL của bạn:
   ```env
   DATABASE_URL="mysql://<user>:<password>@<host>:<port>/<dbname>"
   ```

3. Đồng bộ Database & Generate Prisma:
   ```bash
   npx prisma db push
   npx prisma generate
   ```

4. Chạy Server:
   ```bash
   npm run dev
   ```

5. **Test API:**
   Mở trình duyệt và truy cập: `http://localhost:3069` (sẽ tự động redirect tới `/api-docs`).

## 📋 Danh sách API chính
- **Auth:** `POST /api/auth/register`, `POST /api/auth/login`
- **Images:** Lấy danh sách, tìm kiếm, lấy chi tiết, xóa, thêm ảnh.
- **Comments:** Bình luận vào ảnh, lấy bình luận.
- **Users:** Xem/cập nhật thông tin, lấy danh sách ảnh đã tạo/đã lưu, thao tác lưu ảnh.
