
document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("menu");
    const hamburger = document.querySelector(".hamburger");
    const produtos = document.querySelectorAll(".product");

    // Alterna o menu visível
    hamburger.addEventListener("click", () => {
        menu.classList.toggle("menu-visivel");
    });

    // Efeito nos produtos ao passar o mouse
    produtos.forEach(produto => {
        produto.addEventListener("mouseenter", () => {
            produto.style.transform = "scale(1.05)";
            produto.style.transition = "0.3s";
        });
        produto.addEventListener("mouseleave", () => {
            produto.style.transform = "scale(1)";
        });
    });

    // Adicionar popup para a newsletter
    const newsletterBtn = document.querySelector(".btn");
    newsletterBtn.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Inscrição realizada com sucesso!");
    });
});