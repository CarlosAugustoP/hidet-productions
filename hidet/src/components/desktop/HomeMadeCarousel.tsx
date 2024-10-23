import React, { useState } from 'react';
import Layout1 from './Layout1';
import Layout2 from './Layout2';
import Layout3 from './Layout3';
import Layout5 from './Layout5';

const Carousel = () => {
  const layouts = [<Layout1 />, <Layout2 />, <Layout3 />, <Layout5 />];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % layouts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + layouts.length) % layouts.length);
  };

  return (
    <div className="relative overflow-hidden flex justify-center items-center w-5/6 h-[600px] mx-auto mt-24">
      <div
        className="flex transition-transform duration-700 ease-in-out w-full h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {layouts.map((layout, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex items-center justify-center min-w-full h-full"
            style={{ width: '100%', height: '100%' }}
          >
            <div className="w-full h-full flex items-center justify-center">
              {layout}
            </div>
          </div>
        ))}
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
