// Função para verificar se a multiplicação de matrizes é possível
function multiplicacaoMatrizesEhPossivel(matrizA, matrizB) {
  const colunasA = matrizA[0].length;
  const linhasB = matrizB.length;
  return colunasA === linhasB;
}

// Função para multiplicar matrizes
function multiplicacaoMatrizes(matrizA, matrizB) {
  if (!multiplicacaoMatrizesEhPossivel(matrizA, matrizB)) {
    return "Não é possível calcular";
  }

  const linhasA = matrizA.length;
  const colunasA = matrizA[0].length;
  const colunasB = matrizB[0].length;

  const resultado = [];

  for (let i = 0; i < linhasA; i++) {
    resultado[i] = [];
    for (let j = 0; j < colunasB; j++) {
      resultado[i][j] = 0;
      for (let k = 0; k < colunasA; k++) {
        resultado[i][j] += matrizA[i][k] * matrizB[k][j];
      }
    }
  }

  return resultado;
}

// Função para ler uma matriz do usuário de forma intuitiva
function lerMatrizIntuitiva(linhas, colunas) {
  const matriz = [];
  console.log(`Digite os elementos da matriz (${linhas}x${colunas}):`);
  for (let i = 0; i < linhas; i++) {
    matriz[i] = [];
    for (let j = 0; j < colunas; j++) {
      matriz[i][j] = parseFloat(prompt(`Elemento na posição [${i+1}][${j+1}]:`));
    }
  }
  return matriz;
}

// Função para imprimir uma matriz de forma intuitiva
function imprimirMatrizIntuitiva(matriz) {
  console.log("Matriz Resultado:");
  for (let i = 0; i < matriz.length; i++) {
    let linha = '';
    for (let j = 0; j < matriz[i].length; j++) {
      linha += matriz[i][j] + '\t'; // Usar uma tabulação para alinhar as colunas
    }
    console.log(linha);
  }
}

// Leitura das dimensões das matrizes A e B
const linhasA = parseInt(prompt("Digite o número de linhas da matriz A:"));
const colunasA = parseInt(prompt("Digite o número de colunas da matriz A:"));
const linhasB = parseInt(prompt("Digite o número de linhas da matriz B:"));
const colunasB = parseInt(prompt("Digite o número de colunas da matriz B:"));

// Leitura das matrizes A e B
const matrizA = lerMatrizIntuitiva(linhasA, colunasA);
const matrizB = lerMatrizIntuitiva(linhasB, colunasB);

if (multiplicacaoMatrizesEhPossivel(matrizA, matrizB)) {
  const matrizC = multiplicacaoMatrizes(matrizA, matrizB);
  imprimirMatrizIntuitiva(matrizC);
} else {
  console.log("Não é possível calcular a multiplicação das matrizes A e B.");
}
