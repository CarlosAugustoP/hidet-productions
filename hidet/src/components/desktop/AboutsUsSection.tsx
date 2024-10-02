import '../../app/globals.css';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

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

function useWidthByScreenSize() {
  const [width, setWidth] = useState(300);

  useEffect(() => {
    function handleResize() {
      const screenWidth = window.innerWidth;

      if (screenWidth < 640) { // sm
        setWidth(150);
      } else if (screenWidth < 768) { // md
        setWidth(250);
      } else if (screenWidth < 1024) { // lg
        setWidth(350);
      } else { // xl and above
        setWidth(500);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

export default function AboutUsSection({ direction, title, description, photo }: AboutUsSectionProps) {
  const isLeftDirection = direction === "left";
  const width = useWidthByScreenSize();

  return (
    <div className="w-4/5 flex items-center justify-between">
      {isLeftDirection && <TextBlock title={title} description={description} direction={direction} />}
      <div className="flex items-center">
        <div
          className="p-[4px] rounded-[15px]"
          style={{
            background: "linear-gradient(225deg, rgba(176, 79, 109, 0.86) 0%, #631582 19%, #200829 47%, #0B0B0B 75%, #33158C 100%)"
          }}
        >
          <Image
            src={photo}
            width={width}
            height={300}
            alt="Imagem"
            className="rounded-[15px] object-cover w-full"
          />
        </div>
      </div>
      {!isLeftDirection && <TextBlock title={title} description={description} direction={direction} />}
    </div>
  );
}

const TextBlock = ({ direction, title, description }: TextBlockProps) => {
  const alignRight = direction !== "left"

  return (
    <div className={`${alignRight ? 'text-right ml-4 sm:ml-6 md:ml-8 lg:ml-10 xl:ml-12' : 'mr-4 sm:mr-6 md:mr-8 lg:mr-10 xl:mr-12'} sm:w-2/3`}>
      <h1 className="text-white sm:text-md md:text-xl lg:text-2xl xl:text-4xl font-semibold leading-normal">
        {title}
      </h1>
      <p className="text-white sm:text-sm md:text-lg lg:text-xl xl:text-3xl font-medium leading-normal">
        {description}
      </p>
    </div>

  );
}