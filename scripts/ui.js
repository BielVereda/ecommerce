// ===== ANIMAÇÃO DE ENTRADA DOS CARDS =====
window.addEventListener("load", () => {
    const produtos = document.querySelectorAll(".produto");

    produtos.forEach((produto, index) => {
        setTimeout(() => {
            produto.classList.add("show");
        }, index * 120);
    });
});

// ===== TEMA CLARO / ESCURO =====
const toggleBtn = document.getElementById("toggle-theme");

// mantém tema salvo
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const temaAtual = document.body.classList.contains("dark")
        ? "dark"
        : "light";

    localStorage.setItem("theme", temaAtual);
});