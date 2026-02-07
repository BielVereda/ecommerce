package com.loja.ecommerce.controller;
import com.loja.ecommerce.model.Produto;
import com.loja.ecommerce.repository.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/produtos")
@CrossOrigin(origins = "*") @RequiredArgsConstructor
public class ProdutoController {
    private final ProdutoRepository repository;

    @GetMapping
    public List<Produto> listar(@RequestParam(required = false) String categoria) {
        if (categoria != null) return repository.findByCategoria(categoria);
        return repository.findAll();
    }

    @PostMapping
    public Produto adicionar(@RequestBody Produto produto) {
        return repository.save(produto);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        repository.deleteById(id);
    }
}