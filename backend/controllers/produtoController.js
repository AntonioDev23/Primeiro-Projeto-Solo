// Importa o array de produtos
const pool = require("../config/database");

// Lista todos os produtos
async function listarProdutos(req, res) {
    try {
        const resultado = await pool.query("SELECT * FROM produtos");

        res.json(resultado.rows);
    } catch (erro) {
        console.error("Erro ao buscar produtos:", erro);

        res.status(500).json({
            erro: "Erro ao buscar produtos"
        });
    }
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

// Remove um produto
function deletarProduto(req, res) {

    const id = Number(req.params.id); // ID recebido pela URL

    const indice = produtos.findIndex(
        produto => produto.id === id
    ); // Procura a posição do produto

    if (indice === -1) {
        return res.status(404).send("Produto não encontrado");
    }

    produtos.splice(indice, 1); // Remove o produto

    res.send("Produto removido com sucesso!");
}

// Exporta as funções do controller
module.exports = {
    listarProdutos,
    criarProduto,
    atualizarProduto,
    deletarProduto
};