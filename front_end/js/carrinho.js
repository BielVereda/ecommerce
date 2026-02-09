// js/carrinho.js

document.addEventListener("DOMContentLoaded", renderizarCarrinho);

function renderizarCarrinho() {
  const tbody = document.querySelector("#tabela-carrinho tbody");
  const totalSpan = document.getElementById("valor-total");

  // Pega do localStorage
  const carrinho = JSON.parse(localStorage.getItem("carrinhoGeek")) || [];

  tbody.innerHTML = "";
  let totalGeral = 0;

  if (carrinho.length === 0) {
    tbody.innerHTML =
      "<tr><td colspan='5' style='text-align:center'>Seu carrinho está vazio 😢</td></tr>";
    totalSpan.innerText = "0.00";
    return;
  }

  // Cria as linhas da tabela
  carrinho.forEach((item, index) => {
    const subtotal = item.preco * item.qtd;
    totalGeral += subtotal;

    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${item.nome}</td>
            <td>${item.qtd}</td>
            <td>R$ ${item.preco.toFixed(2)}</td>
            <td>R$ ${subtotal.toFixed(2)}</td>
            <td><button class="btn-remove" onclick="removerItem(${index})">❌</button></td>
        `;
    tbody.appendChild(tr);
  });

  totalSpan.innerText = totalGeral.toFixed(2);
}

// Remover um item da lista
function removerItem(index) {
  let carrinho = JSON.parse(localStorage.getItem("carrinhoGeek"));
  carrinho.splice(index, 1); // Remove pelo índice
  localStorage.setItem("carrinhoGeek", JSON.stringify(carrinho));
  renderizarCarrinho(); // Atualiza a tela
}

// O GRANDE FINAL: Mandar tudo pro Java
async function finalizarCompra() {
  // --- TRAVA DE SEGURANÇA EXTRA ---
  const usuarioLogado = localStorage.getItem("usuarioLogado");

  if (!usuarioLogado) {
    alert("🔒 Você precisa estar logado para fechar o pedido!");
    window.location.href = "./../login.html";
    return;
  }
  // --------------------------------

  const carrinho = JSON.parse(localStorage.getItem("carrinhoGeek")) || [];

  if (carrinho.length === 0) {
    alert("Carrinho vazio!");
    return;
  }

  if (!confirm(`Confirma a compra no valor total?`)) return;

  // Vamos processar item por item
  for (const item of carrinho) {
    try {
      // Chama a API do Java para descontar o estoque
      const resposta = await fetch(
        `http://localhost:8080/produtos/comprar/${item.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantidade: item.qtd }),
        },
      );

      if (!resposta.ok) {
        alert(`Erro ao comprar o item: ${item.nome} (Estoque insuficiente?)`);
      }
    } catch (erro) {
      console.error(erro);
      alert("Erro de conexão com o servidor.");
    }
  }

  // Se chegou aqui, limpamos o carrinho
  alert("Compra realizada com sucesso! 🎉 Obrigado!");
  localStorage.removeItem("carrinhoGeek");
  window.location.href = "./../index.html"; // Volta pra home
}