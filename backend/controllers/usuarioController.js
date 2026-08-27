
// Importa a conexão com o banco
const pool = require("../config/database");

// Importa o bcrypt para proteger a senha
const bcrypt = require("bcrypt");


// ==========================================
// CADASTRAR USUÁRIO
// ==========================================

const cadastrarUsuario = async (req, res) => {

    try {

        const {
            nome,
            email,
            senha,
            telefone,
            nascimento,
            genero
        } = req.body;


        // Verifica se os campos obrigatórios foram preenchidos
        if (!nome || !email || !senha || !telefone || !nascimento || !genero) {

            return res.status(400).json({
                mensagem: "Todos os campos são obrigatórios."
            });

        }


        // Cria o hash da senha
        const senhaHash = await bcrypt.hash(senha, 10);


        // Salva o usuário no banco
        const resultado = await pool.query(
            `INSERT INTO usuarios
            (nome, email, senha, telefone, nascimento, genero)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, nome, email, telefone, nascimento, genero, criado_em`,
            [
                nome,
                email,
                senhaHash,
                telefone,
                nascimento,
                genero
            ]
        );


        // Retorna os dados do usuário cadastrado
        res.status(201).json(resultado.rows[0]);


    } catch (erro) {

        console.error("Erro ao cadastrar usuário:", erro);


        // E-mail já cadastrado
        if (erro.code === "23505") {

            return res.status(409).json({
                mensagem: "Este e-mail já está cadastrado."
            });

        }


        res.status(500).json({
            mensagem: "Erro ao cadastrar usuário."
        });

    }

};



// ==========================================
// LOGIN DO USUÁRIO
// ==========================================

const loginUsuario = async (req, res) => {

    try {

        const {
            email,
            senha
        } = req.body;


        // Verifica se os campos foram preenchidos
        if (!email || !senha) {

            return res.status(400).json({
                mensagem: "E-mail e senha são obrigatórios."
            });

        }


        // Procura o usuário pelo e-mail
        const resultado = await pool.query(
            "SELECT * FROM usuarios WHERE email = $1",
            [email]
        );


        // Usuário não encontrado
        if (resultado.rows.length === 0) {

            return res.status(401).json({
                mensagem: "E-mail ou senha incorretos."
            });

        }


        const usuario = resultado.rows[0];


        // Compara a senha digitada com o hash do banco
        const senhaCorreta = await bcrypt.compare(
            senha,
            usuario.senha
        );


        // Senha incorreta
        if (!senhaCorreta) {

            return res.status(401).json({
                mensagem: "E-mail ou senha incorretos."
            });

        }


        // Login realizado
        res.status(200).json({

            mensagem: "Login realizado com sucesso!",

            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }

        });


    } catch (erro) {

        console.error("Erro ao fazer login:", erro);


        res.status(500).json({
            mensagem: "Erro ao fazer login."
        });

    }

};



// ==========================================
// ATUALIZAR PERFIL
// ==========================================

const atualizarPerfil = async (req, res) => {

    try {

        const {
            id,
            nome,
            telefone,
            nascimento,
            genero
        } = req.body;


        // Verifica os campos obrigatórios
        if (!id || !nome || !telefone || !nascimento || !genero) {

            return res.status(400).json({
                mensagem: "Todos os campos são obrigatórios."
            });

        }


        // Atualiza o usuário no banco
        const resultado = await pool.query(
            `UPDATE usuarios
             SET nome = $1,
                 telefone = $2,
                 nascimento = $3,
                 genero = $4
             WHERE id = $5
             RETURNING id, nome, email, telefone, nascimento, genero, criado_em`,
            [
                nome,
                telefone,
                nascimento,
                genero,
                id
            ]
        );


        // Usuário não encontrado
        if (resultado.rows.length === 0) {

            return res.status(404).json({
                mensagem: "Usuário não encontrado."
            });

        }


        // Retorna os dados atualizados
        res.status(200).json({

            mensagem: "Perfil atualizado com sucesso!",

            usuario: resultado.rows[0]

        });


    } catch (erro) {

        console.error(
            "Erro ao atualizar perfil:",
            erro
        );


        res.status(500).json({
            mensagem: "Erro ao atualizar perfil."
        });

    }

};



// ==========================================
// ALTERAR SENHA
// ==========================================

const alterarSenha = async (req, res) => {

    try {

        const {
            id,
            senhaAtual,
            novaSenha
        } = req.body;


        // Verifica os campos
        if (!id || !senhaAtual || !novaSenha) {

            return res.status(400).json({
                mensagem: "Todos os campos são obrigatórios."
            });

        }


        // Busca o usuário
        const resultado = await pool.query(
            "SELECT id, senha FROM usuarios WHERE id = $1",
            [id]
        );


        // Usuário não encontrado
        if (resultado.rows.length === 0) {

            return res.status(404).json({
                mensagem: "Usuário não encontrado."
            });

        }


        const usuario = resultado.rows[0];


        // Verifica a senha atual
        const senhaCorreta = await bcrypt.compare(
            senhaAtual,
            usuario.senha
        );


        // Senha atual incorreta
        if (!senhaCorreta) {

            return res.status(401).json({
                mensagem: "A senha atual está incorreta."
            });

        }


        // Verifica se a nova senha é diferente
        if (senhaAtual === novaSenha) {

            return res.status(400).json({
                mensagem: "A nova senha deve ser diferente da senha atual."
            });

        }


        // Cria o novo hash
        const novaSenhaHash = await bcrypt.hash(
            novaSenha,
            10
        );


        // Atualiza a senha no banco
        await pool.query(
            `UPDATE usuarios
             SET senha = $1
             WHERE id = $2`,
            [
                novaSenhaHash,
                id
            ]
        );


        // Retorna sucesso
        res.status(200).json({

            mensagem: "Senha alterada com sucesso!"

        });


    } catch (erro) {

        console.error(
            "Erro ao alterar senha:",
            erro
        );


        res.status(500).json({
            mensagem: "Erro ao alterar senha."
        });

    }

};



// ==========================================
// EXPORTA OS CONTROLLERS
// ==========================================

module.exports = {

    cadastrarUsuario,
    loginUsuario,
    atualizarPerfil,
    alterarSenha

};