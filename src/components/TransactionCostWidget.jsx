import React from 'react';
import { useGlobalStore } from '../store/useGlobalStore';

const TransactionCostWidget = () => {
  const chains = useGlobalStore((state) => state.chains);
  const usdPrice = useGlobalStore((state) => state.usdPrice);
  const gasLimit = useGlobalStore((state) => state.transactionGasLimit);

  const calculateCostUSD = (baseFee, priorityFee) => {
    // Convert gwei to ETH using 1e-9, then to USD
    const costInETH = (baseFee + priorityFee) * gasLimit * 1e-9;
    return (costInETH * usdPrice).toFixed(2);
  };

  return (
    <div className="widget">
      <h2>Transaction Cost</h2>
      <table>
        <thead>
          <tr>
            <th>Chain</th>
            <th>Cost (USD)</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(chains).map(([chain, data]) => (
            <tr key={chain}>
              <td>{chain.charAt(0).toUpperCase() + chain.slice(1)}</td>
              <td>${calculateCostUSD(data.baseFee, data.priorityFee)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionCostWidget;