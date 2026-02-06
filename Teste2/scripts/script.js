const listaProdutosDiv = document.getElementById("lista-produtos");
// ================== ESTOQUE (LOCALSTORAGE) ==================
function obterEstoque() {
    return JSON.parse(localStorage.getItem("estoqueProdutos")) || {};
}

function salvarEstoque(estoque) {
    localStorage.setItem("estoqueProdutos", JSON.stringify(estoque));
}

let estoqueSalvo = obterEstoque();

// Inicializa estoque se não existir
for (let key in produtos) {
    if (estoqueSalvo[key] === undefined) {
        estoqueSalvo[key] = produtos[key].estoque;
    }
}
salvarEstoque(estoqueSalvo);

// ================== RENDERIZAÇÃO ==================
if (listaProdutosDiv && typeof produtos !== "undefined") {
    for (let key in produtos) {
        const produto = produtos[key];
        produto.estoque = estoqueSalvo[key];

        const produtoDiv = document.createElement("div");
        produtoDiv.classList.add("produto");

        // Nome
        const nomeH3 = document.createElement("h3");
        nomeH3.textContent = produto.nome;

        // Preço
        const precoP = document.createElement("p");
        precoP.textContent = `Preço: R$ ${produto.preco.toFixed(2)}`;

        // Estoque
        const estoqueP = document.createElement("p");
        estoqueP.textContent = `Estoque: ${produto.estoque}`;

        // Disponibilidade
        const disponivelP = document.createElement("p");
        const statusSpan = document.createElement("span");

        const disponivel = produto.estoque > 0;
        statusSpan.textContent = disponivel ? "Disponível" : "Indisponível";
        statusSpan.classList.add(disponivel ? "disponivel" : "indisponivel");

        disponivelP.textContent = "Disponibilidade: ";
        disponivelP.appendChild(statusSpan);

        // Quantidade
        const qtdInput = document.createElement("input");
        qtdInput.type = "number";
        qtdInput.min = 1;
        qtdInput.value = 1;

        // Botão
        const btnCarrinho = document.createElement("button");
        btnCarrinho.textContent = "Adicionar ao carrinho";

        // Mensagem
        const mensagem = document.createElement("div");
        mensagem.classList.add("mensagem");

        // ================== EVENTO ==================
        btnCarrinho.onclick = () => {
            mensagem.textContent = "";
            mensagem.classList.remove("erro", "sucesso");

            const quantidade = Number(qtdInput.value);

            if (quantidade <= 0) {
                mensagem.textContent = "Quantidade inválida.";
                mensagem.classList.add("erro");
                return;
            } else if (quantidade > produto.estoque) {
                mensagem.textContent = "Quantidade indisponível em estoque.";
                mensagem.classList.add("erro");
                return;
            } else {
            mensagem.textContent = "Produto adicionado ao carrinho!";
            mensagem.classList.add("sucesso");
        }
        
        // Só altera estoque se existir carrinho
        if (mensagem.classList.contains("sucesso")) {
            // if (typeof adicionarAoCarrinho === "function")
            // adicionarAoCarrinho(produto, quantidade);
            
                // export const produto = quantidade;
                produto.estoque -= quantidade;
                estoqueSalvo[key] = produto.estoque;
                salvarEstoque(estoqueSalvo);
                console.log("Estoque atualizado:", estoqueP);

                estoqueP.textContent = `Estoque: ${produto.estoque}`;
            }

            if (produto.estoque === 0) {
                statusSpan.textContent = "Indisponível";
                statusSpan.className = "indisponivel";
                btnCarrinho.disabled = true;
            }
        };

        // Index não tem carrinho
        // if (typeof adicionarAoCarrinho === "function") {
        //     btnCarrinho.style.display = "none";
        //     qtdInput.style.display = "none";
        // }

        if (!disponivel) {
            btnCarrinho.disabled = true;
        }

        produtoDiv.append(
            nomeH3,
            precoP,
            estoqueP,
            disponivelP,
            qtdInput,
            btnCarrinho,
            mensagem
        );

        listaProdutosDiv.appendChild(produtoDiv);
    }
}