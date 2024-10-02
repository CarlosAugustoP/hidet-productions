// AboutUs.jsx
import '../../app/globals.css';
import React from 'react';
import AboutUsSection from './AboutsUsSection';


export default function AboutUs() {
  return (
    <div className="gap-20 mb-28 mt-28 flex flex-col items-center justify-center">
      <AboutUsSection
        direction="left"
        title="Manifesto"
        description="Nunca na história vivemos em um mundo tão cheio de possibilidades e tão democrático como hoje. Um tempo em que, tendo apenas um celular na mão e uma rede social, qualquer negócio pode ter seu vídeo visto por milhares ou até milhões de pessoas."
        photo="/img/4.jpg"
      />
      <AboutUsSection
        direction="right"
        title="Sobre nós"
        description="Somos uma produtora que olha para onde ninguém mais olha, detalhes invisíveis aos olhares comuns, porém sensitivos a qualquer um. É justamente por isso que somos tão técnicos e sempre ligados às inovações, utilizando toda tecnologia disponível."
        photo="/img/3.jpg"
      />
      <AboutUsSection
        direction="left"
        title="Quem somos?"
        description="Dessa forma, proporcionamos às empresas uma imagem forte, de alto padrão, que transmite a reputação e o profissionalismo que precisam. Somos apaixonados pelo audiovisual e acreditamos ser este o impulsionador de marcas. Somos a Hidet."
        photo="/img/6.png"
      />
    </div>
  );
}
