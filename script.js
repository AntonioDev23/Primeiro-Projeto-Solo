
document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("menu");
    const hamburger = document.querySelector(".hamburger");
    const newsletterBtn = document.getElementById("newsletter-btn");
    const modal = document.getElementById("newsletter-modal");
    const closeBtn = document.querySelector(".close");

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
    });

    // Fecha o modal ao clicar fora dele
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});