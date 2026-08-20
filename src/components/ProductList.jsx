import React from 'react';
import { products } from '../data/products';
import { ProductCard } from './ProductCard';

export const ProductList = () => {
  return (
    <section className="catalog-section">
      <div className="hero-banner">
        <div className="hero-content">
          <span className="hero-pill">🤖 Hackathon Special</span>
          <h1 className="hero-title">AI Self-Healing Shopping App</h1>
          <p className="hero-subtitle">
            A complete e-commerce experience designed for resilience, automated testing, and self-healing test suites.
          </p>
        </div>
      </div>

      <div className="catalog-header">
        <h2>Featured Products</h2>
        <span className="catalog-count">{products.length} Items Available</span>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
