# Install

`npm install`

Sau đó vào packages.json và xem các script
* `npm run start`: Chạy NodeJS app bình thường
* `npm run start:dev`: Chạy project NodeJS app dưới dạng develop, khi thay đổi thì ứng dụng tự refresh sử dụng package **nodemon**

# Workflow
Bắt đầu từ `routes/api.js` trước, gọi controller và hàm tương ứng, kết nối với cơ sở dữ liệu sử dụng Sequelize

Với api response đã được format thông qua `response.ok()`: Xem chi tiết ở `modules/auth/controllers/authController.js` hàm `helloWorld()`

Đối với api response not found sẽ được format thông qua `response.notFound(res)`

Chi tiết về response được viết trong `services/response.js`

# Packages
* Express-validator: Dùng để validate request (required, min-length, ...)
* Multer: Thực hiện file upload
* Body-parser: Xử lí form body
* Jwt: tạo token jwt cho đăng nhập

# Naming convention
* Đối với thư mục `modules/controllers/XXX`, cần đặt tên file theo quy tắc `xXXController.js`, ví dụ: `categoryController.js`
* Đối với thư mục `models`, các file bên trong đặt tên cần đặt số ít. Ví dụ: `user.js`, `category.js`
* Đối với thư mục `middlewares`, các file bên trong cần đặt tên file theo quy tắc `xXXMiddleware.js`, ví dụ: `demoMiddleware.js`