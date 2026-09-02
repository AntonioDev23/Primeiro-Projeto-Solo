// ==========================================
// HEADER
// ==========================================

const caminhoComponentes = new URL(".", import.meta.url);

fetch(new URL("header.html", caminhoComponentes))
    .then(resposta => resposta.text())
    .then(header => {

        const elementoHeader = document.getElementById("header");

        if (elementoHeader) {

            elementoHeader.innerHTML = header;

            // Coloca o título da página no header
            const titulo = document.title;
            const tituloPagina = document.getElementById("titulo-pagina");

            if (tituloPagina) {
                tituloPagina.textContent = titulo;
            }

            // ==========================================
            // VERIFICA USUÁRIO LOGADO
            // ==========================================

            const usuarioSalvo = localStorage.getItem("usuarioLogado");

            const areaUsuario = document.getElementById("area-usuario");

            if (usuarioSalvo && areaUsuario) {

                const usuarioLogado = JSON.parse(usuarioSalvo);

                areaUsuario.innerHTML = `

                    <div class="usuario-menu">

                        <button class="usuario-botao">
                            <i class="fas fa-user"></i>
                            Olá, ${usuarioLogado.nome}
                            <i class="fas fa-chevron-down"></i>
                        </button>

                        <div class="usuario-dropdown">

                            <a href="/links/perfil.html">
                                <i class="fas fa-user-circle"></i>
                                Meu perfil
                            </a>

                            <a href="/links/compras.html">
                                <i class="fas fa-shopping-bag"></i>
                                Minhas compras
                            </a>

                            <a href="/links/carrinho.html" class="link-carrinho">

                            <i class="fas fa-shopping-cart"></i>

                            Carrinho

                            <span id="contador-carrinho" class="contador-carrinho hidden">
                                0
                            </span>

                            </a>

                            <a href="#" id="btn-sair">
                                <i class="fas fa-sign-out-alt"></i>
                                Sair
                            </a>

                        </div>

                    </div>
                `;

            // ==========================================
            // CONTADOR DO CARRINHO
            // ==========================================

            atualizarContadorCarrinho();


            async function atualizarContadorCarrinho() {

                try {

                    const resposta = await fetch(
                        `http://localhost:3000/carrinho/${usuarioLogado.id}`
                    );

                    if (!resposta.ok) {
                        throw new Error("Erro ao buscar quantidade do carrinho.");
                    }

                    const produtos = await resposta.json();

                    const contador =
                        document.getElementById("contador-carrinho");

                    if (!contador) {
                        return;
                    }

                    let quantidadeTotal = 0;

                    produtos.forEach(produto => {

                        quantidadeTotal += Number(produto.quantidade);

                    });


                    if (quantidadeTotal > 0) {

                        contador.textContent = quantidadeTotal;

                        contador.classList.remove("hidden");

                    } else {

                        contador.textContent = "0";

                        contador.classList.add("hidden");

                    }

                } catch (erro) {

                    console.error(
                        "Erro ao atualizar contador do carrinho:",
                        erro
                    );

                }

            }


                // ==========================================
                // BOTÃO SAIR
                // ==========================================

                const btnSair = document.getElementById("btn-sair");

                btnSair.addEventListener("click", (evento) => {

                    evento.preventDefault();

                    localStorage.removeItem("usuarioLogado");

                    window.location.href = "/index.html";
                });
            }
        }
    })
    .catch(erro => {
        console.error("Erro ao carregar o header:", erro);
    });


// ==========================================
// CSS DO HEADER
// ==========================================

const css = document.createElement("link");

css.rel = "stylesheet";

css.href = new URL("header.css", caminhoComponentes);

document.head.appendChild(css);


// ==========================================
// FOOTER
// ==========================================

fetch(new URL("footer.html", caminhoComponentes))
    .then(resposta => resposta.text())
    .then(footer => {

        const elementoFooter = document.getElementById("footer");

        if (elementoFooter) {
            elementoFooter.innerHTML = footer;
        }
    })
    .catch(erro => {
        console.error("Erro ao carregar o footer:", erro);
    });


// ==========================================
// CSS DO FOOTER
// ==========================================

const cssFooter = document.createElement("link");

cssFooter.rel = "stylesheet";

cssFooter.href = new URL("footer.css", caminhoComponentes);

document.head.appendChild(cssFooter);

// ==========================================
// BOTÕES
// ==========================================

fetch(new URL("botoes.html", caminhoComponentes))
    .then(resposta => resposta.text())
    .then(botoes => {

        const elementoBotoes = document.getElementById("botoes");

        if (elementoBotoes) {
            elementoBotoes.innerHTML = botoes;
        }
    })
    .catch(erro => {
        console.error("Erro ao carregar os botões:", erro);
    });


// ==========================================
// CSS DOS BOTÕES
// ==========================================

const cssBotoes = document.createElement("link");

cssBotoes.rel = "stylesheet";

cssBotoes.href = new URL("botoes.css", caminhoComponentes);

document.head.appendChild(cssBotoes);