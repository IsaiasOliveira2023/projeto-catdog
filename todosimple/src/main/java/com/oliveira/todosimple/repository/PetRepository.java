package com.oliveira.todosimple.repository;

import com.oliveira.todosimple.model.Pet;
import com.oliveira.todosimple.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PetRepository extends JpaRepository<Pet, Long> {
    List<Pet> findByUser(User user);
}
