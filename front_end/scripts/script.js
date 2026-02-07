const API_URL = "http://localhost:8080/api";

// ================== LOGIN & AUTH ==================
async function fazerLogin(event) {
    event.preventDefault();
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;

    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: user, password: pass })
        });

        if (res.ok) {
            const dados = await res.json();
            localStorage.setItem("usuario", JSON.stringify(dados));
            window.location.href = "index.html";
        } else {
            alert("Usuário ou senha incorretos!");
        }
    } catch (e) { alert("Erro ao conectar no servidor."); }
}

function verificarAutenticacao() {
    if (document.getElementById("form-login")) return; // Não verifica na tela de login

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) {
        // Redireciona para login se tentar acessar páginas internas
        const isPage = window.location.pathname.includes("pages") || window.location.pathname.includes("admin");
        if (isPage) window.location.href = "../login.html";
        return;
    }

    const nomeDisplay = document.getElementById("user-display");
    if(nomeDisplay) nomeDisplay.innerText = `Olá, ${usuario.username}`;

    const btnAdmin = document.getElementById("btn-admin");
    if (btnAdmin && usuario.role === "ADMIN") {
        btnAdmin.style.display = "inline-block";
    }
}

function logout() {
    localStorage.removeItem("usuario");
    localStorage.removeItem("carrinho"); // Opcional: limpar carrinho ao sair
    window.location.href = "../login.html";
}

// ================== VITRINE (Listar Produtos) ==================
async function carregarProdutos() {
    const lista = document.getElementById("lista-produtos");
    if (!lista) return;

    let url = `${API_URL}/produtos`;
    if (typeof categoriaPage !== 'undefined') url += `?categoria=${categoriaPage}`;

    const res = await fetch(url);
    const produtos = await res.json();

    lista.innerHTML = "";
    if(produtos.length === 0) lista.innerHTML = "<p>Nenhum produto nesta categoria.</p>";

    produtos.forEach(p => {
        const div = document.createElement("div");
        div.className = "produto-card";
        div.innerHTML = `
            <h3>${p.nome}</h3>
            <p class="preco">R$ ${p.preco.toFixed(2)}</p>
            <p>Estoque: ${p.estoque}</p>
            ${p.estoque > 0 
                // Passamos os dados do produto para a função do carrinho
                ? `<button class="btn-comprar" onclick="adicionarAoCarrinho(${p.id}, '${p.nome}', ${p.preco})">Comprar</button>` 
                : `<strong style="color:red">Esgotado</strong>`}
        `;
        lista.appendChild(div);
    });
}

// ================== LÓGICA DO CARRINHO ==================
function adicionarAoCarrinho(id, nome, preco) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    
    // Verifica se já existe para aumentar a quantidade
    const itemExistente = carrinho.find(item => item.id === id);
    if (itemExistente) {
        itemExistente.qtd += 1;
    } else {
        carrinho.push({ id, nome, preco, qtd: 1 });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert(`${nome} adicionado ao carrinho!`);
}

function carregarPaginaCarrinho() {
    const tbody = document.getElementById("lista-carrinho");
    const totalSpan = document.getElementById("total-valor");
    if (!tbody) return;

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    tbody.innerHTML = "";
    let total = 0;

    if (carrinho.length === 0) {
        tbody.innerHTML = "<tr><td colspan='5'>Seu carrinho está vazio.</td></tr>";
        totalSpan.innerText = "0.00";
        return;
    }

    carrinho.forEach((item, index) => {
        const subtotal = item.preco * item.qtd;
        total += subtotal;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.nome}</td>
            <td>R$ ${item.preco.toFixed(2)}</td>
            <td>${item.qtd}</td>
            <td>R$ ${subtotal.toFixed(2)}</td>
            <td><button class="btn-del" onclick="removerDoCarrinho(${index})">❌</button></td>
        `;
        tbody.appendChild(row);
    });

    totalSpan.innerText = total.toFixed(2);
}

function removerDoCarrinho(index) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.splice(index, 1); // Remove o item pelo índice
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    carregarPaginaCarrinho(); // Recarrega a tabela
}

// ================== PAGAMENTO ==================
function carregarResumoPagamento() {
    const divResumo = document.getElementById("resumo-pagamento");
    if (!divResumo) return;

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let total = carrinho.reduce((acc, item) => acc + (item.preco * item.qtd), 0);

    if (carrinho.length === 0) {
        divResumo.innerHTML = "<p>Não há itens para pagar.</p>";
        document.getElementById("btn-confirmar").style.display = "none";
    } else {
        divResumo.innerHTML = `
            <h3>Resumo do Pedido</h3>
            <p>Total de Itens: ${carrinho.length}</p>
            <p class="preco">Total a Pagar: R$ ${total.toFixed(2)}</p>
        `;
    }
}

function confirmarPagamento() {
    alert("✅ Pagamento confirmado com sucesso! Obrigado pela compra.");
    localStorage.removeItem("carrinho"); // Limpa o carrinho
    window.location.href = "../index.html"; // Volta para a home
}

// ================== ADMIN ==================
// (Mantive a mesma lógica do admin que já te passei antes)
async function carregarAdmin() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario || usuario.role !== "ADMIN") return; // Segurança básica

    const res = await fetch(`${API_URL}/produtos`);
    const produtos = await res.json();

    renderTabela(produtos, "acessorios", "tb-acessorios");
    renderTabela(produtos, "calcados", "tb-calcados");
    renderTabela(produtos, "camisetas", "tb-camisetas");
    renderTabela(produtos, "perfumes", "tb-perfumes");
}

function renderTabela(lista, cat, idTabela) {
    const tbody = document.getElementById(idTabela);
    if(!tbody) return;
    tbody.innerHTML = "";
    const filtrados = lista.filter(p => p.categoria === cat);
    filtrados.forEach(p => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${p.id}</td><td>${p.nome}</td><td>${p.estoque}</td>
                         <td><button class="btn-del" onclick="deletarProduto(${p.id})">Excluir</button></td>`;
        tbody.appendChild(row);
    });
}
async function adicionarProduto(e) { /* ...Código anterior... */ }
async function deletarProduto(id) { 
    if(confirm("Excluir?")) {
        await fetch(`${API_URL}/produtos/${id}`, { method: "DELETE" });
        carregarAdmin();
    }
}

// ================== INICIALIZADOR ==================
document.addEventListener("DOMContentLoaded", () => {
    verificarAutenticacao();
    if (document.getElementById("lista-produtos")) carregarProdutos();
    if (document.getElementById("lista-carrinho")) carregarPaginaCarrinho();
    if (document.getElementById("resumo-pagamento")) carregarResumoPagamento();
    if (document.getElementById("painel-admin")) carregarAdmin();
});