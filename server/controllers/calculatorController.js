const express = require('express');
const math = require('mathjs');
const router = express.Router();

router.post('/calculate', (req, res) => {
  try {
    const { expression } = req.body;
    
    if (!expression) {
      return res.status(400).json({ error: 'Expression is required' });
    }

    // Security check - remove potentially dangerous functions
    const sanitizedExpression = expression.replace(/[a-zA-Z_$][a-zA-Z0-9_$]*/g, match => {
      return ['e', 'pi', 'sin', 'cos', 'tan', 'sqrt', 'log', 'ln'].includes(match) ? match : '';
    }).replace(/\s+/g, '');

    const result = math.evaluate(sanitizedExpression);
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: 'Invalid mathematical expression' });
  }
});

router.get('/constants', (req, res) => {
  res.json({
    constants: [
      { name: 'π', value: 'pi' },
      { name: 'e', value: 'e' }
    ],
    functions: [
      { name: 'sin', description: 'Sine function' },
      { name: 'cos', description: 'Cosine function' },
      { name: 'tan', description: 'Tangent function' },
      { name: 'sqrt', description: 'Square root' },
      { name: 'log', description: 'Logarithm (base 10)' },
      { name: 'ln', description: 'Natural logarithm' }
    ]
  });
});

module.exports = router;