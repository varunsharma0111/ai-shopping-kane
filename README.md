# 🤖 AI Self-Healing Shopping App (Powered by Kane CLI)

[![React 19](https://img.shields.io/badge/React-19.2-61dafb.svg?style=flat&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646cff.svg?style=flat&logo=vite)](https://vitejs.dev/)
[![Kane CLI](https://img.shields.io/badge/Kane--CLI-v0.8.4-purple.svg)](https://www.testmuai.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Kane CLI Hackathon Entry** — A modern, state-of-the-art e-commerce storefront engineered specifically to demonstrate **AI-driven self-healing test automation**, **selector drift recovery**, and an **autonomous AI code verification loop**.

---

## 🌟 Key Hackathon Highlights

1. **🔄 Closed-Loop Verification (`FAIL` ➔ `FIX` ➔ `PASS`)**
   - Demonstrates a full autonomous feedback loop: Kane CLI catches a quantity calculation bug (`❌ FAILED`), reports the root cause, the AI fixes `CartContext.jsx`, and Kane re-verifies (`✅ PASSED`).

2. **⚡ Chaos Mode (Selector Drift Simulator)**
   - Includes a **"Simulate Selector Drift"** toggle (`data-testid="chaos-toggle"`) that dynamically mutates visual CSS class names across components. Kane CLI's self-healing agent continues to identify nodes seamlessly using `data-testid` and visual heuristics.

3. **📊 Live AI Verification Dashboard & Telemetry Inspector**
   - Built-in widget displaying real-time AI loop status, active DOM event logs, and targetability metrics.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Clone repository
git clone https://github.com/varunsharma0111/ai-shopping-kane.git
cd ai-shopping-kane

# 2. Install dependencies
npm install

# 3. Start local development server (Port 5173)
npm run dev
```

---

## 🧪 Running Kane CLI Automation

Make sure `npm run dev` is active on `http://localhost:5173`.

### 1. Replay Test Spec (`testmd`)
```bash
kane-cli testmd run tests/shopping_flow_test.md
```

### 2. Autonomous E2E Shopping Flow
```bash
kane-cli run "Open http://localhost:5173, click add-to-cart on the first product, click cart-button, click quantity-increase to set quantity to 2, verify cart-total is 599.98, click checkout-button, fill customer-name 'Varun Sharma', customer-email 'varun@example.com', customer-address '123 Hackathon Way', click place-order, and verify order-confirmation is displayed"
```

### 3. Run Autonomous Verification Loop Script
```bash
node scripts/autonomous-loop.js
```

---

## 🏗️ Technical Architecture

- **Frontend:** React 19, Vite, Vanilla CSS (Glassmorphism design system)
- **State Management:** React `CartContext` with live event telemetry logger
- **Testing Infrastructure:** `data-testid` matrix (`product-card`, `add-to-cart`, `cart-button`, `quantity-increase`, `checkout-button`, `customer-name`, `place-order`, `order-confirmation`, `chaos-toggle`)

---

## 📄 License

MIT © 2026 Varun Sharma — Developed for the Kane CLI Hackathon.
