# React Shopping Cart Library

Một thư viện React hoàn chỉnh cho chức năng giỏ hàng với các component UI tái sử dụng được.

## ✨ Tính năng

- 🛒 **Shopping Cart Component** - Component giỏ hàng đầy đủ chức năng
- 🎨 **UI Components** - Button, Input, Modal, Card chuẩn hóa
- 🔄 **State Management** - Context API và hooks cho quản lý state
- 📱 **Responsive Design** - Giao diện thân thiện với mobile
- 🎯 **TypeScript** - Hỗ trợ đầy đủ TypeScript
- 🎨 **Customizable** - Dễ dàng tùy chỉnh giao diện

## 📦 Cài đặt

```bash
npm install react-shopping-cart-library
```

## 🚀 Sử dụng cơ bản

### 1. Sử dụng với Context Provider

```tsx
import React from 'react';
import { CartProvider, ShoppingCart, useCart } from 'react-shopping-cart-library';

function App() {
  return (
    <CartProvider>
      <ShoppingCartExample />
    </CartProvider>
  );
}

function ShoppingCartExample() {
  const { items, addItem, removeItem, updateQuantity, clearCart } = useCart();

  const handleCheckout = () => {
    console.log('Proceeding to checkout...', items);
  };

  return (
    <ShoppingCart
      items={items}
      onAddItem={addItem}
      onRemoveItem={removeItem}
      onUpdateQuantity={updateQuantity}
      onClearCart={clearCart}
      onCheckout={handleCheckout}
      showCheckout={true}
    />
  );
}
```

### 2. Sử dụng với props (không cần Context)

```tsx
import React, { useState } from 'react';
import { ShoppingCart, CartItem } from 'react-shopping-cart-library';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addItem = (item: Omit<CartItem, 'id'>) => {
    const newItem: CartItem = {
      ...item,
      id: `${item.name}-${Date.now()}`,
    };
    setCartItems(prev => [...prev, newItem]);
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <ShoppingCart
      items={cartItems}
      onAddItem={addItem}
      onRemoveItem={removeItem}
      onUpdateQuantity={updateQuantity}
      onClearCart={clearCart}
    />
  );
}
```

## 🧩 Components

### Button

```tsx
import { Button } from 'react-shopping-cart-library';

<Button
  variant="primary" // 'primary' | 'secondary' | 'danger' | 'success'
  size="medium"     // 'small' | 'medium' | 'large'
  onClick={() => console.log('Clicked!')}
>
  Click me
</Button>
```

### Input

```tsx
import { Input } from 'react-shopping-cart-library';

<Input
  label="Tên sản phẩm"
  value={value}
  onChange={setValue}
  placeholder="Nhập tên sản phẩm"
  type="text"
/>
```

### Modal

```tsx
import { Modal } from 'react-shopping-cart-library';

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  size="medium" // 'small' | 'medium' | 'large'
>
  <p>Modal content goes here</p>
</Modal>
```

### Card

```tsx
import { Card } from 'react-shopping-cart-library';

<Card
  title="Card Title"
  subtitle="Card Subtitle"
  image="https://example.com/image.jpg"
  actions={<Button>Action</Button>}
>
  <p>Card content</p>
</Card>
```

## 🎨 Styling

Thư viện sử dụng CSS modules và có thể dễ dàng tùy chỉnh thông qua CSS variables:

```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #6b7280;
  --danger-color: #ef4444;
  --success-color: #10b981;
  --border-radius: 6px;
  --box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}
```

## 📱 Responsive Design

Tất cả components đều được thiết kế responsive và hoạt động tốt trên:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)

## 🔧 TypeScript

Thư viện được viết hoàn toàn bằng TypeScript và cung cấp đầy đủ type definitions:

```tsx
import { CartItem, ShoppingCartProps } from 'react-shopping-cart-library';

const item: CartItem = {
  id: '1',
  name: 'Product Name',
  price: 100000,
  quantity: 2,
  description: 'Product description',
  image: 'https://example.com/image.jpg'
};
```

## 📄 API Reference

### CartItem

```tsx
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  description?: string;
}
```

### ShoppingCartProps

```tsx
interface ShoppingCartProps {
  items: CartItem[];
  onAddItem?: (item: Omit<CartItem, 'id'>) => void;
  onRemoveItem?: (id: string) => void;
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onClearCart?: () => void;
  className?: string;
  showCheckout?: boolean;
  onCheckout?: () => void;
}
```

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Support

Nếu bạn gặp vấn đề hoặc có câu hỏi, vui lòng tạo issue trên GitHub repository.

---

Made with ❤️ by Van Luan
