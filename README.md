# 🎮 Loja Geek - E-commerce Full Stack

Bem-vindo ao projeto **Loja Geek**! Este é um sistema completo de comércio eletrônico desenvolvido com **Java Spring Boot** no Backend e **HTML/CSS/JS** puro no Frontend.

O sistema possui controle de acesso (Login), onde **Administradores** podem gerenciar o estoque e **Clientes** podem fazer compras.

---

## 🚀 Tecnologias Utilizadas

* **Backend:** Java 17+, Spring Boot 3, Spring Data JPA.
* **Banco de Dados:** MySQL.
* **Frontend:** HTML5, CSS3, JavaScript (Fetch API).
* **Ferramentas:** Maven, VS Code (ou IntelliJ/Eclipse).

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
Abra seu MySQL Workbench (ou terminal) e execute o script abaixo para criar o banco e os dados iniciais:

SQL
```
-- ====================================================
-- 1. CRIAÇÃO DO BANCO DE DADOS
-- ====================================================
CREATE DATABASE IF NOT EXISTS ecommerce;
USE ecommerce;

-- ====================================================
-- 2. TABELA DE USUÁRIOS (Login e Senha)
-- ====================================================
-- Remove a tabela antiga se existir para recriar do zero
DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    role VARCHAR(20) NOT NULL -- Define se é 'ADMIN' ou 'USER'
);

-- Inserindo usuários de teste
INSERT INTO usuarios (username, password, role) VALUES 
('admin', '123', 'ADMIN'),   -- Pode acessar o painel de estoque
('cliente', '123', 'USER');  -- Só pode comprar

-- ====================================================
-- 3. TABELA DE PRODUTOS
-- ====================================================
-- Remove a tabela antiga se existir
DROP TABLE IF EXISTS produtos;

CREATE TABLE produtos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL, -- DECIMAL é melhor para dinheiro
    estoque INT NOT NULL,
    categoria VARCHAR(50) NOT NULL
);

-- ====================================================
-- 4. POPULANDO O ESTOQUE (36 PRODUTOS)
-- ====================================================

-- 1. INSERE 20 CAMISETAS
INSERT INTO produtos (nome, preco, quantidade, categoria) VALUES 
('Camiseta Star Wars', 59.90, 15, 'camisetas'),
('Camiseta Marvel', 49.90, 20, 'camisetas'),
('Camiseta DC Comics', 49.90, 18, 'camisetas'),
('Camiseta Harry Potter', 55.00, 12, 'camisetas'),
('Camiseta Senhor dos Anéis', 60.00, 10, 'camisetas'),
('Camiseta Naruto', 45.90, 25, 'camisetas'),
('Camiseta One Piece', 59.90, 8, 'camisetas'),
('Camiseta Dragon Ball Z', 49.90, 30, 'camisetas'),
('Camiseta Pokémon', 39.90, 50, 'camisetas'),
('Camiseta Super Mario', 45.00, 15, 'camisetas'),
('Camiseta Zelda', 55.00, 10, 'camisetas'),
('Camiseta Minecraft', 35.90, 40, 'camisetas'),
('Camiseta The Witcher', 65.00, 5, 'camisetas'),
('Camiseta Cyberpunk', 70.00, 7, 'camisetas'),
('Camiseta Stranger Things', 59.90, 12, 'camisetas'),
('Camiseta Friends', 49.90, 20, 'camisetas'),
('Camiseta The Office', 55.90, 15, 'camisetas'),
('Camiseta Rick and Morty', 59.90, 8, 'camisetas'),
('Camiseta De Volta Para o Futuro', 60.00, 10, 'camisetas'),
('Camiseta Matrix', 55.00, 6, 'camisetas');

-- 2. INSERE 20 ACESSÓRIOS
INSERT INTO produtos (nome, preco, quantidade, categoria) VALUES 
('Caneca Darth Vader', 35.90, 20, 'acessorios'),
('Chaveiro Thor', 15.00, 50, 'acessorios'),
('Boné Ash Ketchum', 45.00, 10, 'acessorios'),
('Colar Vira-Tempo', 29.90, 15, 'acessorios'),
('Mousepad Gamer RGB', 89.90, 5, 'acessorios'),
('Funko Pop Baby Yoda', 120.00, 8, 'acessorios'),
('Mochila Hogwarts', 150.00, 3, 'acessorios'),
('Carteira Pulp Fiction', 40.00, 12, 'acessorios'),
('Touca Hora de Aventura', 35.00, 10, 'acessorios'),
('Anel O Um Anel', 50.00, 20, 'acessorios'),
('Pin Broche Star Trek', 12.00, 40, 'acessorios'),
('Almofada Controle PS5', 45.00, 15, 'acessorios'),
('Luminária Pacman', 75.00, 6, 'acessorios'),
('Relógio Ben 10', 55.00, 8, 'acessorios'),
('Brincos Potara', 25.00, 30, 'acessorios'),
('Cinto Batman Utilidades', 60.00, 5, 'acessorios'),
('Óculos Tony Stark', 50.00, 12, 'acessorios'),
('Cachecol Grifinória', 45.00, 20, 'acessorios'),
('Adesivos Notebook Geek', 10.00, 100, 'acessorios'),
('Estojo Sabre de Luz', 25.00, 25, 'acessorios');

-- 3. INSERE 20 CALÇADOS
INSERT INTO produtos (nome, preco, quantidade, categoria) VALUES 
('Tênis Sonic Speed', 189.90, 10, 'calcados'),
('Pantufa Chewbacca', 89.90, 15, 'calcados'),
('Chinelo Havaianas Mario', 45.00, 30, 'calcados'),
('Tênis Vans Harry Potter', 250.00, 5, 'calcados'),
('Bota Jedi Couro', 320.00, 3, 'calcados'),
('Tênis All Star DC', 199.90, 8, 'calcados'),
('Pantufa Garra de Dragão', 65.00, 20, 'calcados'),
('Tênis LED Cyber', 150.00, 12, 'calcados'),
('Sandália Wonder Woman', 55.00, 18, 'calcados'),
('Chinelo Batman', 49.90, 25, 'calcados'),
('Tênis Pikachu Amarelo', 140.00, 7, 'calcados'),
('Sapato Social Stark', 280.00, 4, 'calcados'),
('Tênis Playstation', 210.00, 6, 'calcados'),
('Tênis Xbox Series', 210.00, 6, 'calcados'),
('Pantufa Unicórnio', 50.00, 20, 'calcados'),
('Crocs Star Wars', 120.00, 10, 'calcados'),
('Tênis NASA', 180.00, 9, 'calcados'),
('Meia Tênis Antiderrapante', 30.00, 50, 'calcados'),
('Coturno Caça Fantasmas', 230.00, 5, 'calcados'),
('Tênis De Volta p/ Futuro', 450.00, 2, 'calcados');

-- 4. INSERE 20 PERFUMES
INSERT INTO produtos (nome, preco, quantidade, categoria) VALUES 
('Perfume Iron Man Gold', 120.00, 15, 'perfumes'),
('Eau de Gotham Batman', 140.00, 10, 'perfumes'),
('Poção de Mana (Blue)', 85.00, 20, 'perfumes'),
('Poção de Vida (Red)', 85.00, 20, 'perfumes'),
('Essência de Lothlórien', 150.00, 5, 'perfumes'),
('Perfume Viúva Negra', 130.00, 8, 'perfumes'),
('Colônia Spider-Fresh', 60.00, 25, 'perfumes'),
('Fragrância Wakanda', 160.00, 7, 'perfumes'),
('Perfume Thor Storm', 110.00, 12, 'perfumes'),
('Elixir Hogwarts', 95.00, 15, 'perfumes'),
('Perfume Sailor Moon', 100.00, 10, 'perfumes'),
('Body Splash Peach', 45.00, 30, 'perfumes'),
('Perfume Jedi Spirit', 125.00, 6, 'perfumes'),
('Perfume Sith Passion', 125.00, 6, 'perfumes'),
('Essência Cyberpunk Neon', 90.00, 18, 'perfumes'),
('Perfume Retro Gamer', 70.00, 20, 'perfumes'),
('Colônia 8-Bit', 55.00, 22, 'perfumes'),
('Perfume Capitã Marvel', 135.00, 9, 'perfumes'),
('Fragrância Tardis Blue', 115.00, 11, 'perfumes'),
('Perfume Matrix Code', 99.90, 14, 'perfumes');
```

## ☕ Passo 2: Configurar e Rodar o Backend (Java)
Abra a pasta backend no seu VS Code (ou IDE de preferência).

Abra o arquivo: src/main/resources/application.properties.

**IMPORTANTE: Verifique se a senha do banco está correta:**

```
Properties
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce
spring.datasource.username=root
spring.datasource.password=SUA_SENHA_DO_MYSQL_AQUI
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
