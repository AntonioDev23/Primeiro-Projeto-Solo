
// Importa o Express
const express = require("express");

// Cria o gerenciador de rotas
const router = express.Router();

// Importa o controller do carrinho
const carrinhoController = require("../controllers/carrinhoController");

// Adiciona um produto ao carrinho
router.post(
    "/carrinho",
    carrinhoController.adicionarAoCarrinho
);

// Lista o carrinho de um usuário
router.get(
    "/carrinho/:usuarioId",
    carrinhoController.listarCarrinho
);

// Exporta as rotas
module.exports = router;