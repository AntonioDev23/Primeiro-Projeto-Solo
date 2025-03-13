
document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("menu");
    const hamburger = document.querySelector(".hamburger");
    const newsletterBtn = document.getElementById("newsletter-btn");
    const modal = document.getElementById("newsletter-modal");
    const closeBtn = document.querySelector(".close");
    const newsletterForm = document.getElementById("newsletter-form");
    const successMessage = document.getElementById("success-message");

    // Alterna o menu visível com animação
    hamburger.addEventListener("click", () => {
        menu.classList.toggle("menu-visivel");
    });

    // Fecha o menu ao clicar fora dele
    document.addEventListener("click", (e) => {
        if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
            menu.classList.remove("menu-visivel");
        }
    });

    // Abre o modal da newsletter
    newsletterBtn.addEventListener("click", (e) => {
        e.preventDefault();
        modal.style.display = "flex";
    });

    // Fecha o modal
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        resetForm();
    });

    // Fecha o modal ao clicar fora dele
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            resetForm();
        }
    });

    // Envia o formulário
    newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Simula o envio dos dados (aqui você pode adicionar uma requisição AJAX)
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;

        console.log("Nome:", nome);
        console.log("E-mail:", email);

        // Exibe a mensagem de sucesso
        newsletterForm.classList.add("hidden");
        successMessage.classList.remove("hidden");

        // Limpa o formulário após 3 segundos
        setTimeout(() => {
            resetForm();
            modal.style.display = "none";
        }, 3000);
    });

    // Função para resetar o formulário
    function resetForm() {
        newsletterForm.reset();
        newsletterForm.classList.remove("hidden");
        successMessage.classList.add("hidden");
    }
});