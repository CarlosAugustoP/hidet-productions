import React, { useState, useEffect } from 'react';
import Layout1 from './Layout1';
import Layout2 from './Layout2';
import Layout3 from './Layout3';
import Layout4 from './Layout4';
import Layout5 from './Layout5';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true); // New loading state

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
      setIsLoading(false); // Data is loaded, set isLoading to false
    } catch (error) {
      console.error('Failed to fetch slides', error);
      setIsLoading(false); // In case of error, also stop loading
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

  const maxVisibleDots = 5; // Must be an odd number to center the current dot
  const half = Math.floor(maxVisibleDots / 2);
  let startDotIndex = 0;
  let endDotIndex = slides.length - 1;

  if (slides.length <= maxVisibleDots) {
    startDotIndex = 0;
    endDotIndex = slides.length - 1;
  } else {
    if (currentIndex <= half) {
      startDotIndex = 0;
      endDotIndex = maxVisibleDots - 1;
    } else if (currentIndex >= slides.length - half - 1) {
      startDotIndex = slides.length - maxVisibleDots;
      endDotIndex = slides.length - 1;
    } else {
      startDotIndex = currentIndex - half;
      endDotIndex = currentIndex + half;
    }
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-gray-800'>
          <span className='sr-only'>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className="relative overflow-hidden flex justify-center items-center w-5/6 2xl:h-[500px] xl:h-[400px] md:h-[350px] mx-auto mt-24">
        <div
          className="flex transition-transform duration-700 ease-in-out w-full h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => {
            if (slide.smallImages.length === 0) {
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
              return (
                <div
                  key={index}
                  className="flex-shrink-0 flex items-center justify-center min-w-full h-full"
                  style={{ width: '100%', height: '100%' }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <Layout4 key={index} slide={slide} />
                  </div>
                </div>
              );
            } else if (slide.smallImages.length === 4) {
              return (
                <div
                  key={index}
                  className="flex-shrink-0 flex items-center justify-center min-w-full h-full"
                  style={{ width: '100%', height: '100%' }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <Layout5 key={index} slide={slide} />
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
        <button
          className="absolute left-0 top-1/2 rounded-full w-10 h-10 transform -translate-y-1/2 bg-gray-800 text-white p-2 border-white shadow-xl"
          onClick={prevSlide}
        >
          &#10094;
        </button>
        <button
          className="absolute right-0 top-1/2 rounded-full w-10 h-10 transform -translate-y-1/2 bg-gray-800 text-white p-2 border-white shadow-xl"
          onClick={nextSlide}
        >
          &#10095;
        </button>
      </div>
      <div className="mt-6 flex justify-center items-center w-full overflow-hidden">
        <div className="flex items-center">
          {startDotIndex > 0 && (
            <div className="mx-1 text-gray-500 select-none">...</div>
          )}
          {slides.slice(startDotIndex, endDotIndex + 1).map((_, index) => {
            const actualIndex = startDotIndex + index;
            return (
              <button
                key={actualIndex}
                onClick={() => setCurrentIndex(actualIndex)}
                className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 transform ${
                  currentIndex === actualIndex ? 'bg-white scale-125' : 'bg-gray-800 scale-100'
                }`}
                aria-label={`Go to slide ${actualIndex + 1}`}
                aria-current={currentIndex === actualIndex ? 'true' : 'false'}
              />
            );
          })}
          {endDotIndex < slides.length - 1 && (
            <div className="mx-1 text-gray-500 select-none">...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
