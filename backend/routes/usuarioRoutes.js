
// Importa o Express

const express = require("express");

// Cria o gerenciador de rotas

const router = express.Router();

// Importa o controller de usuários

const usuarioController = require("../controllers/usuarioController");

// Cadastra um novo usuário

router.post("/usuarios", usuarioController.cadastrarUsuario);

// Exporta as rotas

module.exports = router;