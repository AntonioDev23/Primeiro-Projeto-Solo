
document.addEventListener("DOMContentLoaded", () => {

    const usuarioSalvo = localStorage.getItem("usuarioLogado");

    // Se não houver usuário logado, volta para o login
    if (!usuarioSalvo) {
        window.location.href = "/links/log.html";
        return;
    }

    const usuario = JSON.parse(usuarioSalvo);

    document.getElementById("perfil-nome").textContent =
        usuario.nome || "Não informado";

    document.getElementById("perfil-email").textContent =
        usuario.email || "Não informado";

    document.getElementById("perfil-telefone").textContent =
        usuario.telefone || "Não informado";

    document.getElementById("perfil-nascimento").textContent =
        usuario.nascimento || "Não informado";

    document.getElementById("perfil-genero").textContent =
        usuario.genero || "Não informado";
});