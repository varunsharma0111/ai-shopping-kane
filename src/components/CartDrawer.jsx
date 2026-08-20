import React from 'react';
import { useCart } from '../context/CartContext';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    shipping,
    total,
    totalItems,
    setIsCheckoutOpen
  } = useCart();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="cart-backdrop" onClick={() => setIsCartOpen(false)}>
      <div
        className="cart-drawer"
        data-testid="cart-drawer"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cart-header">
          <h3>
            Shopping Cart <span className="cart-badge-inline">({totalItems})</span>
          </h3>
          <button
            className="close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close Cart"
          >
            ✕
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart" data-testid="empty-cart-message">
            <div className="empty-icon">🛒</div>
            <p className="empty-title">Your cart is empty</p>
            <p className="empty-sub">Explore our products and add something awesome!</p>
            <button
              className="continue-btn"
              data-testid="back-to-shop"
              onClick={() => setIsCartOpen(false)}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {cart.map((item) => (
                <div className="cart-item" data-testid="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-details">
                    <h4 className="cart-item-title">{item.name}</h4>
                    <div className="cart-item-price-unit">
                      ${item.price.toFixed(2)} each
                    </div>

                    <div className="cart-qty-controls">
                      <button
                        className="qty-btn"
                        data-testid="quantity-decrease"
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="qty-value" data-testid="item-quantity">
                        {item.quantity}
                      </span>
                      <button
                        className="qty-btn"
                        data-testid="quantity-increase"
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-right">
                    <span className="cart-item-subtotal">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      className="remove-btn"
                      data-testid="remove-item"
                      onClick={() => removeFromCart(item.id)}
                      title="Remove item"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span data-testid="cart-subtotal">${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Estimated Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="summary-row total-row">
                <span>Total</span>
                <span className="total-price" data-testid="cart-total">
                  ${total.toFixed(2)}
                </span>
              </div>

              <button
                className="checkout-btn"
                data-testid="checkout-button"
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
