import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [chaosMode, setChaosMode] = useState(false);
  const [bugMode, setBugMode] = useState(false);
  const [telemetryLogs, setTelemetryLogs] = useState([
    { id: 1, type: 'SYSTEM', text: 'AI Self-Healing Shopping App initialized.', time: new Date().toLocaleTimeString() }
  ]);

  const addLog = (type, text) => {
    setTelemetryLogs((prev) => [
      { id: Date.now(), type, text, time: new Date().toLocaleTimeString() },
      ...prev.slice(0, 19)
    ]);
  };

  const toggleChaosMode = () => {
    setChaosMode((prev) => {
      const next = !prev;
      addLog('CHAOS', next ? '⚠️ Chaos Mode ACTIVE: Classnames dynamically mutated.' : '✅ Chaos Mode OFF: Standard DOM restored.');
      return next;
    });
  };

  const toggleBugMode = () => {
    setBugMode((prev) => {
      const next = !prev;
      addLog('BUG', next ? '🐛 Special Bug INJECTED: Subtotal calculation flaw enabled (Total glitch).' : '✅ Bug REMOVED: Calculations working normally.');
      return next;
    });
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    addLog('ACTION', `Added "${product.name}" to cart.`);
  };

  const removeFromCart = (productId) => {
    const item = cart.find((i) => i.id === productId);
    setCart((prevCart) => prevCart.filter((i) => i.id !== productId));
    if (item) addLog('ACTION', `Removed "${item.name}" from cart.`);
  };

  const updateQuantity = (productId, delta) => {
    const item = cart.find((i) => i.id === productId);
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
    if (item) {
      const actionStr = delta > 0 ? 'Increased' : 'Decreased';
      addLog('ACTION', `${actionStr} quantity of "${item.name}".`);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const realSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // If bugMode is active, calculate subtotal incorrectly (e.g. missing 1 item's price) so Kane detects calculation bug!
  const subtotal = bugMode
    ? (cart.length > 0 ? realSubtotal - cart[0].price : realSubtotal)
    : realSubtotal;

  const shipping = subtotal > 0 ? (subtotal > 200 ? 0 : 15.00) : 0;
  const total = subtotal + shipping;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        realSubtotal,
        shipping,
        total,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        completedOrder,
        setCompletedOrder,
        chaosMode,
        toggleChaosMode,
        bugMode,
        toggleBugMode,
        telemetryLogs,
        addLog
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
