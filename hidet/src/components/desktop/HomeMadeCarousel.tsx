import React, { useState, useEffect } from 'react';
import Layout1 from './Layout1';
import Layout2 from './Layout2';
import Layout3 from './Layout3';
import Layout4 from './Layout4';
import Layout5 from './Layout5';

export interface ImageData {
  img: string;
  title: string;
  date: string;
  description: string;
  video: string;
  isImg: boolean;
  order: number;
}

export interface Slide {
  title: string;
  largeImage: ImageData;
  smallImages: ImageData[];
}

export interface LayoutSlide {
  title: string;
  largeImage: {
      img: string;
      title: string;
      date: string;
      description: string;
      video:string;
      isImg: boolean;
  };
  smallImages: {
      img: string;
      title: string;
      date: string;
      description: string;
      video:string;
      isImg: boolean;
  }[];
}

interface CarouselProps {
  setTitle: (title: string) => void;
}

const Carousel: React.FC<CarouselProps> = ({ setTitle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  interface SlideAPIResponse {
    id: number;
    order: number;
    // Add other properties if available
  }

  interface SlideDetailsResponse {
    id: number;
    title: string;
    // Add other properties if available
  }

  async function fetchSlides() {
    try {
      const res = await fetch('/api/slides');
      const data: SlideAPIResponse[] = await res.json();
      data.sort((a, b) => a.order - b.order);

      const updatedSlides: Slide[] = await Promise.all(
        data.map(async (slide) => {
          // Fetch slide details to get the title
          const slideDetailsRes = await fetch(`/api/slides/${slide.id}`);
          const slideDetails: SlideDetailsResponse = await slideDetailsRes.json();

          // Fetch posts for the slide
          const slideRes = await fetch(`/api/slides/${slide.id}/posts`);
          const slideData: ImageData[] = await slideRes.json();
          slideData.sort((a, b) => a.order - b.order);

          return {
            largeImage: slideData[0],
            smallImages: slideData.slice(1),
            title: slideDetails.title, // Use the title from slide details
          };
        })
      );

      setSlides(updatedSlides);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch slides', error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchSlides();
  }, []);

  // Update title when slides or currentIndex changes
  useEffect(() => {
    if (slides.length > 0) {
      setTitle(slides[currentIndex].title);
    }
  }, [currentIndex, slides, setTitle]);

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
  };

  const maxVisibleDots = 5;
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
        <span className="loader border-t-white border-4 border-solid rounded-full animate-spin w-7 h-7"></span>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center w-[85%]'>
      <div className="relative overflow-hidden flex justify-center items-center w-full 2xl:h-[500px] xl:h-[400px] md:h-[350px] mx-auto mt-24">
        <div
          className="flex transition-transform duration-700 ease-in-out w-full h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => {
            if (!slide.largeImage) {
              return null;
            }

            const layoutProps = { key: index, slide };

            return (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center min-w-full h-full"
                style={{ width: '100%', height: '100%' }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  {slide.smallImages.length === 0 && <Layout1 {...layoutProps} />}
                  {slide.smallImages.length === 1 && <Layout2 {...layoutProps} />}
                  {slide.smallImages.length === 2 && <Layout3 {...layoutProps} />}
                  {slide.smallImages.length === 3 && <Layout4 {...layoutProps} />}
                  {slide.smallImages.length === 4 && <Layout5 {...layoutProps} />}
                  {slide.smallImages.length > 4 && <Layout5 {...layoutProps} />}
                </div>
              </div>
            );
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
