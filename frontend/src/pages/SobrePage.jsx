import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SobrePage.module.css';

function SobrePage() {
  const navigate = useNavigate();

  return (
    <>
      <header className={styles.topo}>
        <h1>Sobre Nosso Time!</h1>
        <p>Conheça as histórias por trás do Oásis CatDog</p>
      </header>

      <main className={styles.container}>
        <section className={styles.vivencia}>
          <div className={styles.bloco}>
            <h2>Juliana, 34 anos</h2>
            <p>
              Sempre tive animais e sou apaixonada por eles. Há sete anos sou vegana e tenho duas gatas, Elsa e Moana,
              de quatro anos, gordinhas e castradas. Elas foram adotadas ainda bebês e desde então dedico tempo, amor,
              carinho e cuidados a elas. Tenho uma rede de apoio quando viajo, mas sei que muitas pessoas não têm essa
              mesma segurança. Minhas filhas felinas são muito importantes para mim, e foi por isso que desenvolvemos o
              Oásis CatDog: um hotel e um sistema de cuidados para quem precisa desse suporte.
            </p><center>
<img
  src="img/ju.png"
  alt="foto Juliana"
  style={{ width: '6cm', height: '6cm', objectFit: 'cover' }}
/></center>
          </div>

          <div className={styles.bloco}>
            <h2>Isaías, 40 anos</h2>
            <p>
              Em 2023, enquanto levava minha filha para a escola, passamos por uma rua pouco movimentada e ouvimos
              pequenos miados vindos de um monte de lixo. Minha filha me olhou, mas não disse nada. Aquilo ficou em minha
              consciência, e decidi que, se na volta os miados ainda estivessem lá, deixaria minha filha agir por amor e
              tentar resgatar o animal. Quando retornamos, os miados continuavam. Minha filha procurou e encontrou um
              gatinho muito pequeno, escondido debaixo de galhos de árvore cortados. Ele cabia na palma da minha mão.
              Levamos para casa e, no início deste ano letivo, Sammy completou dois anos na família. Hoje, está
              castrada, gordinha e muito caseira.
            </p><center>
<img
  src="/img/isaias.png"
  alt="foto Isaias"
  style={{ width: '6cm', height: '6cm', objectFit: 'cover' }}
/></center>
          </div>

          <div className={styles.bloco}>
            <h2>Guilherme, 32 anos</h2>
            <p>
              Trabalho como vigilante e, em 2020, em um dia de ventania e chuva forte, no final do meu plantão, ouvi
              batidas nas estruturas de alumínio do local. Percebi que se tratava de uma calopsita molhada e assustada.
              Ela ficou parada por cerca de 30 minutos no mesmo lugar até que decidi agir. Peguei-a com a mão e a
              coloquei na minha mochila, onde permaneceu quietinha durante todo o trajeto. Assim que a tirei da mochila,
              ela veio direto para minha cabeça, iniciando um laço de amizade incrível. Desde então, onde quer que eu
              fosse – em casa ou em parques – bastava eu chamá-la pelo nome, "Amoreco", e ela vinha em minha direção,
              mesmo que houvesse obstáculos no caminho. Se alguém estivesse na frente dela, ela tentava afastar a pessoa
              para chegar até mim.
            </p>
            <center>
<img
  src="img/gui.png"
  alt="foto Guilherme"
  style={{
    width: '6cm',
    height: '6cm',
    objectFit: 'cover'
  }}
/></center>
          </div>
        </section>

        <section className={styles.missao}>
          <h2>Missão, Visão e Valores</h2>

          <div className={styles.bloco}>
            <h3>Missão</h3>
            <p>
              Proporcionar um ambiente seguro, confortável e amoroso para cães e gatos, garantindo bem-estar e qualidade
              de vida enquanto seus tutores estão ausentes. Nosso compromisso é oferecer serviços de recreação e
              hospedagem com carinho, dedicação e responsabilidade, respeitando sempre as necessidades individuais de
              cada pet.
            </p>
          </div>

          <div className={styles.bloco}>
            <h3>Visão</h3>
            <p>
              Ser referência em hotelaria e recreação para pets, reconhecido pela excelência no cuidado, inovação nos
              serviços e pelo compromisso com o bem-estar animal. Queremos criar um espaço em que os tutores sintam
              total confiança em deixar seus pets, sabendo que eles estão sendo tratados com amor e profissionalismo.
            </p>
          </div>

          <div className={styles.bloco}>
            <h3>Valores</h3>
            <ul>
              <li>Amor e respeito pelos animais: Cuidamos de cada pet como se fosse nosso, garantindo carinho e atenção.</li>
              <li>Segurança e bem-estar: Criamos um ambiente protegido e confortável para todos os hóspedes.</li>
              <li>Ética e transparência: Trabalhamos com honestidade e responsabilidade, garantindo um serviço de qualidade.</li>
              <li>Compromisso com os tutores: Oferecemos suporte e tranquilidade para quem confia seus pets a nós.</li>
            </ul>
          </div>
        </section>

        <button
          type="button"
          onClick={() => navigate('/')}
          className={styles.botaoVoltar}
        >
          ← Voltar
        </button>
      </main>

      <footer className={styles.rodape}>
        <p>&copy; 2025 Oásis CatDog | Todos os direitos reservados.</p>
      </footer>
    </>
  );
}

export default SobrePage;
