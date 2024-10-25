import MobileLayout1 from "./MobileLayout1";
import MobileLayout2 from "./MobileLayout2";
import MobileLayout3 from "./MobileLayout3";
import MobileLayout4 from "./MobileLayout4";
import MobileLayout5 from "./MobileLayout5";
import { useState, useEffect } from 'react';

interface Slide {
  largeImage: {
    img: string;
    title: string;
    date: string;
    description: string;
    video: string;
    isImg: boolean;
  };
  smallImages: {
    img: string;
    title: string;
    date: string;
    description: string;
  }[];
}

export default function PortfolioComponent() {
  const [slides, setSlides] = useState<Slide[]>([]);

  async function fetchSlides() {
    try {
      const res = await fetch('/api/slides');
      const data = await res.json();
      data.sort((a: { order: number }, b: { order: number }) => a.order - b.order);

      const updatedSlides = await Promise.all(
        data.map(async (slide: { id: number }) => {
          const slideRes = await fetch(`/api/slides/${slide.id}/posts`);
          const slideData = await slideRes.json();

          return {
            largeImage: slideData[0],
            smallImages: slideData.slice(1),
          };
        })
      );

      setSlides(updatedSlides);
    } catch (error) {
      console.error('Failed to fetch slides', error);
    }
  }

  useEffect(() => {
    fetchSlides();
  }, []);

  return (
    <div className='w-full min-h-screen flex justify-center'>
      <div className="w-full flex flex-col items-center mt-8 gap-6">
        {slides.map((slide, index) => {
          if (slide.smallImages.length === 0) {
            return <MobileLayout1 key={index} slide={slide} />;
          } else if (slide.smallImages.length === 1) {
            return <MobileLayout2 key={index} slide={slide} />;
          } else if (slide.smallImages.length === 2) {
            return <MobileLayout3 key={index} slide={slide} />;
          } else if (slide.smallImages.length === 3) {
            return <MobileLayout4 key={index} slide={slide} />;
          } else if (slide.smallImages.length === 4) {
            return <MobileLayout5 key={index} slide={slide} />;
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
}
