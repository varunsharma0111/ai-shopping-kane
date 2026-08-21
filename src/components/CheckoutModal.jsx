import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    shipping,
    total,
    clearCart,
    setCompletedOrder
  } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: ''
  });

  const [errors, setErrors] = useState({});

  if (!isCheckoutOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Shipping address is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const orderData = {
      orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      customer: { ...formData },
      items: [...cart],
      subtotal,
      shipping,
      total
    };

    setCompletedOrder(orderData);
    clearCart();
    setIsCheckoutOpen(false);
  };

  return (
    <div className="checkout-backdrop" onClick={() => setIsCheckoutOpen(false)}>
      <div
        className="checkout-modal"
        data-testid="checkout-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>Express Checkout</h2>
          <button
            className="close-btn"
            onClick={() => setIsCheckoutOpen(false)}
            aria-label="Close Checkout"
          >
            ✕
          </button>
        </div>

        <form
          className="checkout-form"
          data-testid="checkout-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="form-group">
            <label htmlFor="customer-name">Full Name *</label>
            <input
              type="text"
              id="customer-name"
              name="name"
              data-testid="customer-name"
              placeholder="e.g. Varun Sharma"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="customer-email">Email Address *</label>
            <input
              type="email"
              id="customer-email"
              name="email"
              data-testid="customer-email"
              placeholder="e.g. varun@example.com"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-text" data-testid="email-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="customer-address">Shipping Address *</label>
            <textarea
              id="customer-address"
              name="address"
              data-testid="customer-address"
              placeholder="e.g. 123 Hackathon Way, Innovation Suite 404, CA"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              className={errors.address ? 'input-error' : ''}
            />
            {errors.address && <span className="error-text">{errors.address}</span>}
          </div>

          <div className="checkout-order-summary">
            <h4>Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} items)</h4>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="summary-row total-row">
              <span>Amount Due</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="place-order-btn"
            data-testid="place-order"
          >
            🔒 Place Order (${total.toFixed(2)})
          </button>
        </form>
      </div>
    </div>
  );
};
