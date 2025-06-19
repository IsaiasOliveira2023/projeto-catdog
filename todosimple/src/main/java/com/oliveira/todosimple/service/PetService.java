package com.oliveira.todosimple.service;

import com.oliveira.todosimple.model.Pet;
import com.oliveira.todosimple.model.User;
import com.oliveira.todosimple.repository.PetRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PetService {

    private final PetRepository petRepository;

    public PetService(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    public Pet save(Pet pet) {
        return petRepository.save(pet);
    }

    public Optional<Pet> findById(Long id) {
        return petRepository.findById(id);
    }

    public List<Pet> findByUser(User user) {
        return petRepository.findByUser(user);
    }

    public void delete(Long id) {
        petRepository.deleteById(id);
    }
}
