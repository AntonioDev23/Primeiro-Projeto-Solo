// =====================================================
// IMPORTAÇÃO DO MODEL
// =====================================================

// Importa o array de produtos que está na pasta "models".
// No futuro, quando usarmos um banco de dados, este arquivo
// continuará existindo, mas buscará os dados do banco.

const produtos = require("../models/produto");



// =====================================================
// FUNÇÃO - LISTAR PRODUTOS
// =====================================================

// Esta função é responsável por devolver todos os produtos.
//
// Ela recebe:
//
// req (Request)
// → Contém tudo o que o cliente enviou.
//
// res (Response)
// → É usado para enviar uma resposta ao cliente.

function listarProdutos(req, res) {

    // Envia todos os produtos em formato JSON.

    res.json(produtos);

}



// =====================================================
// EXPORTAÇÃO DAS FUNÇÕES
// =====================================================

// Disponibiliza esta função para outros arquivos.
//
// Quem vai utilizar esta função será a pasta "routes".
//
// Exemplo:
//
// app.get("/produtos", produtoController.listarProdutos);

module.exports = {

    listarProdutos

};