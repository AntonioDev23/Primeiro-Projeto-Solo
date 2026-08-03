
const express = require("express");
const app = express();

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

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});