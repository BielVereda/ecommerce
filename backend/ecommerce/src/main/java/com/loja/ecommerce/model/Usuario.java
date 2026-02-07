package com.loja.ecommerce.model;
import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "usuarios")
@Data @NoArgsConstructor @AllArgsConstructor
public class Usuario {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private String role; // 'ADMIN' ou 'USER'
}