import MobileLayout1 from "./MobileLayout1";
import MobileLayout2 from "./MobileLayout2";
import MobileLayout3 from "./MobileLayout3";
import MobileLayout4 from "./MobileLayout4";
import MobileLayout5 from "./MobileLayout5";
import { useState, useEffect } from 'react';

interface Slide {
  title: string;
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
    video: string;
    isImg: boolean;
  }[];
}

export default function PortfolioComponent() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchSlides() {
    try {
      const res = await fetch('/api/slides');
      const data = await res.json();
      data.sort((a: { order: number }, b: { order: number }) => a.order - b.order);
      console.log(data);

      const updatedSlides = await Promise.all(
        data.map(async (slide: { id: number, title: string }) => {
          const slideRes = await fetch(`/api/slides/${slide.id}/posts`);
          const slideData = await slideRes.json();
          slideData.sort((a: {order: number}, b: {order: number}) => a.order - b.order);
          return {
            title: slide.title,
            largeImage: slideData[0],
            smallImages: slideData.slice(1),
          };
        })
      );

      setSlides(updatedSlides);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch slides', error);
    }
  }

  useEffect(() => {
    fetchSlides();
  }, []);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
         <span className="loader border-t-white border-4 border-solid rounded-full animate-spin w-7  h-7"></span>
      </div>
    );
  }

  return (
    <div className='w-full min-h-screen flex justify-center'>
      <div className="w-full flex flex-col items-center mt-8 gap-6">
        {slides.map((slide, index) => {
          if (!slide.largeImage) {
            return null;
          }
          if (slide.smallImages.length === 0) {
            return (<><h1 className="text-white font-bold">Trabalho: {slide.title}</h1><MobileLayout1 key={index} slide={slide} /></>);
          } else if (slide.smallImages.length === 1) {
            return (<><h1 className="text-white font-bold">Trabalho: {slide.title}</h1><MobileLayout2 key={index} slide={slide} /></>);
          } else if (slide.smallImages.length === 2) {
            return (<><h1 className="text-white font-bold">Trabalho: {slide.title}</h1><MobileLayout3 key={index} slide={slide} /></>);
          } else if (slide.smallImages.length === 3) {
            return (<><h1 className="text-white font-bold">Trabalho: {slide.title}</h1><MobileLayout4 key={index} slide={slide} /></>);
          } else if (slide.smallImages.length === 4) {
            return (<><h1 className="text-white font-bold">Trabalho: {slide.title}</h1><MobileLayout5 key={index} slide={slide} /></>);
          }
        })}
      </div>
    </div>
  );
}
