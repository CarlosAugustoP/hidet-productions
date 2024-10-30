import React from 'react';
import styled from 'styled-components';
import '../../app/globals.css'
import Image from 'next/image';
import { useState, useEffect } from 'react';
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
    const [isHeightExceeded, setIsHeightExceeded] = useState(false);

    // Verifica a altura da janela e atualiza o estado
    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== 'undefined') {
                setIsHeightExceeded(window.innerHeight <842);
            }
        };

        handleResize(); // Inicializa o estado com a altura atual

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


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
      '/img/logo/odontomedica.png',
      '/img/logo/grao_natural_logo.png',
      '/img/logo/hope_logo.png',
      '/img/logo/uninassau.png',
      '/img/logo/player_franchising.png',
      '/img/logo/maida-health-logo.png',
      '/img/logo/nissan_auto.png',
      '/img/logo/loja_do_condominio.png',
      '/img/logo/odontomedica.png',
      '/img/logo/kero_coco_logo.png'
    ];
  
    return (
      <div className={` w-full flex flex-col items-center justify-center gap-2 bg-black  border-white py-12`}>
        <Ticker logos={logos} />
      </div>
    );
  };

  export default MobileCompanies;