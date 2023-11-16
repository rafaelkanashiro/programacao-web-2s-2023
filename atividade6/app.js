const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { format } = require('date-fns');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/dados', (req, res) => {
  const { nome, endereco, telefone, dataAgendamento } = req.body;

  const dataLocal = new Date(dataAgendamento + 'T00:00:00');
  const formattedData = format(dataLocal, 'dd/MM/yyyy');

  const dadosHtml = `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Dados Recebidos</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    
    <body>
      <div class="container mt-5">
        <h1>Dados Recebidos</h1>
        <p>Nome: ${nome}</p>
        <p>Endereço: ${endereco}</p>
        <p>Telefone: ${telefone}</p>
        <p>Data de Agendamento: ${formattedData}</p>
      </div>
    </body>
    
    </html>
  `;
  res.send(dadosHtml);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
