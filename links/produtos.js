fetch("http://localhost:3000/produtos")
    .then(resposta => resposta.json())
    .then(produtos => {
        console.log("Produtos recebidos:", produtos);
    })
    .catch(erro => {
        console.error("Erro ao buscar produtos:", erro);
    });