import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OasisPage.css';

export default function MeusDadosPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Se receber user no state, pega userId, senão redireciona
  const userFromState = location.state?.user;

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    endereco: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userFromState?.userId) {
      setError('Usuário não encontrado');
      return;
    }

    setLoading(true);
    fetch(`http://localhost:8080/users/${userFromState.userId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar dados do usuário');
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setFormData({
          nome: data.nome || '',
          email: data.email || '',
          cpf: data.cpf || '',
          telefone: data.telefone || '',
          endereco: data.endereco || '',
        });
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [userFromState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((old) => ({ ...old, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!user) {
      setError('Nenhum usuário carregado para salvar');
      return;
    }

    setLoading(true);
    fetch(`http://localhost:8080/users/${user.userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao salvar dados');
        return res.json();
      })
      .then((updatedUser) => {
        setUser(updatedUser);
        alert('Dados salvos com sucesso!');
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  const handleBack = () => {
    navigate('/', { state: { user: user || userFromState } });
  };

  if (error) {
    return (
      <div className="container">
        <p className="error">{error}</p>
        <button className="btn-secondary" onClick={() => navigate('/')}>
          Voltar
        </button>
      </div>
    );
  }

  if (loading) {
    return <p className="container">Carregando...</p>;
  }

  if (!user) {
    return null; // ou alguma mensagem
  }

  return (
    <div className="container">
      <h2>Meus Dados</h2>
      <form onSubmit={handleSave} className="form-dados">
        <label>
          Nome:
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          CPF:
          <input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Telefone:
          <input
            type="tel"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Endereço:
          <input
            type="text"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            required
          />
        </label>

        <div className="form-buttons">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
          <button type="button" className="btn-secondary" onClick={handleBack} disabled={loading}>
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
}
