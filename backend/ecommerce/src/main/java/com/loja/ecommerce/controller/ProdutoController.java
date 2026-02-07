package com.loja.ecommerce.controller;

import com.loja.ecommerce.model.Produto;
import com.loja.ecommerce.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/produtos")
@CrossOrigin(origins = "*")
public class ProdutoController {

    @Autowired
    private ProdutoRepository repository;

    // Listar todos os produtos
    @GetMapping
    public List<Produto> listar() {
        return repository.findAll();
    }

    // Cadastrar novo produto
    @PostMapping
    public Produto cadastrar(@RequestBody Produto produto) {
        return repository.save(produto);
    }

    // Deletar produto
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        repository.deleteById(id);
    }

    // NOVA FUNÇÃO: COMPRAR (Baixar Estoque)
    @PutMapping("/comprar/{id}")
    public ResponseEntity<?> comprarProduto(@PathVariable Long id, @RequestBody Map<String, Integer> dados) {
        // Pega a quantidade que o cliente digitou
        Integer quantidadeCompra = dados.get("quantidade");

        return repository.findById(id).map(produto -> {
            // Verifica se tem estoque suficiente
            if (produto.getQuantidade() >= quantidadeCompra) {
                // Matemática: Estoque Atual - Compra
                produto.setQuantidade(produto.getQuantidade() - quantidadeCompra);
                repository.save(produto); // Salva no banco
                return ResponseEntity.ok(produto);
            } else {
                return ResponseEntity.badRequest().body("Estoque insuficiente!");
            }
        }).orElse(ResponseEntity.notFound().build());
    }
}