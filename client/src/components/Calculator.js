import React from 'react';
import '../styles/Calculator.css';

const Calculator = ({ onButtonClick }) => {
  const buttons = [
    '7', '8', '9', '/', 'C',
    '4', '5', '6', '*', 'DEL',
    '1', '2', '3', '-', '(',
    '0', '.', '=', '+', ')'
  ];

  return (
    <div className="calculator">
      {buttons.map((button) => (
        <button
          key={button}
          onClick={() => onButtonClick(button)}
          className={`calc-button ${button === '=' ? 'equals' : ''}`}
          data-testid={`button-${button}`}
        >
          {button}
        </button>
      ))}
    </div>
  );
};

export default Calculator;