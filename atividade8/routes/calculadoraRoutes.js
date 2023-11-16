// calculadoraRoutes.js
const express = require('express');
const router = express.Router();
const calculadoraController = require('../controllers/calculadoraController');

router.get('/', (req, res) => {
  res.render('calculadora/formulario');
});

router.post('/calcular', (req, res) => {
  const { numA, numB, operacao } = req.body;
  const resultado = calculadoraController.realizarCalculo(numA, numB, operacao);
  res.render('calculadora/resultado', { resultado });
});

module.exports = router;
