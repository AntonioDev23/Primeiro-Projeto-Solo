// Importa o array de produtos
const produtos = require("../models/produto");

// Lista todos os produtos
function listarProdutos(req, res) {
    res.json(produtos); // Envia os produtos em JSON
}

// Cadastra um novo produto
function criarProduto(req, res) {

    console.log("ENTROU EM criarProduto");

    const novoProduto = req.body; // Dados enviados pelo cliente

    produtos.push(novoProduto); // Adiciona ao array

    res.send("Produto cadastrado com sucesso!");
}

// Atualiza um produto existente
function atualizarProduto(req, res) {

    const id = Number(req.params.id); // Pega o ID da URL

    const produto = produtos.find(
        produto => produto.id === id
    ); // Procura o produto pelo ID

    if (!produto) {
        return res.status(404).send("Produto não encontrado");
    }

    produto.nome = req.body.nome; // Atualiza o nome
    produto.preco = req.body.preco; // Atualiza o preço

    res.send("Produto atualizado com sucesso!");
}

// Exporta as funções do controller
module.exports = {
    listarProdutos,
    criarProduto,
    atualizarProduto
};