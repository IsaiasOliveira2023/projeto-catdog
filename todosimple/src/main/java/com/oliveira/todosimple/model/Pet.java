package com.oliveira.todosimple.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Pets")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long petId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 100)
    private String nome;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private TipoPet tipo;

    @Column(length = 50)
    private String cor;

    private Integer idade;

    public enum TipoPet {
        cão, gato
    }
}
