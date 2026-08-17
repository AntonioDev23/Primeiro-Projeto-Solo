const parametros = new URLSearchParams(window.location.search);

const id = parametros.get("id");

fetch(`http://localhost:3000/produtos/${id}`)
    .then(resposta => resposta.json())
    .then(produto => {

        console.log("Nome:", produto.nome);
        console.log("Preço:", produto.preco);
        console.log("Imagem:", produto.imagem);
        console.log("ID:", produto.id);
        console.log("Descrição:", produto.descricao);
        console.log("Benefícios:", produto.beneficios);
        console.log("Modo de uso:", produto.modo_uso);
        console.log("Composição:", produto.composicao);
        

        document.querySelector("#produto-nome").textContent = produto.nome;

        document.querySelector("#produto-preco").textContent =
            `R$ ${produto.preco}`;

        document.querySelector("#produto-imagem").src = produto.imagem;

        console.log(
        "Caminho final da imagem:",
        document.querySelector("#produto-imagem").src
    );

        document.querySelector("#produto-imagem").alt = produto.nome;

    })
    .catch(erro => {
        console.error("Erro ao buscar produto:", erro);
    });