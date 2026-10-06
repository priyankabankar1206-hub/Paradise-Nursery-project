import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const cost = parseFloat(item.cost.replace('$', ''));
      return total + cost * item.quantity;
    }, 0).toFixed(2);
  };

  // Handle continue shopping action
  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  // Handle checkout placeholder action
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  // Increment item quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrement item quantity or remove item if quantity reaches 0
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Remove item from cart completely
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost for a single item type
  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.replace('$', ''));
    return (cost * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '15px 0', gap: '20px' }}>
            <img className="cart-item-image" src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px' }} />
            <div className="cart-item-details" style={{ flexGrow: 1 }}>
              <div className="cart-item-name" style={{ fontWeight: 'bold', fontSize: '18px' }}>{item.name}</div>
              <div className="cart-item-cost" style={{ color: '#555' }}>Unit Price: {item.cost}</div>
              <div className="cart-item-quantity" style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '10px 0' }}>
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)} style={{ width: '30px', height: '30px', cursor: 'pointer' }}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)} style={{ width: '30px', height: '30px', cursor: 'pointer' }}>+</button>
              </div>
              <div className="cart-item-total" style={{ fontWeight: 'bold' }}>Subtotal: ${calculateTotalCost(item)}</div>
            </div>
            <button className="cart-item-delete" onClick={() => handleRemove(item)} style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer' }}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="continue_shopping_btn" style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between' }}>
        <button className="get-started-btn" onClick={(e) => handleContinueShopping(e)} style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
          Continue Shopping
        </button>
        <button className="get-started-btn" onClick={(e) => handleCheckoutShopping(e)} style={{ backgroundColor: '#008CBA', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
