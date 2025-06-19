package com.oliveira.todosimple.service;

import com.oliveira.todosimple.model.Agendamento;
import com.oliveira.todosimple.repository.AgendamentoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;

    public AgendamentoService(AgendamentoRepository agendamentoRepository) {
        this.agendamentoRepository = agendamentoRepository;
    }

    public Agendamento save(Agendamento agendamento) {
        // depois aqui a gente implementa as regras de cálculo e validação
        return agendamentoRepository.save(agendamento);
    }

    public Optional<Agendamento> findById(Long id) {
        return agendamentoRepository.findById(id);
    }

    public List<Agendamento> findAll() {
        return agendamentoRepository.findAll();
    }

    public void delete(Long id) {
        agendamentoRepository.deleteById(id);
    }

    // Novo método para buscar agendamentos pelo userId (via pet)
    public List<Agendamento> findByUserId(Long userId) {
        return agendamentoRepository.findByPetUserUserId(userId);
    }
}
