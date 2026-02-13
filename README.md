# 🎮 Loja Geek - E-commerce Full Stack

Bem-vindo ao projeto **Loja Geek**! Este é um sistema completo de comércio eletrônico desenvolvido com **Java Spring Boot** no Backend e **HTML/CSS/JS** puro no Frontend.

O sistema possui controle de acesso (Login), onde **Administradores** podem gerenciar o estoque e **Clientes** podem fazer compras.

---

## 🚀 Tecnologias Utilizadas

- **Backend:** Java 17+, Spring Boot 3, Spring Data JPA.
- **Banco de Dados:** MySQL.
- **Frontend:** HTML5, CSS3, JavaScript (Fetch API).
- **Ferramentas:** Maven, VS Code (ou IntelliJ/Eclipse).

---

## 📂 Estrutura do Projeto

Certifique-se de que suas pastas estão organizadas assim:

```
Loja_Geek_Completa/
│
├── backend/            # Código Java (Spring Boot)
│   ├── src/
│   ├── pom.xml
│   └── ...
│
└── frontend/           # Site (HTML, CSS, JS)
    ├── index.html
    ├── login.html
    ├── admin.html
    ├── styles/
    ├── scripts/
    └── pages/
```

---

## ⚙️ Passo 1: Configurar o Banco de Dados

Abra seu MySQL Workbench e execute o script abaixo para criar o banco e os dados iniciais:

SQL

```
-- =======================================================
-- 1. LIMPEZA TOTAL (RESET)
-- =======================================================
DROP DATABASE IF EXISTS ecommerce;
DROP DATABASE IF EXISTS usuarios;

CREATE DATABASE ecommerce;
USE ecommerce;

-- =======================================================
-- 2. CRIAÇÃO DA TABELA DE USUÁRIOS (LOGIN)
-- =======================================================
CREATE TABLE usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo VARCHAR(20) DEFAULT 'CLIENTE' -- 'ADMIN' ou 'CLIENTE'
);

-- Cria o Usuário ADMIN Padrão
-- Login: E-mail: admin@geek.com | Senha: 123
INSERT INTO usuarios (nome, email, senha, tipo) VALUES
('Administrador', 'admin@geek.com', '123', 'ADMIN');

-- =======================================================
-- 3. CRIAÇÃO DA TABELA DE PRODUTOS
-- =======================================================
CREATE TABLE produtos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    quantidade INT NOT NULL,
    categoria VARCHAR(50) -- 'camisetas', 'acessorios', 'calcados', 'perfumes'
);

-- =======================================================
-- 4. INSERÇÃO DE 80 PRODUTOS (20 POR CATEGORIA)
-- =======================================================

-- --- A. 20 CAMISETAS ---
INSERT INTO produtos (nome, preco, quantidade, categoria) VALUES
('Camiseta Star Wars Classic', 59.90, 15,'camisetas'),
('Camiseta Marvel Heroes', 49.90, 20, 'camisetas'),
('Camiseta DC Batman', 49.90, 18, 'camisetas'),
('Camiseta Harry Potter Brasão', 55.00, 12, 'camisetas'),
('Camiseta O Senhor dos Anéis', 60.00, 10, 'camisetas'),
('Camiseta Naruto Shippuden', 45.90, 25, 'camisetas'),
('Camiseta One Piece Luffy', 59.90, 8, 'camisetas'),
('Camiseta Dragon Ball Z Goku', 49.90, 30, 'camisetas'),
('Camiseta Pokémon Pikachu', 39.90, 50, 'camisetas'),
('Camiseta Super Mario Bros', 45.00, 15, 'camisetas'),
('Camiseta Legend of Zelda', 55.00, 10, 'camisetas'),
('Camiseta Minecraft Creeper', 35.90, 40, 'camisetas'),
('Camiseta The Witcher Wolf', 65.00, 5, 'camisetas'),
('Camiseta Cyberpunk 2077', 70.00, 7, 'camisetas'),
('Camiseta Stranger Things', 59.90, 12, 'camisetas'),
('Camiseta Friends Logo', 49.90, 20, 'camisetas'),
('Camiseta The Office Dunder', 55.90, 15, 'camisetas'),
('Camiseta Rick and Morty', 59.90, 8, 'camisetas'),
('Camiseta De Volta Para o Futuro', 60.00, 10, 'camisetas'),
('Camiseta Matrix Code', 55.00, 6, 'camisetas');

-- --- B. 20 ACESSÓRIOS ---
INSERT INTO produto (nome, preco, quantidade, categoria) VALUES
('Caneca Darth Vader 3D', 45.90, 20, 'acessorios'),
('Chaveiro Martelo Thor', 15.00, 50, 'acessorios'),
('Boné Ash Ketchum', 45.00, 10, 'acessorios'),
('Colar Vira-Tempo Hermione', 29.90, 15, 'acessorios'),
('Mousepad Gamer RGB Extra G', 89.90, 5, 'acessorios'),
('Funko Pop Baby Yoda', 120.00, 8, 'acessorios'),
('Mochila Hogwarts Escolar', 150.00, 3, 'acessorios'),
('Carteira Pulp Fiction Bad', 40.00, 12, 'acessorios'),
('Touca Hora de Aventura Jake', 35.00, 10, 'acessorios'),
('Anel O Um Anel (Dourado)', 50.00, 20, 'acessorios'),
('Pin Broche Star Trek', 12.00, 40, 'acessorios'),
('Almofada Controle PS5', 45.00, 15, 'acessorios'),
('Luminária Pacman Ghost', 75.00, 6, 'acessorios'),
('Relógio Omnitrix Ben 10', 55.00, 8, 'acessorios'),
('Brincos Potara DBZ', 25.00, 30, 'acessorios'),
('Cinto Batman Utilidades', 60.00, 5, 'acessorios'),
('Óculos Tony Stark EDITH', 50.00, 12, 'acessorios'),
('Cachecol Grifinória Inverno', 45.00, 20, 'acessorios'),
('Kit Adesivos Dev Geek', 10.00, 100, 'acessorios'),
('Estojo Sabre de Luz', 25.00, 25, 'acessorios');

-- --- C. 20 CALÇADOS ---
INSERT INTO produto (nome, preco, quantidade, categoria) VALUES
('Tênis Sonic Speed Vermelho', 189.90, 10, 'calcados'),
('Pantufa Chewbacca Pelúcia', 89.90, 15, 'calcados'),
('Chinelo Havaianas Mario', 45.00, 30, 'calcados'),
('Tênis Vans Harry Potter', 250.00, 5, 'calcados'),
('Bota Jedi Couro Marrom', 320.00, 3, 'calcados'),
('Tênis All Star DC Comics', 199.90, 8, 'calcados'),
('Pantufa Garra de Dragão', 65.00, 20, 'calcados'),
('Tênis LED Cyberpunk', 150.00, 12, 'calcados'),
('Sandália Wonder Woman', 55.00, 18, 'calcados'),
('Chinelo Batman Morcego', 49.90, 25, 'calcados'),
('Tênis Pikachu Amarelo', 140.00, 7, 'calcados'),
('Sapato Social Tony Stark', 280.00, 4, 'calcados'),
('Tênis Playstation Oficial', 210.00, 6, 'calcados'),
('Tênis Xbox Series X Green', 210.00, 6, 'calcados'),
('Pantufa Unicórnio Colorida', 50.00, 20, 'calcados'),
('Crocs Star Wars Stormtrooper', 120.00, 10, 'calcados'),
('Tênis NASA Astronauta', 180.00, 9, 'calcados'),
('Meia Tênis Antiderrapante', 30.00, 50, 'calcados'),
('Coturno Caça Fantasmas', 230.00, 5, 'calcados'),
('Tênis Marty McFly Futuro', 450.00, 2, 'calcados');

-- --- D. 20 PERFUMES ---
INSERT INTO produto (nome, preco, quantidade, categoria) VALUES
('Perfume Iron Man Gold Edition', 120.00, 15, 'perfumes'),
('Eau de Gotham Batman Night', 140.00, 10, 'perfumes'),
('Poção de Mana (Blue Fragrance)', 85.00, 20, 'perfumes'),
('Poção de Vida (Red Fragrance)', 85.00, 20, 'perfumes'),
('Essência de Lothlórien Elf', 150.00, 5, 'perfumes'),
('Perfume Viúva Negra Secret', 130.00, 8, 'perfumes'),
('Colônia Spider-Fresh Web', 60.00, 25, 'perfumes'),
('Fragrância Wakanda Forever', 160.00, 7, 'perfumes'),
('Perfume Thor Stormbreaker', 110.00, 12, 'perfumes'),
('Elixir Hogwarts Mystery', 95.00, 15, 'perfumes'),
('Perfume Sailor Moon Crystal', 100.00, 10, 'perfumes'),
('Body Splash Princess Peach', 45.00, 30, 'perfumes'),
('Perfume Jedi Spirit Light', 125.00, 6, 'perfumes'),
('Perfume Sith Passion Dark', 125.00, 6, 'perfumes'),
('Essência Cyberpunk Neon City', 90.00, 18, 'perfumes'),
('Perfume Retro Gamer 8-bit', 70.00, 20, 'perfumes'),
('Colônia Pixel Art Fresh', 55.00, 22, 'perfumes'),
('Perfume Capitã Marvel Star', 135.00, 9, 'perfumes'),
('Fragrância Tardis Blue Box', 115.00, 11, 'perfumes'),
('Perfume Matrix Code Green', 99.90, 14, 'perfumes');
```

