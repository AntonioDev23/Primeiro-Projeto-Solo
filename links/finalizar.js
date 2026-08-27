
document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // RECUPERA USUÁRIO LOGADO
    // ==========================================

    const usuarioSalvo = localStorage.getItem("usuarioLogado");

    if (!usuarioSalvo) {
        window.location.href = "/links/log.html";
        return;
    }

    const usuario = JSON.parse(usuarioSalvo);


    // ==========================================
    // ELEMENTOS DA PÁGINA
    // ==========================================

    const resumoProdutos =
        document.getElementById("resumo-produtos");

    const totalPedido =
        document.getElementById("total-pedido");

    const formFinalizar =
        document.getElementById("form-finalizar");

    const telefone =
        document.getElementById("telefone");

    const mensagemPedido =
        document.getElementById("mensagem-pedido");


    // ==========================================
    // PREENCHE O TELEFONE
    // ==========================================

    telefone.value = usuario.telefone || "";


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

                throw new Error(
                    "Erro ao buscar carrinho."
                );

            }


            const produtos = await resposta.json();


            // ==========================================
            // VERIFICA SE O CARRINHO ESTÁ VAZIO
            // ==========================================

            if (produtos.length === 0) {

                resumoProdutos.innerHTML = `
                    <p>
                        Seu carrinho está vazio.
                    </p>
                `;

                totalPedido.textContent = "R$ 0,00";

                return;
            }


            // ==========================================
            // MONTA O RESUMO
            // ==========================================

            resumoProdutos.innerHTML = "";


            let total = 0;


            produtos.forEach(produto => {

                const preco = Number(produto.preco);

                const quantidade =
                    Number(produto.quantidade);


                const subtotal =
                    preco * quantidade;


                total += subtotal;


                const item =
                    document.createElement("div");


                item.classList.add(
                    "item-resumo"
                );


                item.innerHTML = `

                    <div>

                        <strong>
                            ${produto.nome}
                        </strong>

                        <p>
                            Quantidade:
                            ${quantidade}
                        </p>

                    </div>


                    <span>
                        R$ ${subtotal
                            .toFixed(2)
                            .replace(".", ",")}
                    </span>

                `;


                resumoProdutos.appendChild(item);

            });


            // ==========================================
            // MOSTRA O TOTAL
            // ==========================================

            totalPedido.textContent =
                `R$ ${total
                    .toFixed(2)
                    .replace(".", ",")}`;


        } catch (erro) {

            console.error(
                "Erro ao carregar pedido:",
                erro
            );

        }

    }


    // ==========================================
    // CONFIRMAR PEDIDO
    // ==========================================

    formFinalizar.addEventListener(
        "submit",
        (evento) => {

            evento.preventDefault();


            mensagemPedido.textContent =
                "Dados preenchidos corretamente. Em breve seu pedido será confirmado!";


            mensagemPedido.classList.remove(
                "hidden"
            );


            mensagemPedido.classList.add(
                "sucesso"
            );


            setTimeout(() => {

                mensagemPedido.classList.add(
                    "hidden"
                );

                mensagemPedido.classList.remove(
                    "sucesso"
                );

            }, 3000);

        }
    );

});