package com.loja.ecommerce.controller;

import com.loja.ecommerce.model.Usuario;
import com.loja.ecommerce.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth") // <--- MUDAMOS AQUI PARA "/auth" (Importante!)
@CrossOrigin(origins = "*")
public class LoginController {

    @Autowired
    private UsuarioRepository repository;

    // LOGIN
    @PostMapping("/login")
    public Usuario login(@RequestBody Usuario login) {
        Usuario usuario = repository.findByEmail(login.getEmail());
        // Verifica se achou e se a senha bate
        if(usuario != null && usuario.getSenha().equals(login.getSenha())) {
            return usuario;
        }
        // Se não achou ou senha errada
        throw new RuntimeException("Email ou senha incorretos!");
    }

    // CADASTRO (A parte nova)
    @PostMapping("/cadastrar")
    public Usuario cadastrar(@RequestBody Usuario novoUsuario) {
        System.out.println("Tentando cadastrar: " + novoUsuario.getNome());

        // Verifica se o email já existe
        Usuario existente = repository.findByEmail(novoUsuario.getEmail());
        if (existente != null) {
            throw new RuntimeException("Este email já está sendo usado!");
        }

        // Força ser CLIENTE (segurança)
        novoUsuario.setTipo("CLIENTE");

        return repository.save(novoUsuario);
    }
}