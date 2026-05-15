package com.loja.ecommerce.controllers;

import com.loja.ecommerce.models.User;
import com.loja.ecommerce.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository repository;

    @PostMapping("/login")
    public User login(@RequestBody User login) {
        User user = repository.findByEmail(login.getEmail());
        if (user != null && user.getPassword().equals(login.getPassword())) {
            return user;
        }
        throw new RuntimeException("Email ou senha incorretos!");
    }

    @PostMapping("/register")
    public User register(@RequestBody User newUser) {
        User existing = repository.findByEmail(newUser.getEmail());
        if (existing != null) {
            throw new RuntimeException("Este email já está sendo usado!");
        }
        newUser.setRole("CLIENTE");
        return repository.save(newUser);
    }
}