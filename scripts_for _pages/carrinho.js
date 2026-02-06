const lista = document.getElementById("lista-carrinho");

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
let produtosPorCategoria = JSON.parse(localStorage.getItem("produtos")) || {};

function salvar() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    localStorage.setItem("produtos", JSON.stringify(produtosPorCategoria));
}

function renderCarrinho() {
    lista.innerHTML = "";

    if (carrinho.length === 0) {
        lista.innerHTML = "<p>Carrinho vazio.</p>";
        return;
    }

    let total = 0;

    carrinho.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "produto";

        const subtotal = item.preco * item.quantidade;
        total += subtotal;

        const btnRemover = document.createElement("button");
        btnRemover.textContent = "🗑️ Remover";

        btnRemover.onclick = () => {
            devolverAoEstoque(item);
            carrinho.splice(index, 1);
            salvar();
            renderCarrinho();
        };

        div.innerHTML = `
            <h3>${item.nome}</h3>
            <p>Quantidade: ${item.quantidade}</p>
            <p>Subtotal: R$ ${subtotal.toFixed(2)}</p>
        `;

        div.appendChild(btnRemover);
        lista.appendChild(div);
    });

    const totalDiv = document.createElement("h2");
    totalDiv.textContent = `Total: R$ ${total.toFixed(2)}`;
    lista.appendChild(totalDiv);
}

function devolverAoEstoque(itemCarrinho) {
    const categoria = itemCarrinho.categoria;
    const produtos = produtosPorCategoria[categoria];

    const produto = produtos.find(p => p.id === itemCarrinho.id);

    if (produto) {
        produto.estoque += itemCarrinho.quantidade;
    }
}

renderCarrinho();