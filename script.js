
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

        if (usuarioLogado) {

            // Usuário está logado
            newsletterVisitante.classList.add("hidden");
            newsletterLogado.classList.remove("hidden");

            newsletterText.textContent =
                `Olá, ${usuarioLogado.nome}! Você deseja receber ofertas e novidades da ARSN?`;

        } else {

            // Usuário não está logado
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

        // Se estiver logado, usa o e-mail da conta
        if (usuarioLogado) {

            if (!aceitarOfertas.checked) {
                alert("Marque a opção para aceitar receber ofertas e novidades.");
                return;
            }

            email = usuarioLogado.email;

        } else {

            // Se não estiver logado, pega o e-mail digitado
            email = document.getElementById("email").value;
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
                alert(dados.mensagem);
                return;
            }

            // Outro erro
            if (!resposta.ok) {
                alert(dados.mensagem);
                return;
            }

            // Sucesso
            newsletterForm.classList.add("hidden");

            successMessage.textContent = dados.mensagem;
            successMessage.classList.remove("hidden");

            // Fecha depois de 3 segundos
            setTimeout(() => {
                resetForm();
                modal.style.display = "none";
            }, 3000);

        } catch (erro) {

            console.error(
                "Erro ao cadastrar na Newsletter:",
                erro
            );

            alert("Não foi possível conectar ao servidor.");
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