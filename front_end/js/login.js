function fazerLogin() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const msgErro = document.getElementById('mensagem-erro');

    msgErro.style.display = 'none';

    const dados = { email: email, senha: senha };

    fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    })
        .then(response => {
            if (response.ok) return response.json();
            else throw new Error("Email ou senha incorretos");
        })
        .then(usuario => {
            localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

            if (usuario.tipo === "ADMIN") {
                window.location.href = "./admin.html";
            } else {
                // Manda para a home
                window.location.href = "./index.html";
            }
        })
        .catch(erro => {
            msgErro.innerText = erro.message;
            msgErro.style.display = 'block';
        });
}