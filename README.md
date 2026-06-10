# 📱 Quang Hưng Mobile - Website Bán Điện Thoại

> Website thương mại điện tử chuyên bán điện thoại di động chính hãng với giao diện hiện đại, responsive và trải nghiệm người dùng tối ưu.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 📋 Giới thiệu

**Quang Hưng Mobile** là một website bán lẻ điện thoại di động được thiết kế với mục tiêu mang đến trải nghiệm mua sắm trực tuyến tối ưu cho khách hàng. Dự án được xây dựng như một bài tập thực hành lập trình web, áp dụng các công nghệ web hiện đại và các nguyên tắc thiết kế UI/UX chuyên nghiệp.

### ✨ Đặc điểm nổi bật

- 🎨 **Giao diện hiện đại**: Thiết kế theo phong cách minimalist, tập trung vào sản phẩm với màu sắc chủ đạo đỏ (#d70018) thể hiện sự năng động và thu hút
- 📱 **Responsive Design**: Tối ưu hoàn hảo trên mọi thiết bị (Desktop, Tablet, Mobile)
- ⚡ **Performance**: Sử dụng Tailwind CSS build tối ưu, tải trang nhanh
- 🛒 **Chức năng đầy đủ**: Trang chủ, chi tiết sản phẩm, giỏ hàng, tìm kiếm thông minh
- 🎭 **UX tốt**: Animation mượt mà, hiệu ứng hover tinh tế, floating contact buttons
- 🔍 **SEO Friendly**: Cấu trúc HTML semantic, meta tags đầy đủ

## 🚀 Tính năng chính

### 1. **Trang chủ (index.html)**
- 📸 **Hero Banner Slider**: Carousel quảng cáo sản phẩm nổi bật với điều khiển prev/next và dot indicators
- 🎁 **Promo Banners**: Các banner khuyến mãi với gradient background bắt mắt
- 🔍 **Tìm kiếm thông minh**: Search box với autocomplete suggestions
- 📦 **Product Grid**: Hiển thị danh sách sản phẩm với filter theo hãng (Apple, Samsung, Oppo, Xiaomi)
- 🏷️ **Product Cards**: Card sản phẩm với hình ảnh, tên, giá, giảm giá, badges (trả góp, giảm giá)
- 🧭 **Navigation**: Menu điều hướng sticky với dropdown sản phẩm

### 2. **Trang chi tiết sản phẩm (product-detail.html)**
- 🖼️ **Gallery hình ảnh**: Ảnh chính với zoom on hover + thumbnails
- 💰 **Thông tin giá**: Giá hiện tại, giá gốc, % giảm giá
- 🎨 **Chọn biến thể**: 
  - Lựa chọn dung lượng (256GB, 512GB, 1TB)
  - Lựa chọn màu sắc (visual color picker)
- 🎁 **Khuyến mãi đặc biệt**: Hiển thị các ưu đãi kèm theo
- ⭐ **Đánh giá**: Hiển thị rating và số lượng đã bán
- 📝 **Mô tả & Specs**: Thông tin chi tiết và bảng thông số kỹ thuật
- 🛒 **CTA buttons**: "Mua ngay" và "Thêm vào giỏ"

### 3. **Trang giỏ hàng (cart.html)**
- 🛍️ **Danh sách giỏ hàng**: Hiển thị các sản phẩm đã thêm với thumbnail, tên, giá, số lượng
- ➕➖ **Điều chỉnh số lượng**: Buttons tăng/giảm số lượng sản phẩm
- 🗑️ **Xóa sản phẩm**: Nút xóa từng sản phẩm khỏi giỏ
- 💵 **Tóm tắt đơn hàng**: 
  - Tạm tính
  - Phí vận chuyển (miễn phí)
  - Tổng tiền
- 📋 **Form thanh toán**: Thu thập thông tin giao hàng (họ tên, SĐT, địa chỉ)
- 💳 **Phương thức thanh toán**: COD, Chuyển khoản, Thẻ Visa/Master
- ✅ **Xác nhận đặt hàng**: Button submit đơn hàng

### 4. **Tính năng chung**
- 📞 **Floating Contact Buttons**: 
  - Nút gọi hotline (với pulse animation)
  - Chat Facebook Messenger
  - Chat Zalo
- 🔔 **Cart Badge**: Hiển thị số lượng sản phẩm trong giỏ ở header
- 👤 **User dropdown**: Avatar và menu tài khoản
- 📱 **Mobile Menu**: Hamburger menu responsive cho mobile
- 🎨 **Custom Scrollbar**: Thanh cuộn được custom theo brand color
- ✨ **Hover Effects**: Card hover, button hover với transform và shadow

## 🛠️ Công nghệ sử dụng

- **HTML5**: Cấu trúc trang web semantic
- **Tailwind CSS v3.4.17**: Framework CSS utility-first cho styling nhanh chóng
- **JavaScript (ES6+)**: Logic xử lý tương tác, cart management, search, slider
- **Node.js & npm**: Quản lý dependencies và build tools
- **PostCSS & Autoprefixer**: Xử lý CSS và thêm vendor prefixes tự động
- **Google Fonts (Outfit)**: Typography hiện đại, tech-focused

## 📦 Cài đặt

### Yêu cầu hệ thống

- **Node.js**: >= 14.0.0
- **npm**: >= 6.0.0

### Các bước cài đặt

1. **Clone repository:**
```bash
git clone https://github.com/quangvinhho/TKW_Vinh_And_Nhi.git
cd TKW_Vinh_And_Nhi
```

2. **Cài đặt dependencies:**
```bash
npm install
```

3. **Build CSS từ Tailwind:**
```bash
npm run build:css
```

4. **Mở file HTML trong trình duyệt:**
- Mở `html/index.html` bằng Live Server (VS Code extension) hoặc
- Trực tiếp mở file trong trình duyệt

## 💻 Scripts có sẵn

| Script | Mô tả |
|--------|-------|
| `npm run build:css` | Build file CSS một lần từ Tailwind (production) |
| `npm run watch:css` | Watch và tự động build CSS khi có thay đổi (development) |

## 📁 Cấu trúc thư mục

```
TKW_Vinh_And_Nhi/
├── 📂 html/                    # Các file HTML
│   ├── 🏠 index.html          # Trang chủ - Danh sách sản phẩm
│   ├── 🛒 cart.html           # Trang giỏ hàng
│   └── 📱 product-detail.html # Trang chi tiết sản phẩm
├── 📂 css/                     # File CSS
│   ├── input.css              # Input CSS (Tailwind directives + custom styles)
│   ├── output.css             # Output CSS (generated - không chỉnh sửa)
│   └── style.css              # Legacy CSS (để tham khảo)
├── 📂 js/                      # File JavaScript
│   └── main.js                # Logic chính (cart, search, slider, filter)
├── 📂 images/                  # Hình ảnh sản phẩm và assets
│   ├── hero_banner.png
│   ├── iphone_mockup.png
│   └── ...
├── 📂 node_modules/            # Dependencies (git ignored)
├── ⚙️ tailwind.config.js       # Cấu hình Tailwind CSS
├── 📄 package.json             # Dependencies và scripts
├── 📄 package-lock.json        # Lock file
├── 🚫 .gitignore              # Git ignore rules
└── 📖 README.md               # Documentation (file này)
```

## Development

Khi phát triển, chạy lệnh watch để tự động build CSS:

```bash
npm run watch:css
```

Sau đó mở file HTML trong trình duyệt để xem kết quả.

## Lưu ý

- File `css/output.css` được generate tự động, không nên chỉnh sửa trực tiếp
- Mọi thay đổi về CSS nên được thực hiện trong file `css/input.css`
- Các custom color đã được cấu hình trong `tailwind.config.js`:
  - `brand-red`: #d70018
  - `brand-redHover`: #b80012
  - `brand-blue`: #0974e8

## Tác giả

Quang Vinh & Nhi
