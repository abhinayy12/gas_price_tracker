import create from 'zustand'

export const useGlobalStore = create((set) => ({
  mode: 'live',
  chains: {
    ethereum: { baseFee: 0, priorityFee: 0, history: [] },
    polygon: { baseFee: 0, priorityFee: 0, history: [] },
    arbitrum: { baseFee: 0, priorityFee: 0, history: [] },
  },
  usdPrice: 0,
  transactionInput: null,
  setMode: (mode) => set({ mode }),
  updateGas: (chain, baseFee, priorityFee) => set((state) => ({
    chains: {
      ...state.chains,
      [chain]: {
        ...state.chains[chain],
        baseFee,
        priorityFee,
        history: [...state.chains[chain].history, { baseFee, priorityFee, timestamp: Date.now() }]
      }
    }
  })),
  updateUSDPrice: (usdPrice) => set({ usdPrice }),
}))
