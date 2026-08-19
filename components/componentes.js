
const caminhoComponentes = new URL(".", import.meta.url);

fetch(new URL("logo.html", caminhoComponentes))
    .then(resposta => resposta.text())
    .then(logo => {
        const elementoLogo = document.getElementById("logo");

        if (elementoLogo) {
            elementoLogo.innerHTML = logo;
        }
    })
    .catch(erro => {
        console.error("Erro ao carregar o logo:", erro);
    });

const css = document.createElement("link");
css.rel = "stylesheet";
css.href = new URL("logo.css", caminhoComponentes);
document.head.appendChild(css);