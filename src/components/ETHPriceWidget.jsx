import { useGlobalStore } from '../store/useGlobalStore';

function ETHPriceWidget() {
  const usdPrice = useGlobalStore((state) => state.usdPrice);

  return (
    <div className="widget">
      <h2>ETH/USD Price</h2>
      <p>${usdPrice.toFixed(2)}</p>
    </div>
  );
}

export default ETHPriceWidget;