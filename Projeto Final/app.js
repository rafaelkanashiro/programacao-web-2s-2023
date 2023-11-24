const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = new sqlite3.Database('database.sqlite');

function criarTabelas() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        senha TEXT NOT NULL
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS produtos_transacoes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        descricao TEXT,
        preco REAL NOT NULL,
        usuario_id INTEGER NOT NULL,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
      )
    `);
  });
}

criarTabelas();

app.get('/', (req, res) => {
  res.send('Bem-vindo à minha aplicação!');
});

app.post('/cadastrar-usuario', (req, res) => {
  const { nome, email, senha } = req.body;

  const stmt = db.prepare('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)');
  stmt.run(nome, email, senha);
  stmt.finalize();

  res.send('Usuário cadastrado com sucesso!');
});

app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  db.get('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, senha], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Erro interno no servidor');
      return;
    }

    if (row) {
      res.send('Login bem-sucedido!');
    } else {
      res.status(401).send('Credenciais inválidas');
    }
  });
});

app.put('/atualizar-usuario/:id', (req, res) => {
  const { nome, email, senha } = req.body;
  const usuarioId = req.params.id;

  const stmt = db.prepare('UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?');
  stmt.run(nome, email, senha, usuarioId);
  stmt.finalize();

  res.send('Cadastro do usuário atualizado com sucesso!');
});

app.post('/cadastrar-produto', (req, res) => {
  const { nome, descricao, preco, usuario_id } = req.body;

  const stmt = db.prepare('INSERT INTO produtos_transacoes (nome, descricao, preco, usuario_id) VALUES (?, ?, ?, ?)');
  stmt.run(nome, descricao, preco, usuario_id);
  stmt.finalize();

  res.send('Produto/Transação cadastrado com sucesso!');
});

app.get('/listar-produtos', (req, res) => {
  db.all('SELECT * FROM produtos_transacoes', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Erro interno no servidor');
      return;
    }

    res.json(rows);
  });
});

app.put('/editar-produto/:id', (req, res) => {
  const { nome, descricao, preco } = req.body;
  const produtoId = req.params.id;

  const stmt = db.prepare('UPDATE produtos_transacoes SET nome = ?, descricao = ?, preco = ? WHERE id = ?');
  stmt.run(nome, descricao, preco, produtoId);
  stmt.finalize();

  res.send('Produto/Transação atualizado com sucesso!');
});

app.delete('/excluir-produto/:id', (req, res) => {
  const produtoId = req.params.id;

  const stmt = db.prepare('DELETE FROM produtos_transacoes WHERE id = ?');
  stmt.run(produtoId);
  stmt.finalize();

  res.send('Produto/Transação excluído com sucesso!');
});

module.exports = app;