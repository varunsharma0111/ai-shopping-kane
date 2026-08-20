import React from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { ProductList } from './components/ProductList';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmation } from './components/OrderConfirmation';
import { TelemetryBar } from './components/TelemetryBar';
import './index.css';

export function App() {
  return (
    <CartProvider>
      <div className="app-container">
        <Header />
        
        <main>
          <ProductList />
        </main>

        <footer className="site-footer">
          <p>© 2026 AI Self-Healing Shopping App — Kane CLI Hackathon Demo</p>
        </footer>

        <CartDrawer />
        <CheckoutModal />
        <OrderConfirmation />
        <TelemetryBar />
      </div>
    </CartProvider>
  );
}

export default App;
