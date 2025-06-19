package com.oliveira.todosimple.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "Agendamentos")
@NoArgsConstructor
@AllArgsConstructor
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "pet_id", nullable = false)
    private Pet pet;

    private LocalDate data;
    private LocalTime hora;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Servico servico;

    private Integer dias;

    @Enumerated(EnumType.STRING)
    private Periodo periodo;

    private Boolean transporte;

    @Enumerated(EnumType.STRING)
    private TipoTransporte tipoTransporte;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal valorTotal;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private FormaPagamento formaPagamento;

    private BigDecimal trocoPara;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Status status;

    // Getters e Setters manuais (sem usar Lombok @Data para customizar setStatus)

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Pet getPet() {
        return pet;
    }

    public void setPet(Pet pet) {
        this.pet = pet;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public LocalTime getHora() {
        return hora;
    }

    public void setHora(LocalTime hora) {
        this.hora = hora;
    }

    public Servico getServico() {
        return servico;
    }

    public void setServico(Servico servico) {
        this.servico = servico;
    }

    public Integer getDias() {
        return dias;
    }

    public void setDias(Integer dias) {
        this.dias = dias;
    }

    public Periodo getPeriodo() {
        return periodo;
    }

    public void setPeriodo(Periodo periodo) {
        this.periodo = periodo;
    }

    public Boolean getTransporte() {
        return transporte;
    }

    public void setTransporte(Boolean transporte) {
        this.transporte = transporte;
    }

    public TipoTransporte getTipoTransporte() {
        return tipoTransporte;
    }

    public void setTipoTransporte(TipoTransporte tipoTransporte) {
        this.tipoTransporte = tipoTransporte;
    }

    public BigDecimal getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(BigDecimal valorTotal) {
        this.valorTotal = valorTotal;
    }

    public FormaPagamento getFormaPagamento() {
        return formaPagamento;
    }

    public void setFormaPagamento(FormaPagamento formaPagamento) {
        this.formaPagamento = formaPagamento;
    }

    public BigDecimal getTrocoPara() {
        return trocoPara;
    }

    public void setTrocoPara(BigDecimal trocoPara) {
        this.trocoPara = trocoPara;
    }

    public Status getStatus() {
        return status;
    }

    // Setter que aceita enum Status direto
    public void setStatus(Status status) {
        this.status = status;
    }

    // Setter que aceita String, converte para enum Status
    public void setStatus(String statusStr) {
        this.status = Status.fromValue(statusStr);
    }

    // Seus enums (Serviço, Periodo, TipoTransporte, FormaPagamento, Status) aqui (igual ao seu original)

    public enum Servico {
        hotelaria("hotelaria"),
        recreação("recreação"),
        banho_e_tosa("banho_e_tosa"),
        pet_taxi("pet_taxi");

        private final String value;

        Servico(String value) {
            this.value = value;
        }

        @JsonValue
        public String getValue() {
            return value;
        }

        @JsonCreator
        public static Servico fromValue(String value) {
            for (Servico s : Servico.values()) {
                if (s.value.equalsIgnoreCase(value)) {
                    return s;
                }
            }
            throw new IllegalArgumentException("Servico inválido: " + value);
        }
    }

    public enum Periodo {
        manhã("manhã"),
        tarde("tarde");

        private final String value;

        Periodo(String value) {
            this.value = value;
        }

        @JsonValue
        public String getValue() {
            return value;
        }

        @JsonCreator
        public static Periodo fromValue(String value) {
            for (Periodo p : Periodo.values()) {
                if (p.value.equalsIgnoreCase(value)) {
                    return p;
                }
            }
            throw new IllegalArgumentException("Periodo inválido: " + value);
        }
    }

    public enum TipoTransporte {
        só_levar("só_levar"),
        só_trazer("só_trazer"),
        levar_e_trazer("levar_e_trazer");

        private final String value;

        TipoTransporte(String value) {
            this.value = value;
        }

        @JsonValue
        public String getValue() {
            return value;
        }

        @JsonCreator
        public static TipoTransporte fromValue(String value) {
            for (TipoTransporte t : TipoTransporte.values()) {
                if (t.value.equalsIgnoreCase(value)) {
                    return t;
                }
            }
            throw new IllegalArgumentException("TipoTransporte inválido: " + value);
        }
    }

    public enum FormaPagamento {
        pix("pix"),
        cartão("cartão"),
        dinheiro("dinheiro");

        private final String value;

        FormaPagamento(String value) {
            this.value = value;
        }

        @JsonValue
        public String getValue() {
            return value;
        }

        @JsonCreator
        public static FormaPagamento fromValue(String value) {
            for (FormaPagamento fp : FormaPagamento.values()) {
                if (fp.value.equalsIgnoreCase(value)) {
                    return fp;
                }
            }
            throw new IllegalArgumentException("FormaPagamento inválida: " + value);
        }
    }

    public enum Status {
        pendente("pendente"),
        concluído("concluído"),
        cancelado("cancelado");

        private final String value;

        Status(String value) {
            this.value = value;
        }

        @JsonValue
        public String getValue() {
            return value;
        }

        @JsonCreator
        public static Status fromValue(String value) {
            for (Status s : Status.values()) {
                if (s.value.equalsIgnoreCase(value)) {
                    return s;
                }
            }
            throw new IllegalArgumentException("Status inválido: " + value);
        }
    }
}
