# Promise

As Promises são um recurso essencial em JavaScript para lidar com operações assíncronas. Elas representam um valor que pode não estar disponível imediatamente, mas estará no futuro, ou talvez nunca. As Promises têm três estados: pending (pendente), fulfilled (cumprida) e rejected (rejeitada).

## Descrição

As Promises são usadas para operações assíncronas, como buscar dados em um servidor, executar código em segundo plano ou realizar operações que podem demorar. Elas permitem lidar com o fluxo de controle de forma mais legível e manutenível do que os callbacks encadeados.

## Exemplo

```javascript
// Exemplo de criação de uma Promise para simular uma operação assíncrona
const promiseAssíncrona = new Promise((resolve, reject) => {
  setTimeout(() => {
    const sucesso = true;
    if (sucesso) {
      resolve('Operação bem-sucedida');
    } else {
      reject('Algo deu errado');
    }
  }, 2000); // Simulando uma operação que leva 2 segundos
});

// Utilizando a Promise
promiseAssíncrona
  .then((resultado) => {
    console.log('Resultado:', resultado);
  })
  .catch((erro) => {
    console.error('Erro:', erro);
  });

// Saída depende do resultado da Promise após 2 segundos
