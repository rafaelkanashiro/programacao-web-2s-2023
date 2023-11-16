const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let estoque = [];

app.get('/', (req, res) => {
  res.send('Bem-vindo à aplicação de gerenciamento de estoque!');
});

app.get('/api/estoque/cadastrar/:id/:nome/:qtd', (req, res) => {
  const { id, nome, qtd } = req.params;
  const item = { id, nome, qtd };
  estoque.push(item);
  res.send('Item cadastrado no estoque');
});

app.get('/api/estoque/listar', (req, res) => {
  res.json(estoque);
});

app.get('/api/estoque/editar/:id/:qtd', (req, res) => {
  const { id, qtd } = req.params;
  const item = estoque.find(item => item.id === id);
  if (item) {
    item.qtd = qtd;
    res.send('Quantidade do item editada no estoque');
  } else {
    res.status(404).send('Item não encontrado');
  }
});

app.get('/api/estoque/remover/:id', (req, res) => {
  const { id } = req.params;
  estoque = estoque.filter(item => item.id !== id);
  res.send('Item removido do estoque');
});

app.use((req, res) => {
  res.status(404).send('Rota não encontrada');
});

app.listen(port, () => {
  console.log(`Aplicação de gerenciamento de estoque rodando em http://localhost:${port}`);
});
