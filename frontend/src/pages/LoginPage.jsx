import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

export default function LoginPage({ onLoginSuccess }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Exceção para login admin
    if (email === 'admin@admin' && senha === 'admin') {
      alert('Login realizado com sucesso! Bem-vindo, Admin.');

      const adminUser = {
        nome: 'Admin',
        email: 'admin@admin',
        role: 'gerente',
      };

      setEmail('');
      setSenha('');

      onLoginSuccess(adminUser);
      navigate('/gerente');
      return;
    }

    const dadosLogin = { email, senha };

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosLogin),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Login realizado com sucesso! Bem-vindo, ' + data.nome);

        setEmail('');
        setSenha('');

        onLoginSuccess(data);
        navigate('/stage');
      } else {
        const erro = await response.text();
        alert('Falha no login: ' + erro);
      }
    } catch (error) {
      alert('Erro de conexão: ' + error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (senha !== confirmaSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    const novoUsuario = { nome, email, cpf, telefone, endereco, senha };

    try {
      const response = await fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoUsuario),
      });

      if (response.ok) {
        alert('Cadastro realizado com sucesso!');

        setNome('');
        setEmail('');
        setCpf('');
        setTelefone('');
        setEndereco('');
        setSenha('');
        setConfirmaSenha('');

        setMode('login');
      } else {
        const errorText = await response.text();
        alert('Erro ao cadastrar: ' + errorText);
      }
    } catch (error) {
      alert('Erro de conexão: ' + error.message);
    }
  };

  const handleRecover = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/users/recover?email=${encodeURIComponent(email)}`, {
        method: 'GET',
      });

      if (response.ok) {
        alert('Instruções de recuperação enviadas para ' + email);
        setEmail('');
        setMode('login');
      } else {
        const errorText = await response.text();
        alert('Erro na recuperação: ' + errorText);
      }
    } catch (error) {
      alert('Erro de conexão: ' + error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>CatDog - Sistema</h1>

        <div className="btn-group">
          <button onClick={() => setMode('login')} disabled={mode === 'login'}>
            Login
          </button>
          <button onClick={() => setMode('register')} disabled={mode === 'register'}>
            Cadastrar
          </button>
          <button onClick={() => setMode('recover')} disabled={mode === 'recover'}>
            Recuperar Senha
          </button>
        </div>

        {mode === 'login' && (
          <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input
              type="email"
              placeholder="E‑mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <button type="submit">Entrar</button>
          </form>
        )}

        {mode === 'register' && (
          <form onSubmit={handleRegister}>
            <h2>Cadastro</h2>
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="E‑mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
            <input
              type="text"
              placeholder="Endereço"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirmar Senha"
              value={confirmaSenha}
              onChange={(e) => setConfirmaSenha(e.target.value)}
              required
            />
            <button type="submit">Salvar</button>
          </form>
        )}

        {mode === 'recover' && (
          <form onSubmit={handleRecover}>
            <h2>Recuperar Senha</h2>
            <input
              type="email"
              placeholder="E‑mail cadastrado"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Enviar instruções</button>
          </form>
        )}
      </div>
    </div>
  );
}
