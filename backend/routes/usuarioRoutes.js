// Importa o Express
const express = require("express");

// Cria o gerenciador de rotas
const router = express.Router();

// Importa o controller de usuários
const usuarioController = require("../controllers/usuarioController");

// Cadastra um novo usuário
router.post("/usuarios", usuarioController.cadastrarUsuario);

// Faz login do usuário
router.post("/login", usuarioController.loginUsuario);

// Atualiza os dados do perfil
router.put("/usuarios/perfil", usuarioController.atualizarPerfil);

// Altera a senha do usuário
router.put("/usuarios/senha", usuarioController.alterarSenha);

// Exporta as rotas
module.exports = router;