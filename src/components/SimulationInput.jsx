// src/components/SimulationInput.jsx
import { useState } from 'react';
import { useGlobalStore } from '../store/useGlobalStore';

function SimulationInput() {
  const [value, setValue] = useState('');
  const setMode = useGlobalStore((state) => state.setMode);
  const setSimulationValue = useGlobalStore((state) => state.setSimulationValue);

  const handleChange = (e) => {
    const input = e.target.value;
    setValue(input);

    const numeric = parseFloat(input);
    if (!isNaN(numeric) && numeric > 0) {
      setMode('simulation');
      setSimulationValue(numeric); // in ETH
    } else {
      setMode('live');
      setSimulationValue(0);
    }
  };

  return (
    <div className="widget">
      <h2>Simulate Transaction</h2>
      <input
        type="number"
        placeholder="Enter ETH amount (e.g. 0.5)"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default SimulationInput;