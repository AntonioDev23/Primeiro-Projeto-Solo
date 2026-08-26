
// Importa o Express
const express = require("express");

// Cria o gerenciador de rotas
const router = express.Router();

// Importa o controller do carrinho
const carrinhoController = require("../controllers/carrinhoController");


// ==========================================
// ADICIONAR AO CARRINHO
// ==========================================

router.post(
    "/carrinho",
    carrinhoController.adicionarAoCarrinho
);


// ==========================================
// LISTAR CARRINHO
// ==========================================

router.get(
    "/carrinho/:usuarioId",
    carrinhoController.listarCarrinho
);


// ==========================================
// ATUALIZAR QUANTIDADE
// ==========================================

router.put(
    "/carrinho/item/:itemId",
    carrinhoController.atualizarQuantidade
);


// ==========================================
// REMOVER ITEM
// ==========================================

router.delete(
    "/carrinho/item/:itemId",
    carrinhoController.removerDoCarrinho
);


// Exporta as rotas
module.exports = router;