import React from 'react';
import Image from 'next/image';

interface Logo {
  src: string;
  name: string;
}

interface TickerProps {
  logos: Logo[];
}

const Ticker: React.FC<TickerProps> = ({ logos }) => {
  return (
    <div className="ticker-wrapper">
      <div className="ticker-content">
        {logos.map((logo, index) => (
          <div key={index} className="white-logo">
            <Image
              src={logo.src}
              alt={logo.name}
              title={logo.name}
              width={100}
              height={50}
            />
          </div>
        ))}
        {logos.map((logo, index) => (
          <div key={index + logos.length} className="white-logo">
            <Image
              src={logo.src}
              alt={logo.name}
              title={logo.name}
              width={100}
              height={50}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const Companies: React.FC = () => {
  const logos: Logo[] = [
    { src: '/img/logo/carvalheira.png', name: 'Carvalheira' },
    { src: '/img/logo/above_branding.png', name: 'Above Branding' },
    { src: '/img/logo/ecope.png', name: 'Ecope' },
    { src: '/img/logo/gabriela_amancio.png', name: 'Gabriela Amancio Arquitetura' },
    { src: '/img/logo/grupo_premia.png', name: 'Grupo Premia' },
    { src: '/img/logo/melhor_comunicacao.png', name: 'Melhor Comunicação' },
    { src: '/img/logo/portu.png', name: 'Portu' },
    { src: '/img/logo/vitor_andrade.png', name: 'Vitor Andrade Imobiliária' },
    { src: '/img/logo/premia_pao.png', name: 'Premia Pão' },
    { src: '/img/logo/odontomedica.png', name: 'Odontomédica pesqueira' },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center gap-5 bg-black h-[25vh] border-b-2 border-white">
      <h1 className="text-white text-3xl">Empresas que contaram com a HIDET</h1>
      <Ticker logos={logos} />
    </div>
  );
};

export default Companies;
