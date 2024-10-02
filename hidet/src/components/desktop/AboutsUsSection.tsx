import '../../app/globals.css';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface AboutUsSectionProps {
  direction: string;
  title: string;
  description: string;
  photo: string;
}

interface TextBlockProps {
  direction: string;
  title: string;
  description: string;
}

export default function AboutUsSection({ direction, title, description, photo }: AboutUsSectionProps) {
  const isLeftDirection = direction === "left";

  return (
    <div className="w-4/5 flex items-center justify-between">
      {isLeftDirection && <TextBlock title={title} description={description} direction={direction} />}
      <div className="flex items-center"> {/* Adicione 'items-center' para centralizar */}
          <Image src={photo} width={500} height={752} alt="Imagem" className="border-4 border-white rounded-[15px] object-cover w-full" />
      </div>
      {!isLeftDirection && <TextBlock title={title} description={description} direction={direction} />}
    </div>
  );
}

// <Image src={photo} width={500} height={752} alt="Imagem" className="border-4 border-white rounded-[15px] object-cover" />
const TextBlock = ({ direction, title, description }: TextBlockProps) => {
  const alignRight = direction !== "left"

  return (
    <div className={`${alignRight ? 'text-right' : ''} w-4/5`}>
      <h1 className="text-white text-4xl md:text-6xl font-semibold leading-normal">
        {title}
      </h1>
      <p className="text-white text-[30px] font-medium leading-normal">
        {description}
      </p>
    </div>
  );
}

interface ImageContainerProps {
  width?: string;
  height?: string;
}

const ImageContainer = styled.div<ImageContainerProps>`
  width: ${props => props.width ? `${props.width}px` : '100%'};
  height: ${props => props.height ? `${props.height}px` : 'auto'};

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    border-radius: 15px;
    border: 4px solid white;
  }
`;

