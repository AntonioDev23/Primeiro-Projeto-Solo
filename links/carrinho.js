
document.addEventListener("DOMContentLoaded", () => {

    const listaCarrinho = document.getElementById("lista-carrinho");
    const carrinhoVazio = document.getElementById("carrinho-vazio");
    const totalCarrinho = document.getElementById("total-carrinho");

    // ==========================================
    // VERIFICA USUÁRIO LOGADO
    // ==========================================

    const usuarioSalvo = localStorage.getItem("usuarioLogado");

    if (!usuarioSalvo) {
        window.location.href = "log.html";
        return;
    }

    const usuario = JSON.parse(usuarioSalvo);


    // ==========================================
    // CARREGA O CARRINHO
    // ==========================================

    carregarCarrinho();


    async function carregarCarrinho() {

        try {

            const resposta = await fetch(
                `http://localhost:3000/carrinho/${usuario.id}`
            );

            if (!resposta.ok) {
                throw new Error("Erro ao buscar carrinho.");
            }

            const produtos = await resposta.json();

            listaCarrinho.innerHTML = "";


            // ==========================================
            // CARRINHO VAZIO
            // ==========================================

            if (produtos.length === 0) {

                carrinhoVazio.classList.remove("hidden");

                totalCarrinho.textContent = "R$ 0,00";

                return;
            }

            carrinhoVazio.classList.add("hidden");


            let total = 0;


            // ==========================================
            // CRIA OS PRODUTOS
            // ==========================================

            produtos.forEach(produto => {

                const preco = Number(produto.preco);
                const quantidade = Number(produto.quantidade);

                const subtotal = preco * quantidade;

                total += subtotal;


                const item = document.createElement("div");

                item.classList.add("item-carrinho");


                item.innerHTML = `

                    <img
                        src="${produto.imagem}"
                        alt="${produto.nome}"
                    >

                    <div class="info-produto">

                        <h3>${produto.nome}</h3>

                        <p>
                            Preço:
                            R$ ${preco
                                .toFixed(2)
                                .replace(".", ",")}
                        </p>

                    </div>


                    <div class="quantidade">

                        <button
                            type="button"
                            class="btn-menos"
                            data-id="${produto.id}"
                            data-quantidade="${quantidade}"
                        >
                            −
                        </button>


                        <span>
                            ${quantidade}
                        </span>


                        <button
                            type="button"
                            class="btn-mais"
                            data-id="${produto.id}"
                            data-quantidade="${quantidade}"
                        >
                            +
                        </button>

                    </div>


                    <div class="subtotal">

                        <strong>
                            R$ ${subtotal
                                .toFixed(2)
                                .replace(".", ",")}
                        </strong>

                    </div>


                    <button
                        type="button"
                        class="btn-remover"
                        data-id="${produto.id}"
                    >
                        <i class="fas fa-trash"></i>
                    </button>

                `;


                listaCarrinho.appendChild(item);

            });


            // ==========================================
            // MOSTRA O TOTAL
            // ==========================================

            totalCarrinho.textContent =
                `R$ ${total.toFixed(2).replace(".", ",")}`;


            // ==========================================
            // BOTÃO +
            // ==========================================

            document.querySelectorAll(".btn-mais")
                .forEach(botao => {

                    botao.addEventListener("click", () => {

                        const itemId =
                            Number(botao.dataset.id);

                        const quantidadeAtual =
                            Number(botao.dataset.quantidade);


                        atualizarQuantidade(
                            itemId,
                            quantidadeAtual + 1
                        );

                    });

                });


            // ==========================================
            // BOTÃO -
            // ==========================================

            document.querySelectorAll(".btn-menos")
                .forEach(botao => {

                    botao.addEventListener("click", () => {

                        const itemId =
                            Number(botao.dataset.id);

                        const quantidadeAtual =
                            Number(botao.dataset.quantidade);


                        if (quantidadeAtual <= 1) {
                            return;
                        }


                        atualizarQuantidade(
                            itemId,
                            quantidadeAtual - 1
                        );

                    });

                });


            // ==========================================
            // BOTÃO REMOVER
            // ==========================================

            document.querySelectorAll(".btn-remover")
                .forEach(botao => {

                    botao.addEventListener("click", () => {

                        const itemId =
                            Number(botao.dataset.id);

                        removerItem(itemId);

                    });

                });


        } catch (erro) {

            console.error(
                "Erro ao carregar carrinho:",
                erro
            );

        }

    }


    // ==========================================
    // ATUALIZA QUANTIDADE
    // ==========================================

    async function atualizarQuantidade(
        itemId,
        quantidade
    ) {

        try {

            const resposta = await fetch(
                `http://localhost:3000/carrinho/item/${itemId}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        quantidade: quantidade
                    })
                }
            );


            const dados = await resposta.json();


            if (!resposta.ok) {

                console.error(
                    dados.mensagem
                );

                return;
            }


            carregarCarrinho();


        } catch (erro) {

            console.error(
                "Erro ao atualizar quantidade:",
                erro
            );

        }

    }


    // ==========================================
    // REMOVE ITEM DO CARRINHO
    // ==========================================

    async function removerItem(itemId) {

        try {

            const resposta = await fetch(
                `http://localhost:3000/carrinho/item/${itemId}`,
                {
                    method: "DELETE"
                }
            );


            const dados = await resposta.json();


            if (!resposta.ok) {

                console.error(
                    dados.mensagem
                );

                return;
            }


            carregarCarrinho();


        } catch (erro) {

            console.error(
                "Erro ao remover item:",
                erro
            );

        }

    }

});