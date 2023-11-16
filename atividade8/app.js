// app.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const calculadoraRoutes = require('./routes/calculadoraRoutes');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('node_modules/bootstrap/dist'));

app.use('/', calculadoraRoutes);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
