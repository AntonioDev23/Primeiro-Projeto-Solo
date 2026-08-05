// =====================================================
// IMPORTAÇÃO DO EXPRESS
// =====================================================

// Importa apenas o sistema de rotas do Express.
// Não cria um novo servidor, apenas um organizador de rotas.

const express = require("express");



// =====================================================
// CRIAÇÃO DO ROUTER
// =====================================================

// O Router funciona como uma "mini aplicação".
// Ele serve para organizar as rotas relacionadas aos produtos.

const router = express.Router();



// =====================================================
// IMPORTAÇÃO DO CONTROLLER
// =====================================================

// Importa as funções responsáveis por executar a lógica.

const produtoController = require("../controllers/produtoController");



// =====================================================
// ROTAS DE PRODUTOS
// =====================================================

// Quando alguém fizer:
//
// GET /produtos
//
// Esta rota chamará a função listarProdutos()
// que está no Controller.

router.get("/produtos", produtoController.listarProdutos);

// Quando alguém fizer:
//
// POST /produtos
//
// Esta rota chamará a função criarProduto()
// que está no Controller.

router.post("/produtos", produtoController.criarProduto);



// =====================================================
// EXPORTAÇÃO DAS ROTAS
// =====================================================

// Disponibiliza este conjunto de rotas para o server.js.

module.exports = router;