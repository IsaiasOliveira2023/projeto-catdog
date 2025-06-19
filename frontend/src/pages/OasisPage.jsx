import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OasisPage.css';

function ButtonOasis({ label, onClick, variant = 'primary', type = 'button' }) {
  const className = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  return (
    <button className={className} type={type} onClick={onClick}>
      {label}
    </button>
  );
}

export default function OasisPage({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const goToAgendamento = () => {
    navigate('/agendamento', { state: { user } });
  };

  const scrollToCameras = () => {
    document.getElementById('camera-final')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <header>
        <div className="container">
          <div className="logo">
            <h1>Oasis CatDog</h1>
          </div>
          <nav>
            <ul>
              <li>
                <ButtonOasis label="Agende" onClick={goToAgendamento} />
              </li>
              <li>
                <ButtonOasis label="Pets" onClick={() => navigate('/pets', { state: { user } })} />
              </li>
              <li>
                <ButtonOasis label="Meus Dados" onClick={() => navigate('/meusdados', { state: { user } })} />
              </li>
              <li>
                <ButtonOasis label="Câmeras" onClick={scrollToCameras} />
              </li>
              <li>
                <ButtonOasis label="Sair" onClick={handleLogout} variant="secondary" />
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="hero-text">
          <h2>Cuidado dedicado e carinho enquanto você está longe.</h2>
          <p>Seu cãozinho seguro e feliz em nosso hotel especializado.</p>
          <div className="hero-buttons">
            <ButtonOasis label="Saiba mais" onClick={() => alert('Saiba mais em desenvolvimento.')} />
          </div>
        </div>
        <div className="hero-image">
          <img src="/img/principal.jpg" alt="Cachorro feliz" />
        </div>
      </section>

      <section className="services">
        <h2>SERVIÇOS</h2>
        <div className="service-cards">
          <article className="card">
            <img src="/img/ser3.jpg" alt="banho" />
            <h3>Banho e Tosa</h3>
            <p>Deixe seu Pet a cara da riqueza.</p>
            <ButtonOasis label="Saiba Mais" onClick={() => alert('Banho e Tosa em desenvolvimento.')} variant="secondary" />
          </article>
          <article className="card">
            <img src="/img/ser1.png" alt="Transporte Fretado" />
            <h3>Transporte Fretado</h3>
            <p>Buscamos seu pet com todo conforto e segurança.</p>
            <ButtonOasis label="Saiba Mais" onClick={() => alert('Transporte em desenvolvimento.')} variant="secondary" />
          </article>
          <article className="card">
            <img src="/img/ser2.jpg" alt="Vacina" />
            <h3>Vacinas</h3>
            <p>Proteja seu Pet, vacine!</p>
            <ButtonOasis label="Saiba Mais" onClick={() => alert('Vacinas em desenvolvimento.')} variant="secondary" />
          </article>
        </div>
      </section>

      <section className="contact">
        <h2>PROMOÇÕES</h2>
        <div className="contact-cards">
          <article className="card">
            <h3>Desconto de 20% no primeiro banho e tosa</h3>
            <p>Seu pet merece estar sempre cheiroso e limpinho! Aproveite essa oferta especial para novos clientes.</p>
            <ButtonOasis label="Agende" onClick={goToAgendamento} />
          </article>
          <article className="card">
            <h3>Pacote mensal de hospedagem com 15% de desconto</h3>
            <p>Deixe seu pet confortável e seguro enquanto você viaja, pagando menos!</p>
            <ButtonOasis label="Agende" onClick={goToAgendamento} />
          </article>
          <article className="card">
            <h3>10% de desconto na primeira compra de comida orgânica</h3>
            <p>Alimente seu pet com o melhor da natureza e cuide da saúde dele!</p>
            <ButtonOasis label="Saiba Mais" onClick={() => alert('Oferta em desenvolvimento.')} />
          </article>
        </div>

        <div className="cameras" id="camera-final">
          <h2>CÂMERAS</h2>
          <div className="blocos">
            <video src="/img/1111043_Quiet_Tranquil_3840x2160.mp4" controls width="400" />
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <p>Endereço: Rua João José, número 200, Centro, Palhoça – SC.</p>
          <p>CONTATO: (48)99945-8585</p>
          <div className="redes-sociais">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a> |{' '}
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a> |{' '}
            <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
