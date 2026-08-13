fetch("http://localhost:3000/produtos")
    .then(resposta => resposta.json())
    .then(produtos => {

        const listaProdutos = document.getElementById("lista-produtos");
        const listaNovidades = document.getElementById("lista-novidades");

        produtos.forEach(produto => {

            const div = document.createElement("div");

            if (produto.secao === "destaque") {
                div.classList.add("produto");
            }

            if (produto.secao === "novidade") {
                div.classList.add("novidade");
            }

            div.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <p>R$ ${produto.preco}</p>
                <a href="${produto.link}" class="btn">Ver Detalhes</a>
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
        console.error("Erro ao buscar produtos:", erro);
    });