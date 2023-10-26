// Função para imprimir uma matriz
function imprimirMatriz(matriz) {
  for (let i = 0; i < matriz.length; i++) {
    let linha = '';
    for (let j = 0; j < matriz[i].length; j++) {
      linha += matriz[i][j] + ' ';
    }
    console.log(linha);
  }
}

// Função para calcular a transposta de uma matriz
function matrizTransposta(matriz) {
  const linhas = matriz.length;
  const colunas = matriz[0].length;

  const transposta = [];

  for (let i = 0; i < colunas; i++) {
    transposta[i] = [];
    for (let j = 0; j < linhas; j++) {
      transposta[i][j] = matriz[j][i];
    }
  }

  return transposta;
}

// Exemplo de uma matriz A
const matrizA = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

console.log("Matriz A:");
imprimirMatriz(matrizA);

const transpostaA = matrizTransposta(matrizA);

console.log("\nMatriz Transposta de A:");
imprimirMatriz(transpostaA);
