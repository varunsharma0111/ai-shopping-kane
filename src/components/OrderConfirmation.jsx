import React from 'react';
import { useCart } from '../context/CartContext';

export const OrderConfirmation = () => {
  const { completedOrder, setCompletedOrder } = useCart();

  if (!completedOrder) return null;

  return (
    <div className="confirmation-backdrop">
      <div
        className="confirmation-modal"
        data-testid="order-confirmation"
      >
        <div className="success-icon-badge">✓</div>

        <h2 className="confirmation-title">Order Confirmed!</h2>
        <p className="confirmation-subtitle">
          Thank you, <strong>{completedOrder.customer.name}</strong>! Your demo order has been placed successfully.
        </p>

        <div className="order-details-card">
          <div className="order-detail-header">
            <div>
              <span className="detail-label">Order Number</span>
              <span className="order-id-code">{completedOrder.orderId}</span>
            </div>
            <div>
              <span className="detail-label">Date</span>
              <span>{completedOrder.date}</span>
            </div>
          </div>

          <div className="shipping-info">
            <span className="detail-label">Ship To</span>
            <p className="shipping-address">{completedOrder.customer.address}</p>
            <p className="shipping-email">{completedOrder.customer.email}</p>
          </div>

          <div className="confirmation-items">
            <span className="detail-label">Order Summary</span>
            {completedOrder.items.map((item) => (
              <div key={item.id} className="conf-item-row">
                <span>
                  {item.quantity}x {item.name}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="conf-total-row">
            <span>Total Paid</span>
            <span className="conf-total-amount">
              ${completedOrder.total.toFixed(2)}
            </span>
          </div>
        </div>

        <button
          className="continue-btn primary-full"
          data-testid="back-to-shop"
          onClick={() => setCompletedOrder(null)}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};
