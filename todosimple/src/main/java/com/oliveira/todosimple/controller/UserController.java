package com.oliveira.todosimple.controller;

import com.oliveira.todosimple.model.User;
import com.oliveira.todosimple.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // já existente
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.save(user);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.delete(id);
    }

    // Novo endpoint para atualizar usuário
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        return userService.findById(id)
                .map(user -> {
                    user.setNome(userDetails.getNome());
                    user.setEmail(userDetails.getEmail());
                    user.setTelefone(userDetails.getTelefone());
                    // Atualize outros campos se tiver

                    User updatedUser = userService.save(user);
                    return ResponseEntity.ok(updatedUser);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Novo endpoint de login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        boolean sucesso = userService.login(loginRequest.getEmail(), loginRequest.getSenha());
        if (sucesso) {
            User user = userService.findByEmail(loginRequest.getEmail()).get();
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(401).body("Email ou senha inválidos");
        }
    }

    // Novo endpoint para recuperar senha
    @GetMapping("/recover")
    public ResponseEntity<?> recoverPassword(@RequestParam String email) {
        boolean enviado = userService.sendRecoveryEmail(email);
        if (enviado) {
            return ResponseEntity.ok("Instruções de recuperação enviadas para " + email);
        } else {
            return ResponseEntity.status(404).body("Email não encontrado");
        }
    }
}

// Classe auxiliar para login
class LoginRequest {
    private String email;
    private String senha;

    // getters e setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
}
