
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

    const mensagemPerfilStatus =
        document.getElementById("mensagem-perfil-status");


    // ==========================================
    // ELEMENTOS DO FORMULÁRIO DE PERFIL
    // ==========================================

    const editarNome = document.getElementById("editar-nome");
    const editarTelefone = document.getElementById("editar-telefone");
    const editarNascimento = document.getElementById("editar-nascimento");
    const editarGenero = document.getElementById("editar-genero");


    // ==========================================
    // ELEMENTOS DA ALTERAÇÃO DE SENHA
    // ==========================================

    const btnAlterarSenha =
        document.getElementById("btn-alterar-senha");

    const formAlterarSenha =
        document.getElementById("form-alterar-senha");

    const btnCancelarSenha =
        document.getElementById("btn-cancelar-senha");

    const senhaAtual =
        document.getElementById("senha-atual");

    const novaSenha =
        document.getElementById("nova-senha");

    const confirmarSenha =
        document.getElementById("confirmar-senha");

    const mensagemSenha =
        document.getElementById("mensagem-senha");


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
    // ABRIR EDIÇÃO DO PERFIL
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
    // CANCELAR EDIÇÃO DO PERFIL
    // ==========================================

    btnCancelar.addEventListener("click", () => {

        // Esconde o formulário
        formEditar.classList.add("hidden");

        // Mostra novamente o botão
        btnEditar.classList.remove("hidden");

    });


    // ==========================================
    // SALVAR ALTERAÇÕES DO PERFIL
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

            const resposta = await fetch(
                "http://localhost:3000/usuarios/perfil",
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(dadosAtualizados)
                }
            );


            const dados = await resposta.json();


            // Se ocorreu algum erro
            if (!resposta.ok) {

                mostrarMensagemPerfil(
                    dados.mensagem ||
                    "Não foi possível atualizar o perfil.",
                    "erro"
                );

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


            // Mostra mensagem
            mostrarMensagemPerfil(
                dados.mensagem,
                "sucesso"
            );

        } catch (erro) {

            console.error(
                "Erro ao atualizar perfil:",
                erro
            );

            mostrarMensagemPerfil(
                "Não foi possível conectar ao servidor.",
                "erro"
            );

        }

    });


    // ==========================================
    // ABRIR ALTERAÇÃO DE SENHA
    // ==========================================

    btnAlterarSenha.addEventListener("click", () => {

        // Limpa os campos
        senhaAtual.value = "";
        novaSenha.value = "";
        confirmarSenha.value = "";

        // Esconde o botão
        btnAlterarSenha.classList.add("hidden");

        // Mostra o formulário
        formAlterarSenha.classList.remove("hidden");

    });


    // ==========================================
    // CANCELAR ALTERAÇÃO DE SENHA
    // ==========================================

    btnCancelarSenha.addEventListener("click", () => {

        // Limpa os campos
        senhaAtual.value = "";
        novaSenha.value = "";
        confirmarSenha.value = "";

        // Esconde o formulário
        formAlterarSenha.classList.add("hidden");

        // Mostra novamente o botão
        btnAlterarSenha.classList.remove("hidden");

    });


    // ==========================================
    // ALTERAR SENHA
    // ==========================================

    formAlterarSenha.addEventListener("submit", async (evento) => {

        evento.preventDefault();


        // ==========================================
        // VERIFICA SE AS SENHAS SÃO IGUAIS
        // ==========================================

        if (novaSenha.value !== confirmarSenha.value) {

            mostrarMensagemSenha(
                "As novas senhas não coincidem.",
                "erro"
            );

            return;

        }


        // ==========================================
        // ENVIA PARA O BACKEND
        // ==========================================

        try {

            const resposta = await fetch(
                "http://localhost:3000/usuarios/senha",
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        id: usuario.id,
                        senhaAtual: senhaAtual.value,
                        novaSenha: novaSenha.value

                    })
                }
            );


            const dados = await resposta.json();


            // ==========================================
            // ERRO
            // ==========================================

            if (!resposta.ok) {

                mostrarMensagemSenha(
                    dados.mensagem ||
                    "Não foi possível alterar a senha.",
                    "erro"
                );

                return;

            }


            // ==========================================
            // SUCESSO
            // ==========================================

            senhaAtual.value = "";
            novaSenha.value = "";
            confirmarSenha.value = "";


            // Fecha o formulário
            formAlterarSenha.classList.add("hidden");


            // Mostra novamente o botão
            btnAlterarSenha.classList.remove("hidden");


            // Mostra mensagem
            mostrarMensagemPerfil(
                dados.mensagem,
                "sucesso"
            );


        } catch (erro) {

            console.error(
                "Erro ao alterar senha:",
                erro
            );

            mostrarMensagemSenha(
                "Não foi possível conectar ao servidor.",
                "erro"
            );

        }

    });


    // ==========================================
    // MENSAGEM DO PERFIL
    // ==========================================

    function mostrarMensagemPerfil(
        mensagem,
        tipo
    ) {

        mensagemPerfilStatus.textContent = mensagem;

        mensagemPerfilStatus.classList.remove(
            "hidden",
            "sucesso",
            "erro"
        );

        mensagemPerfilStatus.classList.add(tipo);


        setTimeout(() => {

            mensagemPerfilStatus.classList.add("hidden");

            mensagemPerfilStatus.classList.remove(
                "sucesso",
                "erro"
            );

        }, 3000);

    }


    // ==========================================
    // MENSAGEM DA SENHA
    // ==========================================

    function mostrarMensagemSenha(
        mensagem,
        tipo
    ) {

        mensagemSenha.textContent = mensagem;

        mensagemSenha.classList.remove(
            "hidden",
            "sucesso",
            "erro"
        );

        mensagemSenha.classList.add(tipo);


        setTimeout(() => {

            mensagemSenha.classList.add("hidden");

            mensagemSenha.classList.remove(
                "sucesso",
                "erro"
            );

        }, 3000);

    }

});