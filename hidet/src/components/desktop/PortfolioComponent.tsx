import React, { useEffect, useState } from 'react';
import Header from './Header';
import '../../app/globals.css';
import MobileHeader from '../mobile/Header';
import slidesMock from '../../mock/slides';
import HomeMadeCarousel from './HomeMadeCarousel';
import MobilePortfolioComponent from '../mobile/PortfolioComponent';
export default function PortfolioComponent() {
    const [isMobile, setIsMobile] = useState(false); 
    const [slides, setSlides] = useState(slidesMock);
    const [viewportHeight, setViewportHeight] = useState('h-screen'); 

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

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 820) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (isMobile) {
        return (
            <div className='w-full flex flex-col items-center'>
                <div className='mt-6'>
                    <MobileHeader />
                </div>
                <MobilePortfolioComponent />
            </div>
        );
    }

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
