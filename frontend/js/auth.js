const AUTH_URL = "http://localhost:8080/auth";

async function fazerLogin() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const resp = await fetch(`${AUTH_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
    });

    if (resp.ok) {
        alert("Login realizado!");
        window.location.href = "../index.html";
    } else {
        document.getElementById("mensagem-erro").innerText = "Email ou senha inválidos!";
    }
}

async function cadastrar() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const resp = await fetch(`${AUTH_URL}/cadastrar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha })
    });

    if (resp.ok) {
        alert("Conta criada com sucesso!");
        window.location.href = "login.html";
    } else {
        alert("Erro ao cadastrar!");
    }
}