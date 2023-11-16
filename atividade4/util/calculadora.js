// util/calculadora.js

module.exports = {
  somar: (a, b) => a + b,
  subtrair: (a, b) => a - b,
  multiplicar: (a, b) => a * b,
  dividir: (a, b) => (b !== 0 ? a / b : 'Erro: divisão por zero'),
};
