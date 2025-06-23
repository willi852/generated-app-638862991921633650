import React, { useState, useEffect } from 'react';
import Calculator from './components/Calculator';
import ScientificFunctions from './components/ScientificFunctions';
import './styles/App.css';

function App() {
  const [result, setResult] = useState('0');
  const [expression, setExpression] = useState('');
  const [scientificFunctions, setScientificFunctions] = useState([]);
  const [constants, setConstants] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFunctionsAndConstants = async () => {
      try {
        const response = await fetch('/api/calculator/constants');
        const data = await response.json();
        setScientificFunctions(data.functions);
        setConstants(data.constants);
      } catch (err) {
        setError('Failed to load scientific functions and constants');
        console.error('Error fetching functions:', err);
      }
    };

    fetchFunctionsAndConstants();
  }, []);

  const calculateResult = async () => {
    try {
      const response = await fetch('/api/calculator/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expression }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unknown error');
      }

      setResult(data.result.toString());
    } catch (err) {
      setError(err.message);
      setResult('Error');
    }
  };

  const handleButtonClick = (value) => {
    setError(null);
    
    if (value === '=') {
      calculateResult();
    } else if (value === 'C') {
      setExpression('');
      setResult('0');
    } else if (value === 'DEL') {
      setExpression(prev => prev.slice(0, -1));
    } else {
      setExpression(prev => prev + value);
    }
  };

  return (
    <div className="app">
      <h1>Scientific Calculator</h1>
      <div className="calculator-container">
        <div className="display">
          <div className="expression">{expression || '0'}</div>
          <div className="result">{result}</div>
          {error && <div className="error">{error}</div>}
        </div>
        <ScientificFunctions 
          functions={scientificFunctions} 
          constants={constants} 
          onSelect={handleButtonClick} 
        />
        <Calculator 
          onButtonClick={handleButtonClick} 
        />
      </div>
    </div>
  );
}

export default App;