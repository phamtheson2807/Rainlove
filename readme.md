# 💝 Rainlove - Mưa Tim Lãng Mạn ✨

> 💌 **Dự án tình yêu**: Tạo hiệu ứng mưa tim lãng mạn với JavaScript thuần + Tính năng tạo link cá nhân hóa

## 📋 Mô tả

**Rainlove** là một ứng dụng web tạo hiệu ứng mưa tim rơi đẹp mắt và lãng mạn.
Dự án sử dụng HTML5 Canvas, CSS3 và JavaScript thuần để tạo ra những trái tim rơi từ trên xuống với nhiều hiệu ứng đặc biệt, kèm theo tính năng tạo link cá nhân hóa để chia sẻ với người thương.

## ✨ Tính năng chính

### 🎯 Hiệu ứng mưa tim

- Tạo tim rơi từ trên xuống với hiệu ứng tự nhiên
- Nhiều kích thước và màu sắc khác nhau
- Hiệu ứng trong suốt và xoay vòng
- Hoạt động mượt mà trên mọi thiết bị

### 🎵 Âm thanh

- Nhạc nền lãng mạn tự động phát
- Điều khiển phát/tạm dừng nhạc
- Âm thanh chất lượng cao

### 💌 Tính năng tạo link cá nhân hóa

- Tạo link riêng với tên người nhận
- Chia sẻ dễ dàng qua mạng xã hội
- **Copy link tự động với một click** 📋
- Tạo QR Code để chia sẻ nhanh

### 📱 Tối ưu cho Mobile

- **Yêu cầu xoay ngang**: Tự động yêu cầu xoay ngang trên điện thoại để trải nghiệm tốt nhất
- Responsive design hoàn hảo trên mọi thiết bị
- Tự động điều chỉnh kích thước theo màn hình
- Touch-friendly interface

## 🚀 Demo trực tiếp

### 🔗 Trang tạo link cá nhân hóa:

