import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PetsPage.css';

export default function PetsPage({ user }) {
  const navigate = useNavigate();

  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('cão');
  const [cor, setCor] = useState('');
  const [idade, setIdade] = useState('');

  useEffect(() => {
    if (!user || !user.userId) return;

    setLoading(true);
    fetch(`http://localhost:8080/pets/user/${user.userId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar pets');
        return res.json();
      })
      .then((data) => {
        setPets(data);
        setError(null);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [user]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!user || !user.userId) {
      setError('Usuário não está logado');
      return;
    }

    setLoading(true);

    const novoPet = {
      nome,
      tipo,
      cor,
      idade: idade ? Number(idade) : null,
    };

    fetch(`http://localhost:8080/pets/${user.userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoPet),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao cadastrar pet');
        return res.json();
      })
      .then((petCriado) => {
        setPets((oldPets) => [...oldPets, petCriado]);
        setNome('');
        setTipo('cão');
        setCor('');
        setIdade('');
        setError(null);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }

  function handleDelete(petId) {
    if (!window.confirm('Tem certeza que deseja excluir este pet?')) return;

    fetch(`http://localhost:8080/pets/${petId}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao excluir pet');
        setPets((old) => old.filter((pet) => pet.petId !== petId));
      })
      .catch((e) => setError(e.message));
  }

  if (!user) return <p className="error">Usuário não logado.</p>;

  return (
    <div className="pets-container">
      <button className="btn-back" onClick={() => navigate('/stage')}>
        ← Voltar ao Oásis
      </button>

      <h2>Meus Pets</h2>

      <form onSubmit={handleSubmit} className="pets-form">
        <div className="form-row">
          <div className="form-group">
            <label>Nome:</label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Tipo:</label>
            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option value="cão">cão</option>
              <option value="gato">gato</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Cor:</label>
            <input type="text" value={cor} onChange={(e) => setCor(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Idade:</label>
            <input type="number" min="0" value={idade} onChange={(e) => setIdade(e.target.value)} />
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Carregando...' : 'Cadastrar Pet'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <h3>Lista de Pets</h3>
      {loading && <p>Carregando pets...</p>}
      {!loading && pets.length === 0 && <p>Nenhum pet cadastrado.</p>}

      {!loading && pets.length > 0 && (
        <table className="pets-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Cor</th>
              <th>Idade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => (
              <tr key={pet.petId}>
                <td>{pet.nome}</td>
                <td>{pet.tipo}</td>
                <td>{pet.cor || '-'}</td>
                <td>{pet.idade ?? '-'}</td>
                <td>
                  <button className="btn-delete" onClick={() => handleDelete(pet.petId)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
