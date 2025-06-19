package com.oliveira.todosimple.service;

import com.oliveira.todosimple.model.User;
import com.oliveira.todosimple.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    // Busca por email (usa o repo)
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Login: verifica email e senha
    public boolean login(String email, String senha) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // Aqui compara a senha simples, ideal é usar hash/senha criptografada
            return user.getSenha().equals(senha);
        }
        return false;
    }

    // Recuperação: verifica se email existe e simula envio
    public boolean sendRecoveryEmail(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            // Aqui você pode implementar envio de email real depois
            System.out.println("Enviando email de recuperação para: " + email);
            return true;
        }
        return false;
    }
}
