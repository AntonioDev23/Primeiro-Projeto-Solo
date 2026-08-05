
// Importa o Express
const express = require("express");
const app = express();

// Permite receber dados em JSON
app.use(express.json());

// Importa as rotas de produtos
const produtoRoutes = require("./routes/produtoRoutes");
app.use(produtoRoutes); // Registra as rotas

// Página inicial
app.get("/", (req, res) => {
    res.send("Olá, mundo!");
});

// Rota usada apenas para testes
app.post("/teste", (req, res) => {

    console.log("ENTROU NA ROTA TESTE");

    res.status(200).json({
        mensagem: "POST funcionando!"
    });

});

// Inicia o servidor
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});