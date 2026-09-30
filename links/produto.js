
// Pega os parâmetros que estão na URL
const parametros = new URLSearchParams(window.location.search);

// Pega o ID do produto da URL
const id = parametros.get("id");


// ==========================================
// CONTROLE DO CARREGAMENTO
// ==========================================

let produtoAtual = null;
let botoesCarregados = false;


// ==========================================
// CONFIGURA OS BOTÕES
// ==========================================

function configurarBotoes() {

    // Só continua quando os dois estiverem prontos
    if (!produtoAtual || !botoesCarregados) {
        return;
    }


    // ==========================================
    // BOTÃO COMPRAR AGORA
    // ==========================================

    const botaoCompra =
        document.querySelector("#produto-link");

    if (botaoCompra) {

        botaoCompra.href =
            `comp.html?produto=${encodeURIComponent(produtoAtual.nome)}&preco=${produtoAtual.preco}`;

    }


    // ==========================================
    // BOTÃO ADICIONAR AO CARRINHO
    // ==========================================

    const btnCarrinho =
        document.querySelector("#btn-adicionar-carrinho");


    if (!btnCarrinho) {
        return;
    }


    btnCarrinho.addEventListener("click", async () => {

        // Verifica se existe usuário logado
        const usuarioSalvo =
            localStorage.getItem("usuarioLogado");


        if (!usuarioSalvo) {

            alert(
                "Faça login para adicionar produtos ao carrinho."
            );

            window.location.href = "log.html";

            return;
        }


        // Recupera o usuário logado
        const usuario =
            JSON.parse(usuarioSalvo);


        try {

            const resposta = await fetch(
                "https://arsn-loja.onrender.com/carrinho",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        usuario_id: usuario.id,
                        produto_id: produtoAtual.id,
                        quantidade: 1
                    })
                }
            );


            const dados = await resposta.json();


            if (!resposta.ok) {

                alert(
                    dados.mensagem ||
                    "Não foi possível adicionar o produto ao carrinho."
                );

                return;
            }


            // Vai para o carrinho depois de adicionar
            window.location.href = "carrinho.html";


        } catch (erro) {

            console.error(
                "Erro ao adicionar produto ao carrinho:",
                erro
            );

            alert(
                "Não foi possível conectar ao servidor."
            );

        }

    });

}


// ==========================================
// AVISA QUANDO OS BOTÕES FORAM CARREGADOS
// ==========================================

document.addEventListener("botoesCarregados", () => {

    botoesCarregados = true;

    configurarBotoes();

});


// ==========================================
// BUSCA O PRODUTO NO BACKEND
// ==========================================

fetch(`https://arsn-loja.onrender.com/produtos/${id}`)
    .then(resposta => resposta.json())

    // Recebe os dados do produto
    .then(produto => {

        // Guarda o produto
        produtoAtual = produto;


        // Mostra os dados recebidos no console
        console.log("Nome:", produto.nome);
        console.log("Preço:", produto.preco);
        console.log("Imagem:", produto.imagem);
        console.log("ID:", produto.id);
        console.log("Descrição:", produto.descricao);
        console.log("Benefícios:", produto.beneficios);
        console.log("Modo de uso:", produto.modo_uso);
        console.log("Composição:", produto.composicao);


        // ==========================================
        // PREENCHIMENTO DA PÁGINA
        // ==========================================

        // Coloca o nome do produto na página
        document.querySelector("#produto-nome").textContent =
            produto.nome;


        // Coloca o preço do produto na página
        document.querySelector("#produto-preco").textContent =
            `R$ ${produto.preco}`;


        // Coloca a imagem do produto na página
        document.querySelector("#produto-imagem").src =
            produto.imagem;


        // Define o texto alternativo da imagem
        document.querySelector("#produto-imagem").alt =
            produto.nome;


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

            document.querySelector("#titulo-modo-uso").style.display =
                "none";

            document.querySelector("#produto-modo-uso").style.display =
                "none";

        }


        // Coloca a composição na página
        document.querySelector("#produto-composicao").textContent =
            produto.composicao;


        // Tenta configurar os botões
        // caso eles já tenham sido carregados
        configurarBotoes();

    })

    // Mostra qualquer erro no console
    .catch(erro => {

        console.error(
            "Erro ao buscar produto:",
            erro
        );

    });