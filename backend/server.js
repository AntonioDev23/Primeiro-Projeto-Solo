
// Importa o Express
const express = require("express");
const app = express();

// Permite receber dados em JSON
app.use(express.json());

// Importa as rotas de produtos
const produtoRoutes = require("./routes/produtoRoutes");
app.use(produtoRoutes); // Registra as rotas

// Importa os produtos (temporário, até mover PUT e DELETE)
const produtos = require("./models/produto");

// Página inicial
app.get("/", (req, res) => {
    res.send("Olá, mundo!");
});

// Atualiza um produto
app.put("/produtos/:id", (req, res) => {

    const id = Number(req.params.id); // ID recebido pela URL

    const produto = produtos.find(
        produto => produto.id === id
    );

    if (!produto) {
        return res.status(404).send("Produto não encontrado");
    }

    produto.nome = req.body.nome;
    produto.preco = req.body.preco;

    res.send("Produto atualizado com sucesso!");

});

// Remove um produto
app.delete("/produtos/:id", (req, res) => {

    const id = Number(req.params.id); // ID recebido pela URL

    const indice = produtos.findIndex(
        produto => produto.id === id
    );

    if (indice === -1) {
        return res.status(404).send("Produto não encontrado");
    }

    produtos.splice(indice, 1); // Remove do array

    res.send("Produto removido com sucesso!");

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