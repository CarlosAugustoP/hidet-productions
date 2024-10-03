import React, { useEffect, useState } from 'react';
import Header from './Header';
import '../../app/globals.css';

export default function PortfolioComponent() {
    const slides = [
        {
            largeImage: 'https://via.placeholder.com/600x400?text=Large+Image+1',
            smallImages: [
                'https://via.placeholder.com/300x200?text=Small+1-1',
                'https://via.placeholder.com/300x200?text=Small+1-2',
                'https://via.placeholder.com/300x200?text=Small+1-3',
                'https://via.placeholder.com/300x200?text=Small+1-4',
            ],
        },
        {
            largeImage: 'https://via.placeholder.com/600x400?text=Large+Image+2',
            smallImages: [
                'https://via.placeholder.com/300x200?text=Small+2-1',
                'https://via.placeholder.com/300x200?text=Small+2-2',
                'https://via.placeholder.com/300x200?text=Small+2-3',
                'https://via.placeholder.com/300x200?text=Small+2-4',
            ],
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="relative h-screen">
            <div className="w-2/3 flex flex-col justify-between p-12 absolute">
                <Header />
            </div>

            <div className="flex items-center justify-center w-full h-full">
                <div className="flex items-center justify-center w-full max-w-6xl gap-4 px-4 mt-16">
                    <button
                        onClick={prevSlide}
                        className="bg-gray-800 text-white p-2 rounded-full"
                    >
                        &#10094;
                    </button>

                    <div className="relative w-full overflow-hidden">
                        <div
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {slides.map((slide, index) => (
                                <div className="flex-shrink-0 w-full flex gap-2" key={index}>
                                    <div className="w-1/2">
                                        <img
                                            src={slide.largeImage}
                                            alt={`Slide ${index + 1} Large`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="w-1/2 grid grid-cols-2 grid-rows-2 gap-2">
                                        {slide.smallImages.map((imgSrc, idx) => (
                                            <img
                                                key={idx}
                                                src={imgSrc}
                                                alt={`Slide ${index + 1} Small ${idx + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={nextSlide}
                        className="bg-gray-800 text-white p-2 rounded-full"
                    >
                        &#10095;
                    </button>
                </div>
            </div>
        </div>
    );
}
