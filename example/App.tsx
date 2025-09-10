import React, { useState } from 'react';
import { 
  ShoppingCart, 
  CartProvider, 
  useCart, 
  CartItem,
  Button,
  Modal,
  Input
} from '../src';

// Example 1: Using with Context Provider
function ShoppingCartWithContext() {
  const { items, addItem, removeItem, updateQuantity, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
  };

  return (
    <div>
      <h2>Shopping Cart với Context Provider</h2>
      <ShoppingCart
        items={items}
        onAddItem={addItem}
        onRemoveItem={removeItem}
        onUpdateQuantity={updateQuantity}
        onClearCart={clearCart}
        onCheckout={handleCheckout}
        showCheckout={true}
      />
      
      <Modal
        isOpen={showCheckout}
        onClose={handleCloseCheckout}
        title="Thanh toán"
        size="medium"
      >
        <div>
          <h3>Đơn hàng của bạn</h3>
          <p>Tổng số sản phẩm: {items.reduce((sum, item) => sum + item.quantity, 0)}</p>
          <p>Tổng tiền: {items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString('vi-VN')} VNĐ</p>
          <Button variant="success" onClick={handleCloseCheckout}>
            Xác nhận thanh toán
          </Button>
        </div>
      </Modal>
    </div>
  );
}

// Example 2: Using with local state
function ShoppingCartWithState() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'iPhone 15 Pro',
      price: 29990000,
      quantity: 1,
      description: 'iPhone 15 Pro 256GB',
      image: 'https://via.placeholder.com/300x200?text=iPhone+15+Pro'
    },
    {
      id: '2',
      name: 'MacBook Air M2',
      price: 25990000,
      quantity: 1,
      description: 'MacBook Air 13 inch M2 chip',
      image: 'https://via.placeholder.com/300x200?text=MacBook+Air+M2'
    }
  ]);

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
    <div>
      <h2>Shopping Cart với Local State</h2>
      <ShoppingCart
        items={cartItems}
        onAddItem={addItem}
        onRemoveItem={removeItem}
        onUpdateQuantity={updateQuantity}
        onClearCart={clearCart}
        showCheckout={false}
      />
    </div>
  );
}

// Main App
function App() {
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>React Shopping Cart Library - Examples</h1>
      
      <div style={{ marginBottom: '3rem' }}>
        <CartProvider>
          <ShoppingCartWithContext />
        </CartProvider>
      </div>
      
      <div style={{ marginBottom: '3rem' }}>
        <ShoppingCartWithState />
      </div>
      
      <div>
        <h2>Component Examples</h2>
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <div>
            <h3>Buttons</h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="success">Success</Button>
            </div>
          </div>
          
          <div>
            <h3>Inputs</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Input
                label="Tên sản phẩm"
                value=""
                onChange={() => {}}
                placeholder="Nhập tên sản phẩm"
              />
              <Input
                label="Giá"
                type="number"
                value=""
                onChange={() => {}}
                placeholder="Nhập giá"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
