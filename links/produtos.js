fetch("http://localhost:3000/produtos")
    .then(resposta => {

        if (!resposta.ok) {
            throw new Error("Erro ao buscar produtos");
        }

        return resposta.json();

    })
    .then(produtos => {

        const listaProdutos =
            document.getElementById("lista-produtos");

        const listaNovidades =
            document.getElementById("lista-novidades");


        produtos.forEach(produto => {

            const div = document.createElement("div");

            div.classList.add("card-produto");


            div.innerHTML = `

                <img
                    src="${produto.imagem}"
                    alt="${produto.nome}"
                >

                <h3>
                    ${produto.nome}
                </h3>

                <p>
                    R$ ${Number(produto.preco).toFixed(2)}
                </p>

                <a
                    href="${produto.link}"
                    class="btn"
                >
                    Ver Detalhes
                </a>

            `;


            if (produto.secao === "destaque") {

                listaProdutos.appendChild(div);

            }


            if (produto.secao === "novidade") {

                listaNovidades.appendChild(div);

            }

        });

    })
    .catch(erro => {

        console.error(
            "Erro ao buscar produtos:",
            erro
        );

    });