// HEADER
const caminhoComponentes = new URL(".", import.meta.url);

fetch(new URL("header.html", caminhoComponentes))
    .then(resposta => resposta.text())
    .then(header => {

        const elementoHeader = document.getElementById("header");

        if (elementoHeader) {
            elementoHeader.innerHTML = header;

            const titulo = document.title;
            const tituloPagina = document.getElementById("titulo-pagina");

            if (tituloPagina) {
                tituloPagina.textContent = titulo;
            }
        }
    })
    .catch(erro => {
        console.error("Erro ao carregar o header:", erro);
    });

const css = document.createElement("link");
css.rel = "stylesheet";
css.href = new URL("header.css", caminhoComponentes);
document.head.appendChild(css);

// FOOTER
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

const cssFooter = document.createElement("link");
cssFooter.rel = "stylesheet";
cssFooter.href = new URL("footer.css", caminhoComponentes);
document.head.appendChild(cssFooter);