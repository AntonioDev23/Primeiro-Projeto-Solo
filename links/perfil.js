
document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // RECUPERA USUÁRIO LOGADO
    // ==========================================

    const usuarioSalvo = localStorage.getItem("usuarioLogado");

    if (!usuarioSalvo) {
        window.location.href = "/links/log.html";
        return;
    }

    const usuario = JSON.parse(usuarioSalvo);


    // ==========================================
    // ELEMENTOS DO PERFIL
    // ==========================================

    const perfilNome = document.getElementById("perfil-nome");
    const perfilEmail = document.getElementById("perfil-email");
    const perfilTelefone = document.getElementById("perfil-telefone");
    const perfilNascimento = document.getElementById("perfil-nascimento");
    const perfilGenero = document.getElementById("perfil-genero");

    const btnEditar = document.getElementById("btn-editar");
    const formEditar = document.getElementById("form-editar-perfil");
    const btnCancelar = document.getElementById("btn-cancelar");
    const mensagemPerfilStatus = document.getElementById("mensagem-perfil-status");


    // ==========================================
    // ELEMENTOS DO FORMULÁRIO
    // ==========================================

    const editarNome = document.getElementById("editar-nome");
    const editarTelefone = document.getElementById("editar-telefone");
    const editarNascimento = document.getElementById("editar-nascimento");
    const editarGenero = document.getElementById("editar-genero");


    // ==========================================
    // MOSTRA OS DADOS DO USUÁRIO
    // ==========================================

    function mostrarPerfil() {

        perfilNome.textContent = usuario.nome || "";
        perfilEmail.textContent = usuario.email || "";
        perfilTelefone.textContent = usuario.telefone || "";
        perfilNascimento.textContent = usuario.nascimento || "";
        perfilGenero.textContent = usuario.genero || "";
    }


    // Mostra os dados assim que a página carregar
    mostrarPerfil();


    // ==========================================
    // ABRIR EDIÇÃO
    // ==========================================

    btnEditar.addEventListener("click", () => {

        // Preenche o formulário com os dados atuais
        editarNome.value = usuario.nome || "";
        editarTelefone.value = usuario.telefone || "";
        editarNascimento.value = usuario.nascimento || "";
        editarGenero.value = usuario.genero || "";

        // Esconde o botão
        btnEditar.classList.add("hidden");

        // Mostra o formulário
        formEditar.classList.remove("hidden");
    });


    // ==========================================
    // CANCELAR EDIÇÃO
    // ==========================================

    btnCancelar.addEventListener("click", () => {

        // Esconde o formulário
        formEditar.classList.add("hidden");

        // Mostra novamente o botão
        btnEditar.classList.remove("hidden");
    });

    // ==========================================
// SALVAR ALTERAÇÕES
// ==========================================

formEditar.addEventListener("submit", async (evento) => {

    evento.preventDefault();

    const dadosAtualizados = {
        id: usuario.id,
        nome: editarNome.value,
        telefone: editarTelefone.value,
        nascimento: editarNascimento.value,
        genero: editarGenero.value
    };

    try {

        const resposta = await fetch("http://localhost:3000/usuarios/perfil", {
            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(dadosAtualizados)
        });

        const dados = await resposta.json();

        // Se ocorreu algum erro
        if (!resposta.ok) {

            alert(dados.mensagem || "Não foi possível atualizar o perfil.");

            return;
        }

        // ==========================================
        // ATUALIZA OS DADOS DO USUÁRIO
        // ==========================================

        usuario.nome = dados.usuario.nome;
        usuario.email = dados.usuario.email;
        usuario.telefone = dados.usuario.telefone;
        usuario.nascimento = dados.usuario.nascimento;
        usuario.genero = dados.usuario.genero;

        // Salva novamente no localStorage
        localStorage.setItem(
            "usuarioLogado",
            JSON.stringify(usuario)
        );

        // Atualiza o perfil na tela
        mostrarPerfil();

        // Fecha o formulário
        formEditar.classList.add("hidden");

        // Mostra novamente o botão editar
        btnEditar.classList.remove("hidden");

        mensagemPerfilStatus.textContent = dados.mensagem;
        mensagemPerfilStatus.classList.remove("hidden");
        mensagemPerfilStatus.classList.add("sucesso");

        setTimeout(() => {
            mensagemPerfilStatus.classList.add("hidden");
            mensagemPerfilStatus.classList.remove("sucesso");
        }, 3000);

    } catch (erro) {

        console.error("Erro ao atualizar perfil:", erro);

        alert("Não foi possível conectar ao servidor.");
    }

});

});