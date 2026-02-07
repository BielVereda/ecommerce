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
⚙️ Passo 1: Configurar o Banco de Dados
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
INSERT INTO produtos (nome, preco, estoque, categoria) VALUES

-- CATEGORIA: ACESSÓRIOS (9 Itens)
('Mochila do Batman', 199.90, 5, 'acessorios'),
('Boné do Naruto', 89.90, 10, 'acessorios'),
('Relógio do Homem-Aranha', 249.90, 2, 'acessorios'),
('Pulseira do Pikachu', 49.90, 15, 'acessorios'),
('Colar do Harry Potter', 39.90, 8, 'acessorios'),
('Carteira Star Wars', 79.90, 6, 'acessorios'),
('Chaveiro do Sonic', 29.90, 20, 'acessorios'),
('Touca do Mario Bros', 59.90, 7, 'acessorios'),
('Anel do Senhor dos Anéis', 129.90, 3, 'acessorios'),

-- CATEGORIA: CALÇADOS (9 Itens)
('Tênis do Sonic', 349.99, 5, 'calcados'),
('Tênis do Flash', 399.90, 3, 'calcados'),
('Tênis do Naruto', 379.90, 8, 'calcados'),
('Chinelo do Hulk', 49.90, 15, 'calcados'),
('Bota da Mulher-Maravilha', 450.00, 4, 'calcados'),
('Tênis do Homem de Ferro', 410.00, 6, 'calcados'),
('Pantufa do Yoda', 99.90, 10, 'calcados'),
('Sandália da Frozen', 69.90, 12, 'calcados'),
('Tênis do Goku', 389.90, 5, 'calcados'),

-- CATEGORIA: CAMISETAS (9 Itens)
('Camiseta do McQueen', 59.99, 10, 'camisetas'),
('Camiseta do Naruto', 79.99, 5, 'camisetas'),
('Camiseta do Homem-Aranha', 69.90, 15, 'camisetas'),
('Camiseta do Batman', 89.90, 8, 'camisetas'),
('Camiseta do Superman', 75.90, 12, 'camisetas'),
('Camiseta One Piece', 85.90, 7, 'camisetas'),
('Camiseta Stranger Things', 99.90, 6, 'camisetas'),
('Camiseta da Marvel', 65.90, 20, 'camisetas'),
('Camiseta do Minecraft', 55.90, 10, 'camisetas'),

-- CATEGORIA: PERFUMES (9 Itens)
('Perfume do Cebolinha', 69.99, 5, 'perfumes'),
('Perfume do Batman', 59.90, 3, 'perfumes'),
('Perfume da Mulher-Maravilha', 89.90, 10, 'perfumes'),
('Colônia do Homem-Aranha', 49.90, 15, 'perfumes'),
('Perfume da Barbie', 79.90, 8, 'perfumes'),
('Perfume Vingadores', 99.90, 4, 'perfumes'),
('Perfume da Frozen', 65.90, 12, 'perfumes'),
('Perfume do Mickey', 55.90, 10, 'perfumes'),
('Perfume do Homem de Ferro', 110.00, 5, 'perfumes');

-- ====================================================
-- FIM DO SCRIPT
-- ====================================================
```

☕ Passo 2: Configurar e Rodar o Backend (Java)
Abra a pasta backend no seu VS Code (ou IDE de preferência).

Abra o arquivo: src/main/resources/application.properties.

IMPORTANTE: Verifique se a senha do banco está correta:

```
Properties
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce
spring.datasource.username=root
spring.datasource.password=SUA_SENHA_DO_MYSQL_AQUI
spring.jpa.hibernate.ddl-auto=update
```

Execute o projeto!

No VS Code: Procure a classe EcommerceApplication.java e clique em Run (ou Play).

Aguarde aparecer no terminal: Started EcommerceApplication in ... seconds.

🌐 Passo 3: Rodar o Frontend
Não precisa de servidor complexo.

Vá até a pasta frontend.

Abra o arquivo login.html no seu navegador (Chrome, Edge, etc.).

Dica: Se usar o VS Code, instale a extensão Live Server, clique com o botão direito no login.html e escolha "Open with Live Server".

🔑 Como Usar (Logins)
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