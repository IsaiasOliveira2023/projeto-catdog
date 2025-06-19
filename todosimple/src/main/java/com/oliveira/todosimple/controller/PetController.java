package com.oliveira.todosimple.controller;

import com.oliveira.todosimple.model.Pet;
import com.oliveira.todosimple.service.PetService;
import com.oliveira.todosimple.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pets")
public class PetController {

    private final PetService petService;
    private final UserService userService;

    public PetController(PetService petService, UserService userService) {
        this.petService = petService;
        this.userService = userService;
    }

    @PostMapping("/{userId}")
    public ResponseEntity<Pet> createPet(@PathVariable Long userId, @RequestBody Pet pet) {
        return userService.findById(userId)
                .map(user -> {
                    pet.setUser(user);
                    Pet savedPet = petService.save(pet);
                    return ResponseEntity.ok(savedPet);
                }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Pet>> getPetsByUser(@PathVariable Long userId) {
        return userService.findById(userId)
                .map(user -> ResponseEntity.ok(petService.findByUser(user)))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void deletePet(@PathVariable Long id) {
        petService.delete(id);
    }
}
