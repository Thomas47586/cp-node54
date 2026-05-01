# Project Context

**Tên dự án:** Pinterest Capstone Backend
**Trạng thái:** Vừa hoàn thành khung base (Quick Dev phase)

## Mục tiêu
Tạo ra hệ thống RESTful API cho ứng dụng chia sẻ và lưu trữ hình ảnh (Image Gallery / Pinterest Clone) đáp ứng các chức năng cốt lõi.

## Các quyết định kiến trúc (Architecture Decisions)
1. **Cấu trúc thư mục:** Chuẩn Express Controller-Service-Router.
2. **Prisma:** Sử dụng Prisma v5 thay vì v7 để tối giản hóa việc kết nối Database (không cần setup Database Adapters).
3. **Soft Delete:** Tích hợp `bmad-prisma-audit-columns` vào toàn bộ model trong `schema.prisma`.
4. **Bảo mật:** Middleware `protect` bắt buộc đính kèm JWT (Bearer Token) cho các API thao tác dữ liệu cá nhân (Thêm ảnh, Bình luận, Chỉnh sửa user).
5. **Testing:** Cấu hình sẵn Swagger UI ở route `/api-docs` để test trực quan không cần Postman.
