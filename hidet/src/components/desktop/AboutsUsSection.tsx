// AboutUsSection.jsx
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

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

function AboutUsSection({ direction, title, description, photo }: AboutUsSectionProps) {
  const isLeftDirection = direction === "left";
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer to handle the fade-in and fade-out effect
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1, // Adjust as needed
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        setIsVisible(entry.isIntersecting);
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const currentSectionRef = sectionRef.current;

    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`about-us-section w-4/5 flex items-center justify-between gap-4 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {isLeftDirection && <TextBlock title={title} description={description} direction={direction} />}
      <div className="w-1/2 flex items-center h-full">
        <div
          className="p-[4px] rounded-[15px] h-full w-full"
          style={{
            background:
              "linear-gradient(225deg, rgba(176, 79, 109, 0.86) 0%, #631582 19%, #200829 47%, #0B0B0B 75%, #33158C 100%)",
          }}
        >
          <Image
            src={photo}
            width={500}
            height={300}
            alt="Imagem"
            className="rounded-[15px] object-cover w-full h-full"
          />
        </div>
      </div>
      {!isLeftDirection && <TextBlock title={title} description={description} direction={direction} />}
    </div>
  );
}

const TextBlock = ({ direction, title, description }: TextBlockProps) => {
  const alignRight = direction !== "left";

  return (
    <div className={`${alignRight ? 'text-right' : 'text-left'} sm:w-1/2 h-full flex flex-col justify-between p-5 gap-10`}>
      <h1 className="text-white sm:text-md md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-7xl font-semibold leading-normal">
        {title}
      </h1>
      <p className="text-white sm:text-sm md:text-lg 2xl:text-3xl lg:text-2xl xl:text-2xl font-medium leading-normal">
        {description}
      </p>
    </div>
  );
};

export default AboutUsSection;
