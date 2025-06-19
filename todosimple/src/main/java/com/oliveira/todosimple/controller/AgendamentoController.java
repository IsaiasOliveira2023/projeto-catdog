package com.oliveira.todosimple.controller;

import com.oliveira.todosimple.model.Agendamento;
import com.oliveira.todosimple.service.AgendamentoService;
import com.oliveira.todosimple.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")  // libera CORS para frontend React
@RestController
@RequestMapping("/agendamentos")
public class AgendamentoController {

    private final AgendamentoService agendamentoService;
    private final PetService petService;

    @Autowired
    public AgendamentoController(AgendamentoService agendamentoService, PetService petService) {
        this.agendamentoService = agendamentoService;
        this.petService = petService;
    }

    // Criar agendamento para pet específico (id do pet na URL)
    @PostMapping("/{petId}")
    public ResponseEntity<Agendamento> criarAgendamento(@PathVariable Long petId, @RequestBody Agendamento agendamento) {
        return petService.findById(petId)
                .map(pet -> {
                    agendamento.setPet(pet);
                    Agendamento saved = agendamentoService.save(agendamento);
                    URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                            .path("/{id}")
                            .buildAndExpand(saved.getId())
                            .toUri();
                    return ResponseEntity.created(location).body(saved);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Listar todos os agendamentos
    @GetMapping
    public ResponseEntity<List<Agendamento>> listarTodos() {
        List<Agendamento> agendamentos = agendamentoService.findAll();
        return ResponseEntity.ok(agendamentos);
    }

    // Listar agendamentos de um usuário específico (via userId)
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Agendamento>> listarPorUsuario(@PathVariable Long userId) {
        List<Agendamento> agendamentos = agendamentoService.findByUserId(userId);
        return ResponseEntity.ok(agendamentos);
    }

    // Atualizar status do agendamento parcialmente
    @PatchMapping("/{id}")
    public ResponseEntity<Agendamento> atualizarStatus(@PathVariable Long id, @RequestBody Map<String, String> updates) {
        Optional<Agendamento> optionalAgendamento = agendamentoService.findById(id);
        if (!optionalAgendamento.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Agendamento agendamento = optionalAgendamento.get();

        if (updates.containsKey("status")) {
            agendamento.setStatus(updates.get("status"));
        } else {
            return ResponseEntity.badRequest().build();
        }

        Agendamento updated = agendamentoService.save(agendamento);
        return ResponseEntity.ok(updated);
    }

    // Deletar agendamento por id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarAgendamento(@PathVariable Long id) {
        agendamentoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
