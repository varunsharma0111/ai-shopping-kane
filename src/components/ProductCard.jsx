import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export const ProductCard = ({ product }) => {
  const { addToCart, chaosMode } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  // Chaos mode mutates non-testid class names to simulate CSS selector drift
  const cardClassName = chaosMode
    ? 'product-card product-card-mutated-v2-legacy-redesign'
    : 'product-card';

  const btnClassName = chaosMode
    ? `add-to-cart-btn mutated-btn-v3 ${added ? 'added' : ''}`
    : `add-to-cart-btn ${added ? 'added' : ''}`;

  return (
    <div className={cardClassName} data-testid="product-card">
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
        <span className="product-category-tag">{product.category}</span>
      </div>

      <div className="product-info">
        <div className="product-rating">
          <span className="star">★</span> {product.rating} ({product.reviewsCount})
        </div>

        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-footer">
          <div className="product-price">
            <span className="currency">$</span>
            <span className="amount">{product.price.toFixed(2)}</span>
          </div>

          <button
            className={btnClassName}
            data-testid="add-to-cart"
            onClick={handleAdd}
          >
            {added ? '✓ Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};
