# Hướng dẫn Publish lên NPM

## Bước 1: Đăng ký tài khoản NPM
1. Truy cập https://www.npmjs.com/
2. Đăng ký tài khoản mới hoặc đăng nhập
3. Xác thực email nếu cần

## Bước 2: Đăng nhập NPM từ terminal
```bash
npm login
```
Nhập username, password và email của bạn.

## Bước 3: Kiểm tra package.json
Đảm bảo các thông tin sau đã đúng:
- `name`: Tên package (phải unique trên npm)
- `version`: Phiên bản hiện tại
- `description`: Mô tả package
- `author`: Tác giả
- `license`: Giấy phép (MIT)
- `repository`: Link GitHub repository

## Bước 4: Kiểm tra files sẽ được publish
```bash
npm pack --dry-run
```
Lệnh này sẽ hiển thị danh sách files sẽ được đóng gói.

## Bước 5: Build project
```bash
npm run build
```

## Bước 6: Publish lên NPM
```bash
npm publish
```

## Bước 7: Kiểm tra package đã được publish
Truy cập https://www.npmjs.com/package/react-shopping-cart-library để xem package của bạn.

## Lưu ý quan trọng:
1. **Tên package phải unique**: Nếu tên đã tồn tại, bạn cần đổi tên trong package.json
2. **Version number**: Mỗi lần publish mới cần tăng version number
3. **Scoped packages**: Có thể sử dụng tên như @yourusername/react-shopping-cart-library
4. **Private packages**: Nếu muốn package private, thêm `"private": true` vào package.json

## Cập nhật package:
```bash
# Tăng version
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0

# Publish version mới
npm publish
```

## Xóa package (nếu cần):
```bash
npm unpublish react-shopping-cart-library@1.0.0
```
Lưu ý: Chỉ có thể xóa package trong vòng 72 giờ sau khi publish.
