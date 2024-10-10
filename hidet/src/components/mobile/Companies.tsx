import React from 'react';
import styled from 'styled-components';
import '../../app/globals.css'
import Image from 'next/image';

interface TickerProps {
    logos: string[]; 
  }
  
  const Ticker: React.FC<TickerProps> = ({ logos }) => {
    return (
      <div className="small-ticker-wrapper">
        <div className="ticker-content">
          {logos.map((logo, index) => (
            <div key={index} className="small-white-logo">
              <Image src={logo} alt={`Logo ${index}`} width={100} height={50} />
            </div>
          ))}
          {logos.map((logo, index) => (
            <div key={index} className="small-white-logo">
              <Image src={logo} alt={`Logo ${index}`} width={100} height={50} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const MobileCompanies: React.FC = () => {
    const logos = [
      '/img/logo/carvalheira.png', 
      '/img/logo/above_branding.png', 
      '/img/logo/ecope.png', 
      '/img/logo/gabriela_amancio.png', 
      '/img/logo/grupo_premia.png', 
      '/img/logo/melhor_comunicacao.png', 
      '/img/logo/portu.png', 
      '/img/logo/vitor_andrade.png', 
      '/img/logo/premia_pao.png',

    ];
  
    return (
      <div className=' w-full flex flex-col items-center justify-center gap-2 bg-black  border-white'>
        <h1 className='text-white text-lg tablet:text-xl mt-6'>Empresas que confiaram na HIDET</h1>
        <Ticker logos={logos} />
      </div>
    );
  };

  export default MobileCompanies;