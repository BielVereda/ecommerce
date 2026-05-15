const API_URL = "http://localhost:8080/products";

async function cadastrarProduto() {
    const produto = {
        nome: document.getElementById("nome").value,
        preco: parseFloat(document.getElementById("preco").value),
        qtd: parseInt(document.getElementById("qtd").value),
        categoria: document.getElementById("categoria").value
    };

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto)
    });

    alert("Produto cadastrado!");
    location.reload();
}