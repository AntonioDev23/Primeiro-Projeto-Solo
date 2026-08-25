
document.addEventListener("DOMContentLoaded", () => {
    const newsletterBtn = document.getElementById("newsletter-btn");
    const modal = document.getElementById("newsletter-modal");
    const closeBtn = document.querySelector(".close");
    const newsletterForm = document.getElementById("newsletter-form");
    const successMessage = document.getElementById("success-message");
    const newsletterVisitante = document.getElementById("newsletter-visitante");
    const newsletterLogado = document.getElementById("newsletter-logado");
    const newsletterText = document.getElementById("newsletter-text");
    const aceitarOfertas = document.getElementById("aceitar-ofertas");

    console.log("SCRIPT.JS CARREGOU");

    // Recupera o usuário logado
    const usuarioLogado = JSON.parse(
        localStorage.getItem("usuarioLogado")
    );

    // Abre o modal
    newsletterBtn.addEventListener("click", (e) => {
        e.preventDefault();

        prepararNewsletter();

        modal.style.display = "flex";
    });

    // Prepara o conteúdo da Newsletter
    function prepararNewsletter() {

        // Limpa mensagens anteriores
        successMessage.classList.add("hidden");
        newsletterForm.classList.remove("hidden");

        if (usuarioLogado) {

            newsletterVisitante.classList.add("hidden");
            newsletterLogado.classList.remove("hidden");

            newsletterText.textContent =
                `Olá, ${usuarioLogado.nome}! Você deseja receber ofertas e novidades da ARSN?`;

        } else {

            newsletterVisitante.classList.remove("hidden");
            newsletterLogado.classList.add("hidden");

            newsletterText.textContent =
                "Receba promoções e novidades da ARSN.";
        }
    }

    // Fecha o modal
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        resetForm();
    });

    // Fecha ao clicar fora
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            resetForm();
        }
    });

    // Envia a Newsletter
    newsletterForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        let email;

        // Usuário logado
        if (usuarioLogado) {

            if (!aceitarOfertas.checked) {
                successMessage.textContent =
                    "Marque a opção para aceitar receber ofertas e novidades.";
                successMessage.classList.remove("hidden");

                setTimeout(() => {
                    resetForm();
                    modal.style.display = "none";
                }, 2000);

                return;
            }

            email = usuarioLogado.email;

        } else {

            // Usuário não logado
            email = document.getElementById("email").value.trim();

            if (!email) {
                successMessage.textContent =
                    "Digite seu e-mail para continuar.";
                successMessage.classList.remove("hidden");

                setTimeout(() => {
                    resetForm();
                    modal.style.display = "none";
                }, 2000);

                return;
            }
        }

        try {

            const resposta = await fetch("http://localhost:3000/newsletter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email
                })
            });

            const dados = await resposta.json();

            // E-mail já cadastrado
           if (resposta.status === 409) {

                newsletterForm.classList.add("hidden");

                successMessage.textContent =
                    dados.mensagem;

                successMessage.style.color = "#d4549a";

                successMessage.classList.remove("hidden");

                setTimeout(() => {
                    resetForm();
                    modal.style.display = "none";
                }, 2000);

            return;
    }

            // Outro erro
            if (!resposta.ok) {

                newsletterForm.classList.add("hidden");

                successMessage.textContent =
                    dados.mensagem;

                successMessage.classList.remove("hidden");

                setTimeout(() => {
                    resetForm();
                    modal.style.display = "none";
                }, 2000);

                return;
            }

            // Inscrição realizada
            newsletterForm.classList.add("hidden");

            successMessage.textContent =
                dados.mensagem;

            successMessage.classList.remove("hidden");

            // Fecha depois de 2 segundos
            setTimeout(() => {
                resetForm();
                modal.style.display = "none";
            }, 2000);

        } catch (erro) {

            console.error(
                "Erro ao cadastrar na Newsletter:",
                erro
            );

            newsletterForm.classList.add("hidden");

            successMessage.textContent =
                "Não foi possível conectar ao servidor.";

            successMessage.classList.remove("hidden");

            setTimeout(() => {
                resetForm();
                modal.style.display = "none";
            }, 2000);
        }
    });

    // Reseta o formulário
    function resetForm() {

        newsletterForm.reset();

        newsletterForm.classList.remove("hidden");

        successMessage.classList.add("hidden");

        newsletterVisitante.classList.remove("hidden");
        newsletterLogado.classList.add("hidden");
    }

    // Mostra no console se existe usuário logado
    if (usuarioLogado) {
        console.log("Usuário logado:", usuarioLogado.nome);
        console.log("E-mail:", usuarioLogado.email);
    }
});