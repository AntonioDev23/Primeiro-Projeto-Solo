// Importa o array de produtos
const produtos = require("../models/produto");

// Lista todos os produtos
function listarProdutos(req, res) {
    res.json(produtos); // Envia os produtos em JSON
}

// Cadastra um novo produto
function criarProduto(req, res) {
    const novoProduto = req.body; // Dados enviados pelo cliente

    produtos.push(novoProduto); // Adiciona ao array

    res.send("Produto cadastrado com sucesso!"); // Confirma o cadastro
}

// Exporta as funções do controller
module.exports = {
    listarProdutos,
    criarProduto
};