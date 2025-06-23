import React from 'react';
import '../styles/ScientificFunctions.css';

const ScientificFunctions = ({ functions, constants, onSelect }) => {
  return (
    <div className="scientific-functions">
      <h3>Functions</h3>
      <div className="functions-grid">
        {functions.map((func) => (
          <button 
            key={func.name} 
            onClick={() => onSelect(`${func.name}(`) }
            className="sci-button"
          >
            {func.name}
          </button>
        ))}
      </div>

      <h3>Constants</h3>
      <div className="constants-grid">
        {constants.map((constant) => (
          <button 
            key={constant.name} 
            onClick={() => onSelect(constant.value) }
            className="sci-button"
          >
            {constant.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScientificFunctions;