const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const ejs = require('ejs');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração do motor de visualização EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

// Configurando a pasta 'public' para servir páginas estáticas
app.use(express.static(path.join(__dirname, 'public')));

// Conectar ao banco de dados SQLite3 (cria um novo banco se não existir)
const db = new sqlite3.Database('database.db');

// Criação da tabela de usuários (se não existir)
db.run(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT,
    senha TEXT
  )
`);

// Criação da tabela de produtos/transações (se não existir)
db.run(`
  CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    descricao TEXT,
    usuario_id INTEGER,
    FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
  )
`);

// Rota para a página de edição de produto/transação
app.get('/editar-produto/:id', (req, res) => {
  const produtoId = req.params.id;

  db.get('SELECT * FROM produtos WHERE id = ?', [produtoId], (err, produto) => {
    if (err || !produto) {
      console.error('Erro ao obter produto para edição:', err);
      return res.send('Erro ao obter produto para edição');
    }

    // Renderiza a página de edição com os dados do produto
    res.render('editar-produto', { produto });
  });
});

// Rota para processar a edição de produto/transação
app.post('/editar-produto/:id', (req, res) => {
  const { nome, descricao } = req.body;
  const produtoId = req.params.id;

  const stmt = db.prepare('UPDATE produtos SET nome = ?, descricao = ? WHERE id = ?');
  stmt.run(nome, descricao, produtoId);
  stmt.finalize();

  res.redirect('/listagem-produtos');
});

// Rota para processar a exclusão de produto/transação
app.post('/excluir-produto/:id', (req, res) => {
  const produtoId = req.params.id;

  const stmt = db.prepare('DELETE FROM produtos WHERE id = ?');
  stmt.run(produtoId);
  stmt.finalize();

  res.redirect('/listagem-produtos');
});

// Rota para a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para a página de cadastro de usuário
app.get('/cadastro-usuario', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cadastro-usuario.html'));
});

// Rota para cadastrar usuário
app.post('/cadastrar-usuario', (req, res) => {
  const { nome, email, senha } = req.body;

  // Insere o usuário no banco de dados
  db.run('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha], (err) => {
    if (err) {
      return res.send('Erro ao cadastrar usuário');
    }

    // Redireciona para a página de operações do usuário
    res.redirect('/operacoes-usuario');
  });
});

// Rota para a página de login
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Rota para efetuar login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  // Consulta o usuário no banco de dados
  db.get('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, senha], (err, user) => {
    if (err || !user) {
      // Se a autenticação falhar, redireciona de volta para a página de login
      return res.redirect('/login');
    }

    // Redireciona para a página de operações do usuário
    res.redirect('/operacoes-usuario');
  });
});

// Rota para a página de operações do usuário
app.get('/operacoes-usuario', (req, res) => {
  // Renderiza a página de operações do usuário
  res.render('operacoes-usuario');
});

// Rota para a página de cadastro de produto/transação
app.get('/cadastro-produto', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cadastro-produto.html'));
});

// Rota para cadastrar produto/transação
app.post('/cadastrar-produto', (req, res) => {
  const { nome, descricao } = req.body;

  // Obtém o ID do usuário fictício (pode ser obtido após o login)
  const usuarioId = 1;

  // Insere o produto no banco de dados
  db.run('INSERT INTO produtos (nome, descricao, usuario_id) VALUES (?, ?, ?)', [nome, descricao, usuarioId], (err) => {
    if (err) {
      return res.send('Erro ao cadastrar produto');
    }

    // Redireciona para a página de listagem de produtos/transações
    res.redirect('/listagem-produtos');
  });
});

// Rota para a página de listagem de produtos/transações
app.get('/listagem-produtos', (req, res) => {
  // Consulta todos os produtos no banco de dados
  db.all('SELECT * FROM produtos', (err, produtos) => {
    if (err) {
      return res.send('Erro ao obter lista de produtos');
    }

    // Renderiza a página de listagem com os produtos
    res.render('listagem-produtos', { produtos });
  });
});

// Rota para realizar logout
app.get('/logout', (req, res) => {
  // Lógica de logout (pode incluir destruição da sessão, se estiver usando sessões)
  // Redireciona para a página inicial após o logout
  res.redirect('/');
});

// Rota para a página de atualização do cadastro do usuário
app.get('/atualizar-usuario', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'atualizar-usuario.html'));
});

// Rota para processar a atualização do cadastro do usuário
app.post('/atualizar-usuario', (req, res) => {
  const { nome, email, senha } = req.body;

  // Obtém o ID do usuário fictício (pode ser obtido após o login)
  const usuarioId = 1;

  const stmt = db.prepare('UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?');
  stmt.run(nome, email, senha, usuarioId);
  stmt.finalize();

  res.redirect('/operacoes-usuario');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor iniciado em http://localhost:${port}`);
});
