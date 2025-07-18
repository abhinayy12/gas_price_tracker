import { useGlobalStore } from '../store/useGlobalStore';

function GasPriceWidget() {
  const chains = useGlobalStore((state) => state.chains);

  return (
    <div className="widget">
      <h2>Gas Prices (Base + Priority Fee)</h2>
      {Object.entries(chains).map(([chain, { baseFee, priorityFee }]) => (
        <p key={chain}>
          {chain.toUpperCase()}: {baseFee.toFixed(2)} + {priorityFee.toFixed(2)} gwei
        </p>
      ))}
    </div>
  );
}

export default GasPriceWidget;