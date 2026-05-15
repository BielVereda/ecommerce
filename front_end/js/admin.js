// LOGIN CHECK
const usuarioLogado = localStorage.getItem("usuarioLogado");
if (!usuarioLogado) {
    window.location.href = "login.html";
}
function logout() {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "login.html";
}

const API_URL = "http://localhost:8080/produtos";

// CARREGAR
document.addEventListener("DOMContentLoaded", () => {
    fetch(API_URL)
        .then(res => res.json())
        .then(produtos => renderizarTabelas(produtos))
        .catch(err => console.error(err));
});

function renderizarTabelas(produtos) {
    const container = document.getElementById("listas-produtos");
    container.innerHTML = "";

    const categorias = {
        'CAMISETA': '👕 Camisetas',
        'ACESSORIO': '🧢 Acessórios',
        'CALCADO': '👟 Calçados',
        'PERFUME': '🧴 Perfumes'
    };

    for (const [key, titulo] of Object.entries(categorias)) {
        const lista = produtos.filter(p => p.categoria === key);
        if (lista.length > 0) {
            let linhas = "";
            lista.forEach(p => {
                linhas += `
                            <tr>
                                <td>${p.id}</td>
                                <td>${p.nome}</td>
                                <td>R$ ${p.preco.toFixed(2)}</td>
                                <td>${p.quantidade}</td>
                                <td><button class="btn-delete" onclick="deletar(${p.id})">Excluir</button></td>
                            </tr>`;
            });

            container.innerHTML += `
                        <div class="categoria-section">
                            <div class="categoria-header"><h3>${titulo}</h3></div>
                            <table>
                                <thead><tr><th>ID</th><th>Nome</th><th>Preço</th><th>Estoque</th><th>Ação</th></tr></thead>
                                <tbody>${linhas}</tbody>
                            </table>
                        </div>`;
        }
    }
}

// CADASTRAR (SEM IMAGEM)
function cadastrarProduto() {
    const produto = {
        nome: document.getElementById("nome").value,
        preco: parseFloat(document.getElementById("preco").value),
        quantidade: parseInt(document.getElementById("qtd").value),
        categoria: document.getElementById("categoria").value,
        imagemUrl: "" // Enviamos vazio já que não tem imagem
    };

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto)
    }).then(() => {
        alert("Produto cadastrado!");
        location.reload();
    });
}

function deletar(id) {
    if (confirm("Excluir item?")) {
        fetch(`${API_URL}/${id}`, { method: "DELETE" }).then(() => location.reload());
    }
}