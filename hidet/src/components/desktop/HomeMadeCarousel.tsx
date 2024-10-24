import React, { useState, useEffect } from 'react';
import Layout1 from './Layout1';
import Layout2 from './Layout2';
import Layout3 from './Layout3';
import Layout4 from './Layout4';
import Layout5 from './Layout5';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState<any[]>([]);

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

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative overflow-hidden flex justify-center items-center w-5/6 h-[600px] mx-auto mt-24">
      <div
        className="flex transition-transform duration-700 ease-in-out w-full h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => {
          if (slide.smallImages.length === 0) {
            console.log('Estou aqui');
            return (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center min-w-full h-full"
                style={{ width: '100%', height: '100%' }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <Layout1 key={index} slide={slide} />
                </div>
              </div>
            );
          } else if (slide.smallImages.length === 1) {
            console.log('Estou aqui');
            return (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center min-w-full h-full"
                style={{ width: '100%', height: '100%' }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <Layout2 key={index} slide={slide} />
                </div>
              </div>
            );
          } else if (slide.smallImages.length === 2) {
            console.log('Estou aqui');
            return (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center min-w-full h-full"
                style={{ width: '100%', height: '100%' }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <Layout3 key={index} slide={slide} />
                </div>
              </div>
            );
          } else if (slide.smallImages.length === 3) {
            console.log('Estou aqui');
            return (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center min-w-full h-full"
                style={{ width: '100%', height: '100%' }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <Layout4 key={index} slide={slide} />
                </div>
              </div>);
          } else if (slide.smallImages.length === 4) {
            console.log('Estou aqui');
            return (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center min-w-full h-full"
                style={{ width: '100%', height: '100%' }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <Layout5 key={index} slide={slide} />
                </div>
              </div>);
          }
          else {
            console.log('Estou aqui');
            return null;
          }
        })}
      </div>
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2"
        onClick={prevSlide}
      >
        &#10094;
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2"
        onClick={nextSlide}
      >
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
