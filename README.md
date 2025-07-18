#  Real-Time Cross-Chain Gas Price Tracker with Wallet Simulation

A responsive web dashboard that tracks **live gas prices** from Ethereum, Polygon, and Arbitrum, simulates transaction costs in **real-time USD**, and visualizes gas volatility via **candlestick charts**. Built using **React**, **Zustand**, **Ethers.js**, and **Lightweight Charts**.

---

##  Features

-  **Live Gas Price Tracker**  
  Uses native WebSocket RPCs to fetch `baseFeePerGas` and `priorityFee` every 6 seconds from:
  - Ethereum
  - Polygon
  - Arbitrum

-  **USD Transaction Cost Simulation**  
  Enter ETH/MATIC amount to:
  - Simulate the **gas + transaction cost**
  - Compare across all three chains in USD
  - Uses real-time ETH/USD from **Uniswap V3** `Swap` events

-  **Candlestick Chart**  
  Visualizes **15-minute gas price volatility** using:
  - `lightweight-charts`
  - Zustand state history
  - Interactive tooltips and zoom

-   **State Machine (Zustand)**  
  Toggle between:
  - **Live mode** – automatic real-time updates
  - **Simulation mode** – user inputs and manual comparison

---

##  Tech Stack

- **Frontend:** React + Vite
- **State Management:** Zustand
- **Blockchain Access:** Ethers.js (WebSocketProvider)
- **Charting:** Lightweight Charts
- **Deployment:** GitHub Pages

---

##  Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/your-username/gas_price_tracker.git
cd gas_price_tracker

### 2. Install dependencies
npm install

### 3. Run the app locally
npm run dev

The app will be live at http://localhost:5173


## Deployment (GitHub Pages)

### 1. Build the project
npm run build

### 2. Deploy to GitHub Pages
npm run deploy

Ensure vite.config.js has: base: '/gas_price_tracker/'

### 3. Access your app

https://abhinayy12.github.io/gas_price_tracker/


##  Folder Structure

src/
│
├── components/
│   ├── GasPriceWidget.jsx
│   ├── TransactionCostWidget.jsx
│   ├── ETHPriceWidget.jsx
│   ├── CandlestickChart.jsx
|   └── SimulationInput.jsx
│
├── hooks/
│   ├── useGasEngine.jsx
│   └── useUniswapPrice.jsx
│
├── store/
│   └── useGlobalStore.jsx
|
├── utils/
│   └── aggregrateCandles.js
│
├── App.jsx
├── main.jsx
└── App.css 


##  Formula Reference

ETH/USD (from sqrtPriceX96)
price = (sqrtPriceX96 ** 2 * 10 ** 12) / (2 ** 192)

USD Gas Cost Calculation
costUSD = (baseFee + priorityFee) * gasLimit * ethUsdPrice


##   Author

Made by Abhinay Mesipogu