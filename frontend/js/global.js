const API_URL = "http://localhost:8080/products";

async function carregarProdutosPorCategoria(categoria) {
    const resp = await fetch(`${API_URL}?category=${categoria}`);
    const produtos = await resp.json();
    const container = document.getElementById("produtos-container");
    container.innerHTML = "";
    produtos.forEach(p => {
        const card = document.createElement("div");
        card.className = "produto-card";
        card.innerHTML = `
        <div class="img-placeholder">🖼️</div>
        <h3>${p.nome}</h3>
        <p class="preco">R$ ${p.preco}</p>
        <p class="estoque">Estoque: ${p.qtd}</p>
        <button onclick="adicionarAoCarrinho('${p.id}')">Adicionar</button>
    `;
        container.appendChild(card);
    });
}
