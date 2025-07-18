import { useEffect } from 'react';
import { useGlobalStore } from '../store/useGlobalStore';

const useUniswapPrice = () => {
  const updateUsdPrice = useGlobalStore((state) => state.updateUsdPrice);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
        );
        const data = await response.json();
        const price = data.ethereum.usd;
        updateUsdPrice(price);
      } catch (error) {
        console.error('ETH price fetch error:', error.message);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 10000); // fetch every 10s
    return () => clearInterval(interval);
  }, [updateUsdPrice]);
};

export default useUniswapPrice;