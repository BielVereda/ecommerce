const API_URL = "http://localhost:8080/products";

async function loadCategoryProducts(category) {
    const resp = await fetch(`${API_URL}?category=${category}`);
    const products = await resp.json();
    const list = document.getElementById("category-products");
    if (!list) return;
    list.innerHTML = "";
    products.forEach(p => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
        <img src="http://localhost:8080/uploads/${p.imageUrl}" alt="${p.name}" class="product-img">
        <h3>${p.name}</h3>
        <p>Preço: R$ ${p.price}</p>
        <p>Estoque: ${p.quantity}</p>
    `;
        list.appendChild(card);
    });
}