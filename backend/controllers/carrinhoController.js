// Importa a conexão com o banco
const pool = require("../config/database");


// ==========================================
// ADICIONAR PRODUTO AO CARRINHO
// ==========================================

const adicionarAoCarrinho = async (req, res) => {

    try {

        const { usuario_id, produto_id, quantidade } = req.body;

        if (!usuario_id || !produto_id) {

            return res.status(400).json({
                mensagem: "Usuário e produto são obrigatórios."
            });

        }

        const quantidadeAdicionar = quantidade || 1;


        // Verifica se o carrinho existe
        let carrinho = await pool.query(
            "SELECT id FROM carrinhos WHERE usuario_id = $1",
            [usuario_id]
        );


        // Cria o carrinho se não existir
        let carrinhoId;

        if (carrinho.rows.length === 0) {

            const novoCarrinho = await pool.query(
                `INSERT INTO carrinhos (usuario_id)
                 VALUES ($1)
                 RETURNING id`,
                [usuario_id]
            );

            carrinhoId = novoCarrinho.rows[0].id;

        } else {

            carrinhoId = carrinho.rows[0].id;
        }


        // Verifica se o produto já existe no carrinho
        const itemExistente = await pool.query(
            `SELECT id, quantidade
             FROM itens_carrinho
             WHERE carrinho_id = $1
             AND produto_id = $2`,
            [carrinhoId, produto_id]
        );


        // Se já existe, aumenta a quantidade
        if (itemExistente.rows.length > 0) {

            const novaQuantidade =
                itemExistente.rows[0].quantidade + quantidadeAdicionar;

            await pool.query(
                `UPDATE itens_carrinho
                 SET quantidade = $1
                 WHERE id = $2`,
                [
                    novaQuantidade,
                    itemExistente.rows[0].id
                ]
            );

        }

        // Se não existe, adiciona
        else {

            await pool.query(
                `INSERT INTO itens_carrinho
                 (carrinho_id, produto_id, quantidade)
                 VALUES ($1, $2, $3)`,
                [
                    carrinhoId,
                    produto_id,
                    quantidadeAdicionar
                ]
            );
        }


        res.status(201).json({
            mensagem: "Produto adicionado ao carrinho!"
        });


    } catch (erro) {

        console.error(
            "Erro ao adicionar produto ao carrinho:",
            erro
        );

        res.status(500).json({
            mensagem: "Erro ao adicionar produto ao carrinho."
        });
    }
};



// ==========================================
// LISTAR CARRINHO DO USUÁRIO
// ==========================================

const listarCarrinho = async (req, res) => {

    try {

        const usuarioId = Number(req.params.usuarioId);

        const resultado = await pool.query(
            `SELECT
                itens_carrinho.id,
                itens_carrinho.produto_id,
                itens_carrinho.quantidade,
                produtos.nome,
                produtos.preco,
                produtos.imagem
             FROM itens_carrinho
             INNER JOIN carrinhos
                ON itens_carrinho.carrinho_id = carrinhos.id
             INNER JOIN produtos
                ON itens_carrinho.produto_id = produtos.id
             WHERE carrinhos.usuario_id = $1
             ORDER BY itens_carrinho.id`,
            [usuarioId]
        );

        res.status(200).json(resultado.rows);


    } catch (erro) {

        console.error(
            "Erro ao buscar carrinho:",
            erro
        );

        res.status(500).json({
            mensagem: "Erro ao buscar carrinho."
        });
    }
};



// ==========================================
// ATUALIZAR QUANTIDADE DO PRODUTO
// ==========================================

const atualizarQuantidade = async (req, res) => {

    try {

        const itemId = Number(req.params.itemId);
        const { quantidade } = req.body;


        if (!quantidade || quantidade < 1) {

            return res.status(400).json({
                mensagem: "Quantidade inválida."
            });
        }


        const resultado = await pool.query(
            `UPDATE itens_carrinho
             SET quantidade = $1
             WHERE id = $2
             RETURNING *`,
            [
                quantidade,
                itemId
            ]
        );


        if (resultado.rows.length === 0) {

            return res.status(404).json({
                mensagem: "Item não encontrado no carrinho."
            });
        }


        res.status(200).json({
            mensagem: "Quantidade atualizada!",
            item: resultado.rows[0]
        });


    } catch (erro) {

        console.error(
            "Erro ao atualizar quantidade:",
            erro
        );

        res.status(500).json({
            mensagem: "Erro ao atualizar quantidade."
        });
    }
};



// ==========================================
// REMOVER PRODUTO DO CARRINHO
// ==========================================

const removerDoCarrinho = async (req, res) => {

    try {

        const itemId = Number(req.params.itemId);


        const resultado = await pool.query(
            `DELETE FROM itens_carrinho
             WHERE id = $1
             RETURNING *`,
            [itemId]
        );


        if (resultado.rows.length === 0) {

            return res.status(404).json({
                mensagem: "Item não encontrado no carrinho."
            });
        }


        res.status(200).json({
            mensagem: "Produto removido do carrinho!"
        });


    } catch (erro) {

        console.error(
            "Erro ao remover produto do carrinho:",
            erro
        );

        res.status(500).json({
            mensagem: "Erro ao remover produto do carrinho."
        });
    }
};



// ==========================================
// EXPORTA
// ==========================================

module.exports = {
    adicionarAoCarrinho,
    listarCarrinho,
    atualizarQuantidade,
    removerDoCarrinho
};