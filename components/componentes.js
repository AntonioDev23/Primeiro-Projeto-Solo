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

                            <a href="/links/carrinho.html">
                                <i class="fas fa-shopping-cart"></i>
                                Carrinho
                            </a>

                            <a href="#" id="btn-sair">
                                <i class="fas fa-sign-out-alt"></i>
                                Sair
                            </a>

                        </div>

                    </div>
                `;

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