
const express = require("express");
const app = express();
app.use(express.json());

const produtos = [
    {
        id: 1,
        nome: "Shampoo hidratante",
        preco: 49
    },
    {
        id: 2,
        nome: "Creme anti-idade",
        preco: 89
    }
];
app.get("/", (req, res) => {
    res.send("Olá, mundo!");
});

app.get("/produtos", (req, res) => {
    res.json(produtos);
});

app.post("/produtos", (req, res) => {

    const novoProduto = req.body;

    produtos.push(novoProduto);

    res.send("Produto cadastrado com sucesso!");

});

console.log("Cheguei antes do servidor");

const servidor = app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});

setInterval(() => {
    console.log("Servidor continua vivo...");
}, 5000);