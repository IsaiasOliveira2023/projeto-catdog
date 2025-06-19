import React, { useEffect, useState } from 'react';
import './AgendamentoPage.css';
import { useNavigate } from 'react-router-dom';

export default function AgendamentoPage({ user }) {
  const [pets, setPets] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);
  const [formData, setFormData] = useState({
    petId: '',
    data: '',
    hora: '',
    servico: '',
    formaPagamento: 'pix',
    trocoPara: '',
    dias: '',
    periodo: '',
    transporte: false,
    tipoTransporte: '',
  });
  const [valorTotal, setValorTotal] = useState(0);
  const navigate = useNavigate();

  // Buscar pets do usuário
  useEffect(() => {
    if (!user?.userId) return;
    fetch(`http://localhost:8080/pets/user/${user.userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPets(data);
        } else {
          console.error('Resposta pets não é um array:', data);
          setPets([]);
        }
      })
      .catch((err) => {
        console.error('Erro ao buscar pets:', err);
        setPets([]);
      });
  }, [user]);

  // Buscar agendamentos do usuário
  useEffect(() => {
    if (!user?.userId) return;
    fetch(`http://localhost:8080/agendamentos/user/${user.userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAgendamentos(data);
        } else {
          console.error('Resposta agendamentos não é um array:', data);
          setAgendamentos([]);
        }
      })
      .catch((err) => {
        console.error('Erro ao buscar agendamentos:', err);
        setAgendamentos([]);
      });
  }, [user]);

  const calcularTotal = () => {
    const pet = pets.find((p) => p.petId === parseInt(formData.petId));
    const isGato = pet?.tipo.toLowerCase() === 'gato';
    let total = 0;

    switch (formData.servico) {
      case 'hotelaria':
        total += (parseInt(formData.dias) || 0) * (isGato ? 75 : 90);
        if (formData.transporte) total += 50;
        break;
      case 'recreação':
        total += isGato ? 50 : 65;
        if (formData.transporte) total += 50;
        break;
      case 'banho_e_tosa':
        total += isGato ? 65 : 80;
        if (formData.transporte) total += 50;
        break;
      case 'pet_taxi':
        if (formData.tipoTransporte === 'só_levar' || formData.tipoTransporte === 'só_trazer') total += 30;
        if (formData.tipoTransporte === 'levar_e_trazer') total += 60;
        break;
      default:
        break;
    }

    setValorTotal(total);
  };

  useEffect(() => {
    calcularTotal();
  }, [formData, pets]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.petId) {
      alert('Por favor, selecione um pet.');
      return;
    }

    const agendamento = {
      data: formData.data,
      hora: formData.hora,
      servico: formData.servico,
      dias: formData.servico === 'hotelaria' ? parseInt(formData.dias) || 0 : null,
      periodo: formData.servico === 'recreação' ? formData.periodo : null,
      transporte: formData.transporte,
      tipoTransporte: formData.servico === 'pet_taxi' ? formData.tipoTransporte : null,
      formaPagamento: formData.formaPagamento,
      trocoPara: formData.formaPagamento === 'dinheiro' ? parseFloat(formData.trocoPara) || 0 : null,
      valorTotal: valorTotal,
      status: 'pendente',
    };

    fetch(`http://localhost:8080/agendamentos/${formData.petId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(agendamento),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao salvar agendamento');
        return res.json();
      })
      .then((data) => {
        setAgendamentos((prev) => [...prev, data]);
        alert('Agendamento realizado com sucesso!');
        setFormData({
          petId: '',
          data: '',
          hora: '',
          servico: '',
          formaPagamento: 'pix',
          trocoPara: '',
          dias: '',
          periodo: '',
          transporte: false,
          tipoTransporte: '',
        });
        setValorTotal(0);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="container">
      <h2>Agendar Serviço</h2>

      <button
        type="button"
        className="btn-secondary"
        style={{ marginBottom: '20px' }}
        onClick={() => navigate(-1)}
      >
        ← Voltar
      </button>

      <form onSubmit={handleSubmit} className="form-dados">
        <label>
          Pet:
          <select name="petId" value={formData.petId} onChange={handleChange} required>
            <option value="">Selecione</option>
            {pets.map((pet) => (
              <option key={pet.petId} value={pet.petId}>
                {pet.nome} ({pet.tipo})
              </option>
            ))}
          </select>
        </label>

        <label>
          Data:
          <input type="date" name="data" value={formData.data} onChange={handleChange} required />
        </label>

        <label>
          Hora:
          <input type="time" name="hora" value={formData.hora} onChange={handleChange} required />
        </label>

        <label>
          Serviço:
          <select name="servico" value={formData.servico} onChange={handleChange} required>
            <option value="">Selecione</option>
            <option value="hotelaria">Hotelaria</option>
            <option value="recreação">Recreação</option>
            <option value="banho_e_tosa">Banho & Tosa</option>
            <option value="pet_taxi">Pet Táxi</option>
          </select>
        </label>

        {formData.servico === 'hotelaria' && (
          <label>
            Dias:
            <input type="number" name="dias" value={formData.dias} onChange={handleChange} min="1" />
          </label>
        )}

        {formData.servico === 'recreação' && (
          <label>
            Período:
            <select name="periodo" value={formData.periodo} onChange={handleChange}>
              <option value="">Selecione</option>
              <option value="manhã">Manhã</option>
              <option value="tarde">Tarde</option>
            </select>
          </label>
        )}

        {['hotelaria', 'recreação', 'banho_e_tosa'].includes(formData.servico) && (
          <label>
            <input
              type="checkbox"
              name="transporte"
              checked={formData.transporte}
              onChange={handleChange}
            />{' '}
            Transporte
          </label>
        )}

        {formData.servico === 'pet_taxi' && (
          <label>
            Tipo de Transporte:
            <select name="tipoTransporte" value={formData.tipoTransporte} onChange={handleChange}>
              <option value="">Selecione</option>
              <option value="só_levar">Só Levar</option>
              <option value="só_trazer">Só Trazer</option>
              <option value="levar_e_trazer">Levar e Trazer</option>
            </select>
          </label>
        )}

        <label>
          Forma de pagamento:
          <select name="formaPagamento" value={formData.formaPagamento} onChange={handleChange}>
            <option value="pix">Pix</option>
            <option value="cartão">Cartão</option>
            <option value="dinheiro">Dinheiro</option>
          </select>
        </label>

        {formData.formaPagamento === 'dinheiro' && (
          <label>
            Troco para quanto?
            <input
              type="number"
              name="trocoPara"
              value={formData.trocoPara}
              onChange={handleChange}
              min="0"
              step="0.01"
            />
          </label>
        )}

        <p>
          <strong>Valor Total: R$ {valorTotal.toFixed(2)}</strong>
        </p>

        <button className="btn-primary" type="submit">
          Salvar
        </button>
      </form>

      {/* Tabela de agendamentos */}
      <h3>Agendamentos do Usuário</h3>
      {agendamentos.length === 0 ? (
        <p>Nenhum agendamento encontrado.</p>
      ) : (
        <table
          className="agendamento-table"
          border="1"
          cellPadding="5"
          cellSpacing="0"
          style={{ width: '100%', marginTop: '20px' }}
        >
          <thead>
            <tr>
              <th>Pet</th>
              <th>Data</th>
              <th>Hora</th>
              <th>Serviço</th>
              <th>Dias</th>
              <th>Período</th>
              <th>Transporte</th>
              <th>Tipo Transporte</th>
              <th>Valor Total (R$)</th>
              <th>Forma Pagamento</th>
              <th>Troco Para (R$)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {agendamentos
              .slice()
              .sort((a, b) => {
                const dateA = new Date(`${a.data}T${a.hora}`);
                const dateB = new Date(`${b.data}T${b.hora}`);
                return dateB - dateA; // mais recentes primeiro
              })
              .map((ag) => (
                <tr key={ag.id}>
                  <td>{ag.pet?.nome || '-'}</td>
                  <td>{ag.data}</td>
                  <td>{ag.hora}</td>
                  <td>{ag.servico}</td>
                  <td>{ag.dias !== null ? ag.dias : '-'}</td>
                  <td>{ag.periodo || '-'}</td>
                  <td>{ag.transporte ? 'Sim' : 'Não'}</td>
                  <td>{ag.tipoTransporte || '-'}</td>
                  <td>{ag.valorTotal?.toFixed(2) || '-'}</td>
                  <td>{ag.formaPagamento}</td>
                  <td>{ag.trocoPara !== null ? ag.trocoPara.toFixed(2) : '-'}</td>
                  <td>{ag.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
