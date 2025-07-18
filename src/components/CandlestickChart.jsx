import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import { useGlobalStore } from '../store/useGlobalStore';
import { aggregateToCandles } from '../utils/aggregateCandles';

const CandlestickChart = () => {
  const chartRef = useRef();
  const history = useGlobalStore((s) => s.chains.ethereum.history); // can switch to polygon/arbitrum
  const mode = useGlobalStore((s) => s.mode);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = createChart(chartRef.current, {
      width: 700,
      height: 350,
      layout: {
        background: { color: '#fff' },
        textColor: '#000',
      },
      grid: {
        vertLines: { color: '#eee' },
        horzLines: { color: '#eee' },
      },
    });

    const candleSeries = chart.addCandlestickSeries();
    const candles = aggregateToCandles(history);

    candleSeries.setData(candles);

    const interval = setInterval(() => {
      const updatedCandles = aggregateToCandles(useGlobalStore.getState().chains.ethereum.history);
      candleSeries.setData(updatedCandles);
    }, 10000); // refresh every 10s

    return () => {
      clearInterval(interval);
      chart.remove();
    };
  }, [history, mode]);

  return <div className="chart-container" ref={chartRef} />;
};

export default CandlestickChart;