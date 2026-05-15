let cart = [];

function addToCart(product) {
  cart.push(product);
  renderCart();
}

function renderCart() {
  const list = document.getElementById("cart-items");
  if (!list) return;
  list.innerHTML = "";
  cart.forEach((p, i) => {
    const item = document.createElement("div");
    item.className = "cart-item";
    item.innerHTML = `
      <h3>${p.name}</h3>
      <p>Preço: R$ ${p.price}</p>
      <p>Quantidade: 1</p>
      <button onclick="removeFromCart(${i})">Remover</button>
    `;
    list.appendChild(item);
  });
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

document.getElementById("checkout")?.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }
  alert("Compra finalizada com sucesso!");
  cart = [];
  renderCart();
});