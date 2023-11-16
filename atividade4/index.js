// index.js
const express = require('express');
const calculadora = require('./util/calculadora');

const app = express();
const PORT = 3000;

app.get('/somar/:a/:b', (req, res) => {
  const { a, b } = req.params;
  res.send(`Resultado: ${calculadora.somar(parseFloat(a), parseFloat(b))}`);
});

app.get('/subtrair/:a/:b', (req, res) => {
  const { a, b } = req.params;
  res.send(`Resultado: ${calculadora.subtrair(parseFloat(a), parseFloat(b))}`);
});

app.get('/multiplicar/:a/:b', (req, res) => {
  const { a, b } = req.params;
  res.send(`Resultado: ${calculadora.multiplicar(parseFloat(a), parseFloat(b))}`);
});

app.get('/dividir/:a/:b', (req, res) => {
  const { a, b } = req.params;
  res.send(`Resultado: ${calculadora.dividir(parseFloat(a), parseFloat(b))}`);
});

// Adicione uma rota padrão para evitar o erro "Cannot GET /"
app.get('/', (req, res) => {
  res.send('Bem-vindo à aplicação de calculadora!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
