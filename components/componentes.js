
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