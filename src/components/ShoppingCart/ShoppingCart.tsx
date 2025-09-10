import React, { useState } from 'react';
import { ShoppingCartProps } from '../../types';
import Card from '../Card';
import Button from '../Button';
import Modal from '../Modal';
import Input from '../Input';

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  items,
  onAddItem,
  onRemoveItem,
  onUpdateQuantity,
  onClearCart,
  className = '',
  showCheckout = true,
  onCheckout,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    quantity: '1',
    description: '',
    image: '',
  });

  const handleAddItem = () => {
    if (newItem.name && newItem.price) {
      const item = {
        name: newItem.name,
        price: parseFloat(newItem.price),
        quantity: parseInt(newItem.quantity) || 1,
        description: newItem.description,
        image: newItem.image,
      };
      onAddItem?.(item);
      setNewItem({
        name: '',
        price: '',
        quantity: '1',
        description: '',
        image: '',
      });
      setIsAddModalOpen(false);
    }
  };

  const handleEditItem = (item: any) => {
    setEditingItem(item);
    setNewItem({
      name: item.name,
      price: item.price.toString(),
      quantity: item.quantity.toString(),
      description: item.description || '',
      image: item.image || '',
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateItem = () => {
    if (editingItem && newItem.name && newItem.price) {
      onUpdateQuantity?.(editingItem.id, parseInt(newItem.quantity) || 1);
      setIsEditModalOpen(false);
      setEditingItem(null);
    }
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      onRemoveItem?.(itemId);
    } else {
      onUpdateQuantity?.(itemId, newQuantity);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className={`shopping-cart ${className}`}>
      <div className="shopping-cart-header">
        <h2 className="shopping-cart-title">Giỏ hàng ({totalItems})</h2>
        <div className="shopping-cart-actions">
          <Button
            variant="primary"
            size="small"
            onClick={() => setIsAddModalOpen(true)}
          >
            Thêm sản phẩm
          </Button>
          {items.length > 0 && (
            <Button
              variant="danger"
              size="small"
              onClick={onClearCart}
            >
              Xóa tất cả
            </Button>
          )}
        </div>
      </div>

      <div className="shopping-cart-items">
        {items.length === 0 ? (
          <div className="shopping-cart-empty">
            <p>Giỏ hàng trống</p>
          </div>
        ) : (
          items.map((item) => (
            <Card key={item.id} className="cart-item-card">
              <div className="cart-item">
                {item.image && (
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                )}
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  {item.description && (
                    <p className="cart-item-description">{item.description}</p>
                  )}
                  <div className="cart-item-price">
                    {item.price.toLocaleString('vi-VN')} VNĐ
                  </div>
                </div>
                <div className="cart-item-controls">
                  <div className="quantity-controls">
                    <Button
                      size="small"
                      variant="secondary"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <span className="quantity-display">{item.quantity}</span>
                    <Button
                      size="small"
                      variant="secondary"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                  <div className="cart-item-actions">
                    <Button
                      size="small"
                      variant="secondary"
                      onClick={() => handleEditItem(item)}
                    >
                      Sửa
                    </Button>
                    <Button
                      size="small"
                      variant="danger"
                      onClick={() => onRemoveItem?.(item.id)}
                    >
                      Xóa
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {items.length > 0 && (
        <div className="shopping-cart-summary">
          <div className="cart-total">
            <div className="total-items">
              Tổng số lượng: {totalItems} sản phẩm
            </div>
            <div className="total-price">
              Tổng tiền: {totalPrice.toLocaleString('vi-VN')} VNĐ
            </div>
          </div>
          {showCheckout && (
            <Button
              variant="success"
              size="large"
              onClick={onCheckout}
              className="checkout-button"
            >
              Thanh toán
            </Button>
          )}
        </div>
      )}

      {/* Add Item Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Thêm sản phẩm mới"
        size="medium"
      >
        <div className="add-item-form">
          <Input
            label="Tên sản phẩm"
            value={newItem.name}
            onChange={(value) => setNewItem({ ...newItem, name: value })}
            placeholder="Nhập tên sản phẩm"
          />
          <Input
            label="Giá"
            type="number"
            value={newItem.price}
            onChange={(value) => setNewItem({ ...newItem, price: value })}
            placeholder="Nhập giá sản phẩm"
          />
          <Input
            label="Số lượng"
            type="number"
            value={newItem.quantity}
            onChange={(value) => setNewItem({ ...newItem, quantity: value })}
            placeholder="Nhập số lượng"
          />
          <Input
            label="Mô tả (tùy chọn)"
            value={newItem.description}
            onChange={(value) => setNewItem({ ...newItem, description: value })}
            placeholder="Nhập mô tả sản phẩm"
          />
          <Input
            label="URL hình ảnh (tùy chọn)"
            value={newItem.image}
            onChange={(value) => setNewItem({ ...newItem, image: value })}
            placeholder="Nhập URL hình ảnh"
          />
          <div className="modal-actions">
            <Button
              variant="secondary"
              onClick={() => setIsAddModalOpen(false)}
            >
              Hủy
            </Button>
            <Button
              variant="primary"
              onClick={handleAddItem}
              disabled={!newItem.name || !newItem.price}
            >
              Thêm sản phẩm
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Item Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Sửa sản phẩm"
        size="medium"
      >
        <div className="edit-item-form">
          <Input
            label="Tên sản phẩm"
            value={newItem.name}
            onChange={(value) => setNewItem({ ...newItem, name: value })}
            placeholder="Nhập tên sản phẩm"
          />
          <Input
            label="Giá"
            type="number"
            value={newItem.price}
            onChange={(value) => setNewItem({ ...newItem, price: value })}
            placeholder="Nhập giá sản phẩm"
          />
          <Input
            label="Số lượng"
            type="number"
            value={newItem.quantity}
            onChange={(value) => setNewItem({ ...newItem, quantity: value })}
            placeholder="Nhập số lượng"
          />
          <Input
            label="Mô tả (tùy chọn)"
            value={newItem.description}
            onChange={(value) => setNewItem({ ...newItem, description: value })}
            placeholder="Nhập mô tả sản phẩm"
          />
          <Input
            label="URL hình ảnh (tùy chọn)"
            value={newItem.image}
            onChange={(value) => setNewItem({ ...newItem, image: value })}
            placeholder="Nhập URL hình ảnh"
          />
          <div className="modal-actions">
            <Button
              variant="secondary"
              onClick={() => setIsEditModalOpen(false)}
            >
              Hủy
            </Button>
            <Button
              variant="primary"
              onClick={handleUpdateItem}
              disabled={!newItem.name || !newItem.price}
            >
              Cập nhật
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ShoppingCart;