# Install

`npm install`

Sau đó vào packages.json và xem các script
* `npm run start`: Chạy NodeJS app bình thường
* `npm run start:dev`: Chạy project NodeJS app dưới dạng develop, khi thay đổi thì ứng dụng tự refresh sử dụng package **nodemon**

# Workflow
Bắt đầu từ `routes/api.js` trước, gọi controller và hàm tương ứng, kết nối với cơ sở dữ liệu sử dụng Sequelize

Với api response đã được format thông qua `response.ok()`: Xem chi tiết ở `modules/auth/controllers/authController.js` hàm `helloWorld()`