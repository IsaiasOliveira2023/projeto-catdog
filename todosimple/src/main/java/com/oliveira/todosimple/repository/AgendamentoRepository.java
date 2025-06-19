package com.oliveira.todosimple.repository;

import com.oliveira.todosimple.model.Agendamento;
import com.oliveira.todosimple.model.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
    List<Agendamento> findByPet(Pet pet);

    // Novo método para buscar agendamentos pelo userId (via pet)
    List<Agendamento> findByPetUserUserId(Long userId);
}
