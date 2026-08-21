import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export const VerificationDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('timeline'); // 'timeline' | 'actions'
  const {
    activeBug,
    injectCartBug,
    injectCheckoutBug,
    clearBugs,
    triggerSelfHealingLoop,
    verificationTimeline
  } = useCart();

  const getStatusBadge = () => {
    if (!activeBug) return { text: 'VERIFIED ✅', color: 'badge-pass' };
    return { text: 'REGRESSION FAIL ❌', color: 'badge-fail' };
  };

  const status = getStatusBadge();

  return (
    <div
      className={`verification-dashboard-widget ${isOpen ? 'open' : 'closed'}`}
      data-testid="verification-dashboard"
    >
      <div className="v-widget-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="v-widget-title">
          <span className="v-icon">🏆</span>
          <div>
            <strong>Kane AI Closed-Loop Engine</strong>
            <span className={`v-status-pill ${status.color}`}>{status.text}</span>
          </div>
        </div>
        <button className="v-toggle-btn" aria-label="Toggle Dashboard">
          {isOpen ? 'Minimize ▲' : 'Open Dashboard ▼'}
        </button>
      </div>

      {isOpen && (
        <div className="v-widget-content">
          {/* Navigation Tabs */}
          <div className="v-tab-bar">
            <button
              className={`v-tab-btn ${activeTab === 'timeline' ? 'active' : ''}`}
              onClick={() => setActiveTab('timeline')}
            >
              ⏱️ Verification Timeline
            </button>
            <button
              className={`v-tab-btn ${activeTab === 'actions' ? 'active' : ''}`}
              onClick={() => setActiveTab('actions')}
            >
              ⚡ Interactive Controls
            </button>
          </div>

          {activeTab === 'timeline' && (
            <div className="v-timeline-container">
              <div className="v-timeline-header">
                <span>LIVE CLOSED-LOOP AGENT TELEMETRY</span>
                <span className="v-timeline-count">{verificationTimeline.length} Events</span>
              </div>

              <div className="v-timeline-list">
                {verificationTimeline.map((item) => (
                  <div key={item.id} className={`v-timeline-card ${item.status}`}>
                    <div className="v-card-top">
                      <span className="v-time">[{item.time}]</span>
                      <span className={`v-phase-pill ${item.status}`}>{item.phase}</span>
                    </div>
                    <div className="v-card-title">{item.title}</div>
                    <div className="v-card-desc">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'actions' && (
            <div className="v-actions-panel">
              <p className="v-actions-intro">
                Simulate real code regressions to trigger Kane CLI verification failure & autonomous AI repair:
              </p>

              <div className="v-button-group">
                <button
                  className={`v-action-btn ${activeBug === 'CART_CALCULATION' ? 'active-bug' : ''}`}
                  onClick={() => triggerSelfHealingLoop('CART_CALCULATION')}
                >
                  🧪 <strong>Bug #1: Cart Quantity Regress</strong>
                  <span>Simulates subtotal calculation bug (item.price * 1)</span>
                </button>

                <button
                  className={`v-action-btn ${activeBug === 'CHECKOUT_VALIDATION' ? 'active-bug' : ''}`}
                  onClick={() => triggerSelfHealingLoop('CHECKOUT_VALIDATION')}
                >
                  🧪 <strong>Bug #2: Email Validation Regress</strong>
                  <span>Simulates bypassed checkout email format validation</span>
                </button>

                <button
                  className="v-action-btn fix-btn"
                  onClick={clearBugs}
                >
                  ✅ <strong>Restore Healthy Codebase</strong>
                  <span>Clear active regressions & set status to PASS</span>
                </button>
              </div>

              {activeBug && (
                <div className="v-diagnostic-box">
                  <div className="v-diag-header">⚠️ ACTIVE REGRESSION DETECTED</div>
                  <div className="v-diag-body">
                    {activeBug === 'CART_CALCULATION' ? (
                      <>
                        <p><strong>File:</strong> <code>src/context/CartContext.jsx</code></p>
                        <p><strong>Expected:</strong> Cart total = $599.98 (Qty 2 × $299.99)</p>
                        <p><strong>Actual:</strong> Cart total = $299.99 (Base unit price)</p>
                      </>
                    ) : (
                      <>
                        <p><strong>File:</strong> <code>src/components/CheckoutModal.jsx</code></p>
                        <p><strong>Expected:</strong> ❌ Email validation error displayed</p>
                        <p><strong>Actual:</strong> ✓ Order submitted with invalid email format</p>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

