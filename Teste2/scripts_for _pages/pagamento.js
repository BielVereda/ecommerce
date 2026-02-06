// scripts_for_pages/pagamento.js

const resumo = document.getElementById("resumo-pedido");
const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

if (carrinho.length === 0) {
    resumo.innerHTML = "<p>Seu carrinho está vazio.</p>";
} else {
    let total = 0;

    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;

        const p = document.createElement("p");
        p.textContent = `${item.nome} — ${item.quantidade}x — R$ ${subtotal.toFixed(2)}`;
        resumo.appendChild(p);
    });

    const totalH2 = document.createElement("h2");
    totalH2.textContent = `Total a pagar: R$ ${total.toFixed(2)}`;
    resumo.appendChild(totalH2);
}

function finalizarPagamento() {
    alert("Pagamento realizado com sucesso! 🎉");
    localStorage.removeItem("carrinho");
    window.location.href = "../index.html";
}