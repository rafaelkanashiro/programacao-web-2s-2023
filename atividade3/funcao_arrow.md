# Função Arrow

As funções de seta, também conhecidas como arrow functions, são uma maneira concisa de escrever funções em JavaScript. Elas fornecem uma sintaxe mais curta e geralmente são usadas para funções anônimas. As funções de seta têm a sintaxe `(parâmetros) => expressão`.

## Descrição

As funções de seta são úteis quando você deseja uma função rápida e simples, geralmente usada em callbacks ou em situações em que a função é usada apenas uma vez.

## Exemplo

```javascript
// Função de seta para somar dois números
const somar = (a, b) => a + b;

console.log(somar(5, 3)); // Saída: 8

// Função de seta para verificar se um número é par
const ehPar = (num) => num % 2 === 0;

console.log(ehPar(4)); // Saída: true
console.log(ehPar(7)); // Saída: false
