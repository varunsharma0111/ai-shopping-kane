import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [chaosMode, setChaosMode] = useState(false);
  const [telemetryLogs, setTelemetryLogs] = useState([
    { id: 1, type: 'SYSTEM', text: 'AI Self-Healing Shopping App initialized.', time: new Date().toLocaleTimeString() }
  ]);

  const addLog = (type, text) => {
    setTelemetryLogs((prev) => [
      { id: Date.now(), type, text, time: new Date().toLocaleTimeString() },
      ...prev.slice(0, 19)
    ]);
  };

  const [activeBug, setActiveBug] = useState('CART_CALCULATION'); // 'CART_CALCULATION' | 'CHECKOUT_VALIDATION' | null
  const [verificationTimeline, setVerificationTimeline] = useState([
    { id: 1, time: new Date().toLocaleTimeString(), phase: 'REGRESSION_1', title: '⚠️ Cart Subtotal Bug Active', desc: 'Subtotal calculates base unit price ($299.99) instead of (2 × $299.99 = $599.98)', status: 'fail' }
  ]);

  const addTimelineEvent = (phase, title, desc, status = 'pass') => {
    setVerificationTimeline((prev) => [
      { id: Date.now(), time: new Date().toLocaleTimeString(), phase, title, desc, status },
      ...prev.slice(0, 9)
    ]);
  };

  const injectCartBug = () => {
    setActiveBug('CART_CALCULATION');
    addLog('BUG', '⚠️ Regression #1 Injected: Cart total uses base price instead of (price × quantity)');
    addTimelineEvent('REGRESSION_1', 'AI modified cart formula', 'Bug #1 introduced: subtotal = item.price * 1', 'fail');
  };

  const injectCheckoutBug = () => {
    setActiveBug('CHECKOUT_VALIDATION');
    addLog('BUG', '⚠️ Regression #2 Injected: Email format validation bypassed');
    addTimelineEvent('REGRESSION_2', 'AI modified checkout modal', 'Bug #2 introduced: email regex validation removed', 'fail');
  };

  const clearBugs = () => {
    setActiveBug(null);
    addLog('FIX', '✅ Codebase restored to healthy state');
    addTimelineEvent('RESTORE', 'Code base verified', 'All calculations and validations operating cleanly', 'pass');
  };

  const triggerSelfHealingLoop = async (bugType = 'CART_CALCULATION') => {
    if (bugType === 'CART_CALCULATION') {
      injectCartBug();
      addTimelineEvent('KANE_RUN', 'Kane CLI Started', 'Running test: verify cart-total is 599.98', 'pending');
      
      setTimeout(() => {
        addTimelineEvent('KANE_FAIL', '❌ KANE FAILURE DETECTED', 'Expected $599.98, Actual $299.99', 'fail');
      }, 1500);

      setTimeout(() => {
        addTimelineEvent('AI_DIAGNOSIS', '🧠 AI Agent Diagnosed Issue', 'CartContext.jsx line 75 misses (item.price * 1)', 'pending');
      }, 3000);

      setTimeout(() => {
        addTimelineEvent('AI_FIX', '🛠️ AI Applied Fix', 'Code updated to item.price * 1', 'pass');
        clearBugs();
      }, 4500);

      setTimeout(() => {
        addTimelineEvent('KANE_VERIFY', '✅ KANE RE-RUN VERIFIED', '100% End-to-End Closed Loop Passed!', 'pass');
      }, 6000);
    } else {
      injectCheckoutBug();
      addTimelineEvent('KANE_RUN', 'Kane CLI Started', 'Running test: verify email-error on invalid email', 'pending');
      
      setTimeout(() => {
        addTimelineEvent('KANE_FAIL', '❌ KANE FAILURE DETECTED', 'Expected email-error, but order submitted with invalid email', 'fail');
      }, 1500);

      setTimeout(() => {
        addTimelineEvent('AI_DIAGNOSIS', '🧠 AI Agent Diagnosed Issue', 'CheckoutModal.jsx missing email regex validation', 'pending');
      }, 3000);

      setTimeout(() => {
        addTimelineEvent('AI_FIX', '🛠️ AI Applied Fix', 'Restored email pattern check: /\\S+@\\S+\\.\\S+/', 'pass');
        clearBugs();
      }, 4500);

      setTimeout(() => {
        addTimelineEvent('KANE_VERIFY', '✅ KANE RE-RUN VERIFIED', '100% End-to-End Closed Loop Passed!', 'pass');
      }, 6000);
    }
  };

  const toggleChaosMode = () => {
    setChaosMode((prev) => {
      const next = !prev;
      addLog('CHAOS', next ? '⚠️ Chaos Mode ACTIVE: Classnames dynamically mutated.' : '✅ Chaos Mode OFF: Standard DOM restored.');
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

  // Subtotal calculation (accounts for activeBug simulation if active)
  const subtotal = cart.reduce((sum, item) => {
    const qtyMultiplier = activeBug === 'CART_CALCULATION' ? 1 : item.quantity;
    return sum + item.price * qtyMultiplier;
  }, 0);

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
        telemetryLogs,
        addLog,
        injectCartBug,
        injectCheckoutBug,
        clearBugs,
        triggerSelfHealingLoop,
        verificationTimeline
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
