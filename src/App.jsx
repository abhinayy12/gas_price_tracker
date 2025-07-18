import './App.css';
import ETHPriceWidget from './components/ETHPriceWidget';
import GasPriceWidget from './components/GasPriceWidget';
import TransactionCostWidget from './components/TransactionCostWidget';
import CandlestickChart from './components/CandlestickChart';
import { useGasEngine } from './hooks/useGasEngine';
import  useUniswapPrice  from './hooks/useUniswapPrice';
import SimulationInput from './components/SimulationInput';

function App() {
  useGasEngine();
  useUniswapPrice();

  return (
    <div className="app container">
      <h1>Real-Time Ethereum Gas Tracker</h1>
      <div className="widgets">
        <SimulationInput />
        <ETHPriceWidget />
        <GasPriceWidget />
        <TransactionCostWidget />
      </div>
      <CandlestickChart />
    </div>
  );
}

export default App;