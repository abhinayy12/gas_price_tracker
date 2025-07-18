import { useEffect } from 'react';
import { JsonRpcProvider, formatUnits } from 'ethers';
import { useGlobalStore } from '../store/useGlobalStore';

const RPC_HTTP = {
  ethereum: 'https://ethereum.publicnode.com',
  polygon: 'https://polygon-bor.publicnode.com',
  arbitrum: 'https://arbitrum-one.publicnode.com',
};

export const useGasEngine = () => {
  const updateGasData = useGlobalStore((state) => state.updateGasData);

  useEffect(() => {
    const providers = {
      ethereum: new JsonRpcProvider(RPC_HTTP.ethereum),
      polygon: new JsonRpcProvider(RPC_HTTP.polygon),
      arbitrum: new JsonRpcProvider(RPC_HTTP.arbitrum),
    };

    const fetchGas = async (chain, provider) => {
      try {
        if (chain === 'ethereum') {
          const block = await provider.getBlock('latest');
          const baseFee = block.baseFeePerGas ? parseFloat(formatUnits(block.baseFeePerGas, 'gwei')) : 0;
          updateGasData(chain, baseFee, 2);
        } else {
          const fee = await provider.getFeeData();
          const baseFee = fee.gasPrice ? parseFloat(formatUnits(fee.gasPrice, 'gwei')) : 0;
          updateGasData(chain, baseFee, 1.5);
        }
      } catch (err) {
        console.error(`${chain} gas fetch error`, err.message);
      }
    };

    const interval = setInterval(() => {
      Object.entries(providers).forEach(([chain, provider]) => {
        fetchGas(chain, provider);
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [updateGasData]);
};