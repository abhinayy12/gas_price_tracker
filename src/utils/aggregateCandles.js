export function aggregateToCandles(data, interval = 15 * 60 * 1000) {
    if (!data.length) return [];
  
    const grouped = {};
  
    for (const point of data) {
      const { time, baseFee, priorityFee } = point;
      const timestamp = Math.floor(time / interval) * interval;
      const value = (baseFee + priorityFee) / 1e9; // in Gwei
  
      if (!grouped[timestamp]) {
        grouped[timestamp] = { values: [], time: timestamp };
      }
  
      grouped[timestamp].values.push(value);
    }
  
    return Object.values(grouped).map(({ values, time }) => ({
      time: Math.floor(time / 1000),
      open: values[0],
      high: Math.max(...values),
      low: Math.min(...values),
      close: values[values.length - 1],
    }));
  }  