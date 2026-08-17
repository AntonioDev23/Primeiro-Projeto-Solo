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

// Busca um produto pelo ID
async function buscarProdutoPorId(req, res) {
    try {
        const id = Number(req.params.id);

        const resultado = await pool.query(
            "SELECT * FROM produtos WHERE id = $1",
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: "Produto não encontrado"
            });
        }

        res.json(resultado.rows[0]);

    } catch (erro) {
        console.error("Erro ao buscar produto:", erro);

        res.status(500).json({
            erro: "Erro ao buscar produto"
        });
    }
}

// Cadastra um novo produto
async function criarProduto(req, res) {
    try {
        const { nome, preco } = req.body;

        const resultado = await pool.query(
            "INSERT INTO produtos (nome, preco) VALUES ($1, $2) RETURNING *",
            [nome, preco]
        );

        res.status(201).json(resultado.rows[0]);
    } catch (erro) {
        console.error("Erro ao cadastrar produto:", erro);

        res.status(500).json({
            erro: "Erro ao cadastrar produto"
        });
    }
}

// Atualiza um produto existente
async function atualizarProduto(req, res) {
    try {
        const id = Number(req.params.id);
        const { nome, preco } = req.body;

        const resultado = await pool.query(
            "UPDATE produtos SET nome = $1, preco = $2 WHERE id = $3 RETURNING *",
            [nome, preco, id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: "Produto não encontrado"
            });
        }

        res.json(resultado.rows[0]);
    } catch (erro) {
        console.error("Erro ao atualizar produto:", erro);

        res.status(500).json({
            erro: "Erro ao atualizar produto"
        });
    }
}

// Remove um produto
async function deletarProduto(req, res) {
    try {
        const id = Number(req.params.id);

        const resultado = await pool.query(
            "DELETE FROM produtos WHERE id = $1 RETURNING *",
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: "Produto não encontrado"
            });
        }

        res.json({
            mensagem: "Produto removido com sucesso!",
            produto: resultado.rows[0]
        });
    } catch (erro) {
        console.error("Erro ao deletar produto:", erro);

        res.status(500).json({
            erro: "Erro ao deletar produto"
        });
    }
}

// Exporta as funções do controller
module.exports = {
    listarProdutos,
    buscarProdutoPorId,
    criarProduto,
    atualizarProduto,
    deletarProduto
};