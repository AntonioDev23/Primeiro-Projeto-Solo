// Importa o Express
const express = require("express");

// Cria o gerenciador de rotas
const router = express.Router();

// Importa o controller de produtos
const produtoController = require("../controllers/produtoController");

// Lista todos os produtos
router.get("/produtos", produtoController.listarProdutos);
// Cadastra um novo produto
router.post("/produtos", produtoController.criarProduto);
// Atualiza um produto pelo ID
router.put("/produtos/:id", produtoController.atualizarProduto);
// Remove um produto pelo ID
router.delete("/produtos/:id", produtoController.deletarProduto);

// Exporta as rotas
module.exports = router;