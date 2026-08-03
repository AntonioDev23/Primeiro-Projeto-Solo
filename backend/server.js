
// =====================================================
// IMPORTAÇÃO DO EXPRESS
// =====================================================

// Importa a biblioteca Express para criar nosso servidor
const express = require("express");


// Cria uma aplicação Express
const app = express();


// Permite que o servidor entenda dados enviados em JSON
// Exemplo: dados enviados pelo Body do Postman
app.use(express.json());



// =====================================================
// BANCO DE DADOS TEMPORÁRIO
// =====================================================

// Por enquanto estamos usando um array como "banco de dados"
// Futuramente isso será substituído por um banco real
// como MySQL, PostgreSQL, MongoDB etc.

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



// =====================================================
// ROTA PRINCIPAL DO SITE
// =====================================================

// Quando alguém acessar:
// http://localhost:3000/

app.get("/", (req, res) => {

    // Envia uma mensagem simples como resposta
    res.send("Olá, mundo!");

});



// =====================================================
// GET - LISTAR PRODUTOS
// =====================================================

// Método GET:
// Usado para BUSCAR informações

// URL:
// GET http://localhost:3000/produtos

app.get("/produtos", (req, res) => {

    // Retorna todos os produtos em formato JSON
    res.json(produtos);

});



// =====================================================
// POST - CADASTRAR PRODUTO
// =====================================================

// Método POST:
// Usado para CRIAR novos dados

// URL:
// POST http://localhost:3000/produtos

app.post("/produtos", (req, res) => {


    // Pega os dados enviados pelo Body da requisição
    // Exemplo:
    // {
    //   "id": 3,
    //   "nome": "Protetor solar",
    //   "preco": 59
    // }

    const novoProduto = req.body;



    // Adiciona o novo produto dentro do array

    produtos.push(novoProduto);



    // Resposta enviada para o usuário

    res.send("Produto cadastrado com sucesso!");

});

// =====================================================
// PUT - ATUALIZAR PRODUTO
// =====================================================

// Método PUT:
// Usado para editar dados existentes

// URL:
// PUT http://localhost:3000/produtos/1

app.put("/produtos/:id", (req, res) => {

    // Pega o ID enviado na URL
    // Exemplo: /produtos/1

    const id = Number(req.params.id);



    // Procura o produto pelo ID

    const produto = produtos.find(
        produto => produto.id === id
    );



    // Caso o produto não exista

    if (!produto) {

        return res
            .status(404)
            .send("Produto não encontrado");

    }



    // Atualiza os dados do produto

    produto.nome = req.body.nome;
    produto.preco = req.body.preco;



    // Retorna uma mensagem

    res.send("Produto atualizado com sucesso!");

});



// =====================================================
// DELETE - REMOVER PRODUTO
// =====================================================

// Método DELETE:
// Usado para apagar dados

// URL:
// DELETE http://localhost:3000/produtos/2

app.delete("/produtos/:id", (req, res) => {


    // Pega o ID enviado na URL

    // Exemplo:
    // /produtos/2
    //
    // req.params.id retorna "2" como texto
    // Number transforma em número

    const id = Number(req.params.id);



    // Procura a posição do produto dentro do array

    const indice = produtos.findIndex(
        produto => produto.id === id
    );



    // Caso não encontre o produto

    if (indice === -1) {

        return res
            .status(404)
            .send("Produto não encontrado");

    }



    // Remove o produto do array

    produtos.splice(indice, 1);



    // Envia confirmação

    res.send("Produto removido com sucesso!");

});



// =====================================================
// ROTA DE TESTE
// =====================================================

// Essa rota foi criada apenas para testar se o POST funciona

// URL:
// POST http://localhost:3000/teste

app.post("/teste", (req, res) => {


    console.log("ENTROU NA ROTA TESTE");



    res.status(200).json({

        mensagem: "POST funcionando!"

    });

});



// =====================================================
// INICIALIZAÇÃO DO SERVIDOR
// =====================================================

// Faz o Express começar a escutar requisições
// na porta 3000

const servidor = app.listen(3000, () => {

    console.log("Servidor rodando na porta 3000");

});



// =====================================================
// TESTE DE VIDA DO SERVIDOR
// =====================================================

// Isso era apenas para confirmar que o Node continuava ativo.
// Em um projeto real, essa parte seria removida.

/*
setInterval(() => {

    console.log("Servidor continua vivo...");

}, 5000);
*/