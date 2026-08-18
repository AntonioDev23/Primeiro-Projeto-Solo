// Pega os parâmetros que estão na URL
const parametros = new URLSearchParams(window.location.search);

// Pega o ID do produto da URL
const id = parametros.get("id");

// Busca o produto no backend usando o ID
fetch(`http://localhost:3000/produtos/${id}`)
    .then(resposta => resposta.json())

    // Recebe os dados do produto
    .then(produto => {

        // Mostra os dados recebidos no console
        console.log("Nome:", produto.nome);
        console.log("Preço:", produto.preco);
        console.log("Imagem:", produto.imagem);
        console.log("ID:", produto.id);
        console.log("Descrição:", produto.descricao);
        console.log("Benefícios:", produto.beneficios);
        console.log("Modo de uso:", produto.modo_uso);
        console.log("Composição:", produto.composicao);

        // Coloca o nome do produto na página
        document.querySelector("#produto-nome").textContent = produto.nome;

        // Coloca o preço do produto na página
        document.querySelector("#produto-preco").textContent =
            `R$ ${produto.preco}`;

        // Coloca a imagem do produto na página
        document.querySelector("#produto-imagem").src = produto.imagem;

        // Define o texto alternativo da imagem
        document.querySelector("#produto-imagem").alt = produto.nome;

        // Coloca a descrição na página
        document.querySelector("#produto-descricao").textContent =
            produto.descricao;

        // Coloca os benefícios na página
        document.querySelector("#produto-beneficios").textContent =
            produto.beneficios;

        // Coloca o modo de uso na página
        document.querySelector("#produto-modo-uso").textContent =
            produto.modo_uso;

            // Esconde o modo de uso quando o produto não possui essa informação
        if (!produto.modo_uso) {
            document.querySelector("#titulo-modo-uso").style.display = "none";
            document.querySelector("#produto-modo-uso").style.display = "none";
        }

        // Coloca a composição na página
        document.querySelector("#produto-composicao").textContent =
            produto.composicao;
    })

    // Mostra qualquer erro no console
    .catch(erro => {
        console.error("Erro ao buscar produto:", erro);
    });