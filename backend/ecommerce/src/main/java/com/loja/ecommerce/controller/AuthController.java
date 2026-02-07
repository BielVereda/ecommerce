package com.loja.ecommerce.controller;
import com.loja.ecommerce.model.Usuario;
import com.loja.ecommerce.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/auth")
@CrossOrigin(origins = "*") @RequiredArgsConstructor
public class AuthController {
    private final UsuarioRepository repository;

    @PostMapping("/login")
    public ResponseEntity<Usuario> login(@RequestBody Usuario loginData) {
        return repository.findByUsernameAndPassword(loginData.getUsername(), loginData.getPassword())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(401).build());
    }
}