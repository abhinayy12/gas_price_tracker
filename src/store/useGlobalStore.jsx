import { create } from 'zustand';

export const useGlobalStore = create((set, get) => ({
  // State
  mode: 'live',
  chains: {
    ethereum: { baseFee: 0, priorityFee: 0, history: [] },
    polygon: { baseFee: 0, priorityFee: 0, history: [] },
    arbitrum: { baseFee: 0, priorityFee: 0, history: [] },
  },
  usdPrice: 0,
  transactionGasLimit: 21000,

  // Setters
  setMode: (mode) => set({ mode }),

  updateGasData: (chain, baseFee, priorityFee) =>
    set((state) => ({
      chains: {
        ...state.chains,
        [chain]: {
          ...state.chains[chain],
          baseFee,
          priorityFee,
          history: [
            ...state.chains[chain].history.slice(-60),
            { baseFee, priorityFee, timestamp: Date.now() },
          ],
        },
      },
    })),

  updateUsdPrice: (usdPrice) => set({ usdPrice }),

  setTransactionGasLimit: (gasLimit) => set({ transactionGasLimit: gasLimit }),

  // ✅ Pure getters (use safely inside useEffect or event handlers)
  getGasData: () => {
    const state = get();
    const gasLimit = state.transactionGasLimit;
    const usd = state.usdPrice;

    const costPerChain = {};
    for (const [chain, { baseFee, priorityFee }] of Object.entries(state.chains)) {
      const cost = (baseFee + priorityFee) * gasLimit;
      costPerChain[chain] = {
        eth: cost,
        usd: cost * usd,
      };
    }
    return costPerChain;
  },

  getChains: () => get().chains,
}));