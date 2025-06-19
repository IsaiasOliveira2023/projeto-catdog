package com.oliveira.todosimple.controller;

import com.oliveira.todosimple.model.User;
import com.oliveira.todosimple.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
public class LoginController {

    private final UserService userService;

    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        return userService.findByEmail(loginRequest.getEmail())
                .map(user -> {
                    if (user.getSenha().equals(loginRequest.getSenha())) { // ideal usar hash na senha!
                        return ResponseEntity.ok(user); // Retorna o usuário completo, incluindo userId
                    } else {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas");
                    }
                })
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas"));
    }

    // Classe interna para receber os dados JSON do login
    public static class LoginRequest {
        private String email;
        private String senha;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getSenha() {
            return senha;
        }

        public void setSenha(String senha) {
            this.senha = senha;
        }
    }
}