## ☕ Passo 2: Configurar e Rodar o Backend (Java)

Abra a pasta backend no seu VS Code (ou IDE de preferência).

Abra o arquivo: src/main/resources/application.properties.

**IMPORTANTE: Verifique se a senha do banco está correta:**

```
Properties
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce
spring.datasource.username=root
spring.datasource.password=root
spring.jpa.hibernate.ddl-auto=update
```

Execute o projeto!

No Intellij: Procure a classe EcommerceApplication.java e clique em Run (ou Play).

Aguarde aparecer no terminal: Started EcommerceApplication in ... seconds.

## 🌐 Passo 3: Rodar o Frontend

Não precisa de servidor complexo.

Vá até a pasta frontend.

Abra o arquivo login.html no seu navegador (Chrome, Edge, etc.).

Dica: Se usar o VS Code, instale a extensão Live Server, clique com o botão direito no login.html e escolha "Open with Live Server".

---

## 🔑 Como Usar (Logins)

O sistema possui dois níveis de acesso. Teste ambos!

```
1. Acesso ADMIN (Gerente)
Usuário: admin

Senha: 123

O que pode fazer:

Verá um botão laranja "⚙️ Gerenciar Estoque" no topo.

Pode adicionar novos produtos.

Pode excluir produtos existentes.

Visualiza tabelas separadas por categoria.
```

```
2. Acesso CLIENTE (Comum)
Usuário: cliente

Senha: 123

O que pode fazer:

Navegar pelas categorias.

Adicionar itens ao Carrinho.

Finalizar compras (simulação).

NÃO vê o botão de Admin.
```
