// controllers/calculadoraController.js

const realizarCalculo = (numA, numB, operacao) => {
    numA = parseFloat(numA);
    numB = parseFloat(numB);
  
    switch (operacao) {
      case '+':
        return numA + numB;
      case '-':
        return numA - numB;
      case '*':
        return numA * numB;
      case '/':
        return numA / numB;
      default:
        return 'Operação inválida';
    }
  };
  
  module.exports = { realizarCalculo };
  