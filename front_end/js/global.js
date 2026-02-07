// ARQUIVO: js/global.js
const API_URL = "http://localhost:8080/produtos";

document.addEventListener("DOMContentLoaded", () => {
    verificarLogin();

    // 1. DETECTOR DE PÁGINA
    if (document.getElementById("produtos-container")) {
        const path = window.location.pathname.toLowerCase(); 
        let categoria = null;

        if (path.includes("camiseta")) categoria = "camiseta";
        else if (path.includes("acessorio")) categoria = "acessorio";
        else if (path.includes("calcado")) categoria = "calcado";
        else if (path.includes("perfume")) categoria = "perfume";

        carregarProdutosHome(categoria);
    }

    if (document.getElementById("lista-carrinho")) carregarPaginaCarrinho();
});

// --- LOGIN ---
function verificarLogin() {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    const btnLogin = document.getElementById("link-login");
    const headerControls = document.querySelector(".header-controls");

    if (usuarioLogado) {
        if (btnLogin) btnLogin.style.display = "none";

        if (headerControls && !document.getElementById("btn-sair")) {
            const saudacao = document.createElement("span");
            saudacao.innerText = `Olá, ${usuarioLogado.nome.split(' ')[0]}! `;
            saudacao.style.color = "white";
            saudacao.style.fontWeight = "bold";
            saudacao.style.marginLeft = "15px";

            const btnSair = document.createElement("a");
            btnSair.id = "btn-sair";
            btnSair.innerText = "(Sair ❌)";
            btnSair.href = "#";
            btnSair.style.color = "#e74c3c";
            btnSair.style.fontWeight = "bold";
            btnSair.style.marginLeft = "10px";
            btnSair.style.textDecoration = "none";
            
            btnSair.onclick = (e) => {
                e.preventDefault();
                if (confirm("Sair da conta?")) {
                    localStorage.removeItem("usuarioLogado");
                    window.location.reload();
                }
            };

            headerControls.appendChild(saudacao);
            headerControls.appendChild(btnSair);
        }
    }
}

// --- CARREGAR PRODUTOS (COM BOTÃO SEGURO) ---
function carregarProdutosHome(categoriaFiltro = null) {
    const container = document.getElementById("produtos-container");
    if (!container) return;

    container.innerHTML = "<p>Carregando ofertas...</p>";

    fetch(API_URL)
        .then(res => res.json())
        .then(produtos => {
            container.innerHTML = "";
            let listaFiltrada = produtos;

            if (categoriaFiltro) {
                listaFiltrada = produtos.filter(p => {
                    if (!p.categoria) return false; 
                    return p.categoria.toLowerCase().includes(categoriaFiltro);
                });
            }

            if (listaFiltrada.length === 0) {
                container.innerHTML = "<p>Nenhum produto encontrado.</p>";
                return;
            }

            listaFiltrada.forEach(p => {
                const card = document.createElement("div");
                card.classList.add("produto-card");
                const esgotado = p.quantidade <= 0;

                // TRUQUE DE SEGURANÇA:
                // Guardamos os dados nos atributos 'data-' para evitar erros com aspas no nome
                card.innerHTML = `
                    <div class="img-placeholder">📦</div>
                    <h3>${p.nome}</h3>
                    <p class="preco">R$ ${p.preco.toFixed(2)}</p>
                    <p class="estoque">Restam: ${p.quantidade}</p>
                    
                    <div style="margin-bottom:10px">
                        <label>Qtd:</label>
                        <input type="number" id="qtd-${p.id}" value="1" min="1" max="${p.quantidade}" style="width:50px" ${esgotado ? 'disabled' : ''}>
                    </div>

                    <button 
                        class="btn-comprar"
                        data-id="${p.id}" 
                        data-nome="${p.nome.replace(/"/g, '&quot;')}" 
                        data-preco="${p.preco}"
                        onclick="processarCompra(this)" 
                        ${esgotado ? 'disabled' : ''}>
                        ${esgotado ? 'Esgotado' : '🛒 Comprar'}
                    </button>
                `;
                container.appendChild(card);
            });
        })
        .catch(err => {
            console.error(err);
            container.innerHTML = "<p>Erro ao carregar produtos.</p>";
        });
}

// --- NOVA FUNÇÃO INTERMEDIÁRIA ---
// Ela pega os dados do botão e manda para o carrinho
function processarCompra(botaoElemento) {
    const id = botaoElemento.getAttribute("data-id");
    const nome = botaoElemento.getAttribute("data-nome");
    const preco = parseFloat(botaoElemento.getAttribute("data-preco"));
    
    adicionarAoCarrinho(id, nome, preco);
}

// --- CARRINHO ---
function adicionarAoCarrinho(id, nome, preco) {
    // 1. Verifica Login
    if (!localStorage.getItem("usuarioLogado")) {
        alert("🔒 Faça login para comprar!");
        const isPages = window.location.pathname.includes("pages");
        window.location.href = isPages ? "../login.html" : "login.html";
        return;
    }

    // 2. Pega Quantidade
    const qtdInput = document.getElementById(`qtd-${id}`);
    const qtd = parseInt(qtdInput ? qtdInput.value : 1);
    
    if (qtd < 1) { alert("Quantidade inválida"); return; }

    // 3. Adiciona ao Storage
    let carrinho = JSON.parse(localStorage.getItem("carrinhoGeek")) || [];
    
    const existente = carrinho.find(item => item.id == id);
    if (existente) {
        existente.qtd += qtd;
    } else {
        carrinho.push({ id, nome, preco, qtd });
    }

    localStorage.setItem("carrinhoGeek", JSON.stringify(carrinho));
    
    // Feedback visual simples
    alert(`✅ Adicionado: ${qtd}x ${nome}`);
}

function carregarPaginaCarrinho() {
    const tbody = document.getElementById("lista-carrinho");
    const totalSpan = document.getElementById("total-valor");
    if (!tbody) return;

    const carrinho = JSON.parse(localStorage.getItem("carrinhoGeek")) || [];
    tbody.innerHTML = "";
    let total = 0;

    if (carrinho.length === 0) {
        tbody.innerHTML = "<tr><td colspan='5' style='text-align:center'>Seu carrinho está vazio 😢</td></tr>";
        if(totalSpan) totalSpan.innerText = "0.00";
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
            <td><button onclick="removerItem(${index})" style="color:red; border:none; background:none; cursor:pointer; font-size:1.2rem;">🗑️</button></td>
        `;
        tbody.appendChild(row);
    });

    if (totalSpan) totalSpan.innerText = total.toFixed(2);
}

function removerItem(index) {
    let carrinho = JSON.parse(localStorage.getItem("carrinhoGeek")) || [];
    carrinho.splice(index, 1);
    localStorage.setItem("carrinhoGeek", JSON.stringify(carrinho));
    carregarPaginaCarrinho();
}

// ==========================================
// 4. ADMIN (Se precisar)
// ==========================================
function carregarAdmin() {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (!usuario || usuario.tipo !== "ADMIN") {
    alert("Acesso negado!");
    window.location.href = "./../index.html";
    return;
  }
  // Aqui viria a lógica de carregar tabela de admin...
  console.log("Painel Admin carregado");
}