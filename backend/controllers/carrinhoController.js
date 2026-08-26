
// Importa a conexão com o banco
const pool = require("../config/database");


// ==========================================
// ADICIONAR PRODUTO AO CARRINHO
// ==========================================

const adicionarAoCarrinho = async (req, res) => {

    try {

        const { usuario_id, produto_id, quantidade } = req.body;

        // Verifica os dados
        if (!usuario_id || !produto_id) {

            return res.status(400).json({
                mensagem: "Usuário e produto são obrigatórios."
            });

        }

        const quantidadeAdicionar = quantidade || 1;


        // ==========================================
        // VERIFICA SE O CARRINHO EXISTE
        // ==========================================

        let carrinho = await pool.query(
            "SELECT id FROM carrinhos WHERE usuario_id = $1",
            [usuario_id]
        );


        // ==========================================
        // CRIA O CARRINHO SE NÃO EXISTIR
        // ==========================================

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


        // ==========================================
        // VERIFICA SE O PRODUTO JÁ ESTÁ NO CARRINHO
        // ==========================================

        const itemExistente = await pool.query(
            `SELECT id, quantidade
             FROM itens_carrinho
             WHERE carrinho_id = $1
             AND produto_id = $2`,
            [carrinhoId, produto_id]
        );


        // ==========================================
        // SE JÁ EXISTE → AUMENTA A QUANTIDADE
        // ==========================================

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

        // ==========================================
        // SE NÃO EXISTE → ADICIONA
        // ==========================================

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
// EXPORTA
// ==========================================

module.exports = {
    adicionarAoCarrinho,
    listarCarrinho
};