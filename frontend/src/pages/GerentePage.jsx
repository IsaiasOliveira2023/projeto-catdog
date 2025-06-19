import React, { useEffect, useState } from 'react';

export default function GerentePage() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editStatus, setEditStatus] = useState({}); // { id: novoStatus }
  const [savingIds, setSavingIds] = useState(new Set()); // controlar botões salvando
  const [deletingIds, setDeletingIds] = useState(new Set()); // controlar botões deletando
  const statusOptions = ['pendente', 'concluído', 'cancelado']; // status válidos

  // Carregar agendamentos
  useEffect(() => {
    fetch('http://localhost:8080/agendamentos')
      .then(res => res.json())
      .then(data => {
        setAgendamentos(data);
        setLoading(false);
      })
      .catch(err => {
        alert('Erro ao carregar agendamentos: ' + err.message);
        setLoading(false);
      });
  }, []);

  // Alterar o status localmente ao selecionar
  function handleStatusChange(id, novoStatus) {
    setEditStatus(prev => ({ ...prev, [id]: novoStatus }));
  }

  // Salvar status no backend
  async function handleSave(id) {
    const novoStatus = editStatus[id];
    if (!novoStatus) {
      alert('Selecione um status antes de salvar.');
      return;
    }

    setSavingIds(prev => new Set(prev).add(id));

    try {
      const response = await fetch(`http://localhost:8080/agendamentos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: novoStatus }),
      });

      if (!response.ok) throw new Error('Erro ao salvar status');

      let updated;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        updated = await response.json();
      } else {
        updated = { status: novoStatus };
      }

      setAgendamentos(prev =>
        prev.map(ag => (ag.id === id ? { ...ag, status: updated.status } : ag))
      );

      setEditStatus(prev => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    } catch (err) {
      alert(err.message);
    } finally {
      setSavingIds(prev => {
        const copy = new Set(prev);
        copy.delete(id);
        return copy;
      });
    }
  }

  // Excluir agendamento
  function handleDelete(id) {
    if (!window.confirm('Tem certeza que deseja excluir este agendamento?')) return;

    setDeletingIds(prev => new Set(prev).add(id));
    fetch(`http://localhost:8080/agendamentos/${id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao excluir agendamento');
        setAgendamentos(prev => prev.filter(ag => ag.id !== id));
      })
      .catch(err => alert(err.message))
      .finally(() => {
        setDeletingIds(prev => {
          const copy = new Set(prev);
          copy.delete(id);
          return copy;
        });
      });
  }

  // Função para voltar na navegação
  function handleVoltar() {
    window.history.back();
  }

  // Função para sair (redirecionar para login)
  function handleSair() {
    window.location.href = '/login'; // ajuste se sua rota de login for diferente
  }

  if (loading) return <p>Carregando agendamentos...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={handleVoltar} style={{ marginRight: '0.5rem' }}>
          Voltar
        </button>
        <button onClick={handleSair}>Sair</button>
      </div>

      <h2>Gerenciamento de Agendamentos</h2>

      {agendamentos.length === 0 ? (
        <p>Nenhum agendamento encontrado.</p>
      ) : (
        <table
          border="1"
          cellPadding="5"
          cellSpacing="0"
          style={{ width: '100%', borderCollapse: 'collapse' }}
        >
          <thead style={{ backgroundColor: '#ddd' }}>
            <tr>
              <th>ID</th>
              <th>Pet</th>
              <th>Cliente</th>
              <th>Data</th>
              <th>Hora</th>
              <th>Serviço</th>
              <th>Dias</th>
              <th>Período</th>
              <th>Transporte</th>
              <th>Valor Total</th>
              <th>Pagamento</th>
              <th>Troco</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {agendamentos.map(ag => (
              <tr key={ag.id}>
                <td>{ag.id}</td>
                <td>{ag.pet?.nome || '-'}</td>
                <td>{ag.pet?.user?.nome || '-'}</td>
                <td>{ag.data}</td>
                <td>{ag.hora}</td>
                <td>{ag.servico}</td>
                <td>{ag.dias ?? '-'}</td>
                <td>{ag.periodo || '-'}</td>
                <td>{ag.transporte ? 'Sim' : 'Não'}</td>
                <td>R$ {ag.valorTotal.toFixed(2)}</td>
                <td>{ag.formaPagamento}</td>
                <td>{ag.trocoPara !== null ? `R$ ${ag.trocoPara.toFixed(2)}` : '-'}</td>
                <td>
                  <select
                    value={editStatus[ag.id] ?? ag.status}
                    onChange={e => handleStatusChange(ag.id, e.target.value)}
                    disabled={savingIds.has(ag.id) || deletingIds.has(ag.id)}
                  >
                    {statusOptions.map(s => (
                      <option key={s} value={s}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => handleSave(ag.id)}
                    disabled={savingIds.has(ag.id) || deletingIds.has(ag.id)}
                    style={{ marginRight: '0.5rem' }}
                  >
                    {savingIds.has(ag.id) ? 'Salvando...' : 'Salvar'}
                  </button>
                  <button
                    onClick={() => handleDelete(ag.id)}
                    disabled={savingIds.has(ag.id) || deletingIds.has(ag.id)}
                  >
                    {deletingIds.has(ag.id) ? 'Excluindo...' : 'Excluir'}
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