[https://github.com/phamtheson2807/Rainlove/](https://github.com/phamtheson2807/Rainlove/)

### 🎯 Trang hiển thị hiệu ứng:

Truy cập link được tạo từ trang input để xem hiệu ứng mưa tim

## 🏗 Cấu trúc dự án

```
├── index.html              # 🏠 Trang chính hiển thị hiệu ứng mưa tim
├── input.html              # ✏️ Trang tạo link cá nhân hóa
├── debug.html              # 🔧 Trang debug và test
├── test-font.html          # 🎨 Test font display
├── tim.html                # 💖 Trang test hiệu ứng tim
└── assets/                 # 📁 Thư mục tài nguyên
    ├── rainlove.js         # 💻 Script hiệu ứng mưa tim chính
    ├── rainlove-tim-exact.js # 🎯 Script hiệu ứng tim chính xác
    ├── heart-storm.js      # ⛈️ Script tạo bão tim
    ├── script.js           # 📜 Script chung
    ├── qrcode.min.js       # 📱 Thư viện tạo QR Code
    ├── styles.css          # 🎨 File CSS chính
    ├── Dongle.ttf          # 🔤 Font chữ đẹp
    ├── *.mp3               # 🎵 File nhạc nền
    ├── *.gif               # 🖼️ Ảnh động hiệu ứng
    └── *.png               # 🖼️ Ảnh tĩnh
```

## 🛠 Cài đặt và sử dụng

### 1️⃣ Clone dự án

```bash
git clone https://github.com/phamtheson2807/Rainlove.git
cd Rainlove
```

### 2️⃣ Chạy local server (tuỳ chọn)

```bash
# Dùng Python
python -m http.server 8000

# Hoặc dùng Node.js
npx http-server
```

### 3️⃣ Mở trình duyệt

- Truy cập `input.html` để tạo link cá nhân hóa
- Nhập tên người nhận và tạo link
- Copy link hoặc scan QR code để chia sẻ

## 💡 Hướng dẫn sử dụng chi tiết

### 🔧 Tạo link cá nhân hóa

1. Mở `input.html` trong trình duyệt
2. Nhập tên người bạn muốn gửi (ví dụ: "Yêu ơi")
3. Click nút **"Tạo link"** để tạo link cá nhân
4. Click nút **"Copy Link"** để sao chép tự động vào clipboard
5. Chia sẻ link hoặc QR code với người thương

### 📱 Trải nghiệm trên mobile

- Khi truy cập bằng điện thoại, hệ thống sẽ yêu cầu xoay ngang
- Đợi 1 giây sau khi xoay ngang để hiệu ứng tải hoàn toàn
- Trải nghiệm tối ưu với màn hình ngang

### 🎵 Điều khiển âm thanh

- Nhạc sẽ tự động phát khi hiệu ứng bắt đầu
- Click vào biểu tượng âm thanh để bật/tắt nhạc
- Có thể điều chỉnh âm lượng từ trình duyệt

## ⚙️ Tùy chỉnh

### 🎨 Thay đổi màu sắc tim

Trong `assets/rainlove.js`, tìm và chỉnh sửa:

```javascript
const heartColors = ["#ff69b4", "#ff1493", "#dc143c", "#b22222"];
```

### 🎵 Thay đổi nhạc nền

Thay thế file `.mp3` trong thư mục `assets/` và cập nhật đường dẫn trong code

### 💨 Điều chỉnh tốc độ rơi

Trong script chính, tìm và thay đổi:

```javascript
const fallSpeed = 2; // Tăng để rơi nhanh hơn
```

## 🔧 Công nghệ sử dụng

- **HTML5 Canvas**: Vẽ hiệu ứng tim
- **CSS3**: Animation và responsive design
- **JavaScript ES6+**: Logic điều khiển
- **Web Audio API**: Phát nhạc nền
- **Clipboard API**: Copy link tự động
- **QR Code.js**: Tạo mã QR
- **Orientation API**: Phát hiện và yêu cầu xoay màn hình

## 🌟 Đặc điểm nổi bật

### ✅ Hoàn toàn miễn phí

- Không cần đăng ký tài khoản
- Không có quảng cáo
- Mã nguồn mở hoàn toàn

### ✅ Bảo mật và riêng tư

- Không lưu trữ dữ liệu cá nhân
- Chạy hoàn toàn trên client
- Không gửi thông tin lên server

### ✅ Tối ưu hiệu suất

- Sử dụng RequestAnimationFrame để animation mượt
- Tự động dọn dẹp memory
- Responsive trên mọi thiết bị

## 🐛 Khắc phục sự cố

### ❌ Không có âm thanh?

- Đảm bảo trình duyệt cho phép autoplay
- Click vào trang trước khi phát nhạc
- Kiểm tra âm lượng trình duyệt

### ❌ Hiệu ứng lag trên mobile?

- Đảm bảo đã xoay ngang màn hình
- Đóng các app khác để giải phóng RAM
- Sử dụng trình duyệt mới nhất

### ❌ Copy link không hoạt động?

- Trình duyệt cần hỗ trợ Clipboard API
- Đảm bảo trang được truy cập qua HTTPS hoặc localhost
- Thử refresh trang và copy lại

## 📄 Giấy phép

Dự án sử dụng **MIT License** - xem file [LICENSE](LICENSE) để biết chi tiết.

## 🤝 Đóng góp

Rất hoan nghênh các đóng góp từ cộng đồng! Bạn có thể:

1. 🌟 **Star** repo này để ủng hộ
2. 🐛 **Report bugs** qua [Issues](https://github.com/phamtheson2807/Rainlove/issues)
3. 💡 **Suggest features** cho phiên bản tiếp theo
4. 🔀 **Fork** và tạo Pull Request

## 📞 Liên hệ

- **GitHub**: [@phamtheson2807](https://github.com/phamtheson2807)
- **Email**: phamtheson2807@gmail.com

## 🙏 Lời cảm ơn

Cảm ơn bạn đã quan tâm đến **Rainlove**! Hy vọng dự án này sẽ giúp bạn tạo ra những khoảnh khắc lãng mạn và đáng nhớ.

> 💕 _"Tình yêu như mưa tim, rơi nhẹ nhàng nhưng để lại ấn tượng sâu sắc"_

---

⭐ **Đừng quên star repo nếu bạn thấy hữu ích!** ⭐
