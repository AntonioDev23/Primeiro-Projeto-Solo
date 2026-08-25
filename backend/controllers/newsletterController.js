
// Importa a conexão com o banco
const pool = require("../config/database");

// Inscreve um e-mail na Newsletter
const cadastrarNewsletter = async (req, res) => {
    try {
        const { email } = req.body;

        // Verifica se o e-mail foi informado
        if (!email) {
            return res.status(400).json({
                mensagem: "O e-mail é obrigatório."
            });
        }

        // Salva o e-mail no banco
        const resultado = await pool.query(
            `INSERT INTO newsletter (email)
             VALUES ($1)
             RETURNING id, email, criado_em`,
            [email]
        );

        // Retorna a inscrição realizada
        res.status(201).json({
            mensagem: "Inscrição realizada com sucesso!",
            newsletter: resultado.rows[0]
        });

    } catch (erro) {
        console.error("Erro ao cadastrar na Newsletter:", erro);

        // E-mail já cadastrado
        if (erro.code === "23505") {
            return res.status(409).json({
                mensagem: "Este e-mail já está inscrito na Newsletter."
            });
        }

        res.status(500).json({
            mensagem: "Erro ao realizar inscrição na Newsletter."
        });
    }
};

// Exporta o controller
module.exports = {
    cadastrarNewsletter
};