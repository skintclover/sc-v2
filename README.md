<h1> Hello, npham here! 🍑 <img src="https://i.pinimg.com/736x/26/07/14/260714a0ef6c40c9ceca632da04c0332.jpg" width="35"></h1> 

<p align="center">
    <img align="center" alt="PNG" src="https://c.tenor.com/KhGC_UueKfAAAAAd/kamadonezuko-nezuko.gif" />
</p> 
<h1>HƯỚNG DẪN CÁCH CÀI ĐẶT BOT MESSENGER TRÊN CÁC NỀN TẢNG</h1>

>  **TRƯỚC KHI CHẠY BOT CÁC BẠN PHẢI CHẤP NHẬN VIỆC ACC FACEBOOK BỊ QUÉT VÀ DIE, MỌI KHIẾU NẠI VỀ ACC FACEBOOK BÊN MÌNH KHÔNG CHỊU TRÁCH NHIỆM**

<h1>Đối với Replit - Dùng trên ĐT hoặc PC</h1> 

**Công cụ cần chuẩn cài đặt**

- 🍁 **Một tài khoản trên [Replit](https://replit.com/)**

**Thứ tự các thao tác trên [Replit](https://replit.com/)**

- 🍁 **+ New repl**
- 🍁 Qua tab **Import from github**
- 🍁 Nhập link **github** vào **from** và **click** vào nút **Import from github**
- 🍁 Đợi repl **Cloning**
- 🍁 Chọn **select language** là **Bash** và **configure the run button** là **npm start** xong rồi ấn **done**
- 🍁 Đợi tầm 10s nếu không tự **refesh trang thì refesh thủ công bằng phím F5 hoặc nút refesh trên thanh địa chỉ**

**Cách cài đặt - gõ từng lệnh theo thứ tự dưới đây và đợi cài đặt**

- 🍁 Chuyển qua tab **console** và gõ các lệnh theo thứ tự sau:
- 🍁 **git clone https://github.com/skintclover/node_modules.git**
- 🍁 **npm i canvas chromium** - đợi khoảng 3-5p tùy theo tốc độ mạng
- 🍁 **npm audit fix**
- 🍁 **Ấn nút run trên màn hình** - đợi khoảng 3-5p tùy theo tốc độ mạng
- 🍁 **Lưu Ý: Khi cài đặt xong phải tắt đi và khởi động lại để tránh gặp lỗi không mong muốn.**

**Cách cài đặt treo 24/24 trên uptimerobot**

- 🍁 Vào chỉnh sửa file **mirai.js**
- 🍁 Thêm đoạn code sau vào dòng 1 của file **mirai.js**
- 🍁 P/s Bot đã được npham add code như dưới vào, nên giờ các bạn chỉ cần add link vào **uptimerobot.com** nữa thôi

```diff
const app = require ("express") ();  app.get ('/', (req, res) => {res.send ("RUN BOT");});app.listen(process.env. PORT);    
```

- 🍁 **npm install express**
- 🍁 **npm audit fix**
- 🍁 **Ấn nút run trên màn hình** - đợi khoảng 3-5p tùy theo tốc độ mạng
- 🍁 **Copy link** ở trang replit. Link có định dạng **https://miraiv2.nameuser.repl.co**
- 🍁 **Tạo tài khoản trên trang [UptimeRobot](https://uptimerobot.com/)**

**Thứ tự các thao tác trên [UptimeRobot](https://uptimerobot.com/)**


- 🍁 **+  Add New Monitor**
- 🍁 **Monitor Type** chọn **HTTP(s)**
- 🍁 **Friendly Name** đặt tùy ý
- 🍁 **URL (or IP)**: Dán link vừa copy bên **[Replit](https://replit.com/)** 
- 🍁 Ấn **tick** vào ô  **Select "Alert Contacts To Notify** (nhận thông báo từ email)
- 🍁 Ấn **Create Monitor** để hoàn thành quá trình tạo **uptime**

**Chúc các bạn chạy bot vui vẻ <3**