import React, { useEffect, useState } from 'react';
import Header from './Header';
import '../../app/globals.css';
import MobileHeader from '../mobile/Header';
import slidesMock from '../../mock/slides';
import HomeMadeCarousel from './HomeMadeCarousel';

export default function PortfolioComponent() {
    const [isMobile, setIsMobile] = useState(false); // State to track if screen is mobile
    const [slides, setSlides] = useState(slidesMock);
    const [viewportHeight, setViewportHeight] = useState('h-screen'); // State for dynamically setting height class

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

    // Adjust height based on the window height
    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== 'undefined') {
                const windowHeight = window.innerHeight;
                if (windowHeight < 270) {
                    setViewportHeight('h-[230vh]');
                } else if (windowHeight < 350) {
                    setViewportHeight('h-[180vh]');
                } else if (windowHeight < 400) {
                    setViewportHeight('h-[160vh]');
                } else if (windowHeight < 500) {
                    setViewportHeight('h-[140vh]');
                } else {
                    setViewportHeight('h-screen');
                }
            }
        };

        // Initial check
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Detect mobile view
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 820) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };

        // Initial check and adding event listener for resizing
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Render for mobile view
    if (isMobile) {
        return (
            <div className='w-full flex flex-col items-center'>
                <MobileHeader />
                <div className='w-4/5 flex flex-col gap-4 mt-4'>
                    {slides.map((slide, index) => (
                        <div key={index} className='flex flex-col'>
                            <div className='bg-gray-300 w-full h-24 rounded-md mb-4'></div>
                            <div className='grid grid-cols-2 gap-2'>
                                {slide.smallImages.map((image, idx) => (
                                    <div key={idx} className='bg-gray-300 w-full h-24 rounded-md'></div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Render for desktop view
    return (
        <div className={`relative ${viewportHeight}`}>
            <div className="w-2/3 flex flex-col justify-between p-12 absolute">
                <Header />
            </div>
            <div className={`flex items-center justify-center w-full h-full`}>
                <HomeMadeCarousel />
            </div>
        </div>
    );
}
