import React from 'react';
import { useCart } from '../context/CartContext';

export const Header = () => {
  const { totalItems, setIsCartOpen, chaosMode, toggleChaosMode } = useCart();

  return (
    <header className="site-header">
      <div className="header-container">
        <div className="brand-logo">
          <div className="logo-badge">AI</div>
          <span className="brand-name">Kane Shop</span>
          <span className="brand-tag">Self-Healing Demo</span>
        </div>

        <div className="header-actions">
          <button
            className={`chaos-mode-btn ${chaosMode ? 'active' : ''}`}
            data-testid="chaos-toggle"
            onClick={toggleChaosMode}
            title="Simulate classname mutations to test Kane CLI self-healing automation"
          >
            <span className="chaos-icon">{chaosMode ? '🔥' : '⚡'}</span>
            <span className="chaos-text">
              {chaosMode ? 'Chaos Mode: ON' : 'Simulate Selector Drift'}
            </span>
          </button>

          <button
            className="cart-icon-btn"
            data-testid="cart-button"
            onClick={() => setIsCartOpen(true)}
            aria-label="Open Shopping Cart"
          >
            <svg
              className="cart-svg"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span className="cart-btn-text">Cart</span>
            {totalItems > 0 && (
              <span className="cart-badge" data-testid="cart-count">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
