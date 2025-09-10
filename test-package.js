// Script để test package trước khi publish
const fs = require('fs');
const path = require('path');

console.log('🔍 Kiểm tra package trước khi publish...\n');

// Kiểm tra dist folder
const distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
  console.error('❌ Thư mục dist không tồn tại. Chạy npm run build trước.');
  process.exit(1);
}

// Kiểm tra các files cần thiết
const requiredFiles = [
  'dist/index.js',
  'dist/index.esm.js',
  'dist/index.d.ts',
  'dist/index.css',
  'dist/index.esm.css'
];

let allFilesExist = true;
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - THIẾU`);
    allFilesExist = false;
  }
});

// Kiểm tra package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

console.log('\n📦 Thông tin package:');
console.log(`Name: ${packageJson.name}`);
console.log(`Version: ${packageJson.version}`);
console.log(`Description: ${packageJson.description}`);
console.log(`Main: ${packageJson.main}`);
console.log(`Module: ${packageJson.module}`);
console.log(`Types: ${packageJson.types}`);

// Kiểm tra files trong package
const files = packageJson.files || [];
console.log(`\n📁 Files sẽ được publish: ${files.join(', ')}`);

if (allFilesExist) {
  console.log('\n✅ Package đã sẵn sàng để publish!');
  console.log('\n🚀 Các bước tiếp theo:');
  console.log('1. npm login');
  console.log('2. npm publish');
} else {
  console.log('\n❌ Package chưa sẵn sàng. Vui lòng sửa các lỗi trên.');
  process.exit(1);
}
