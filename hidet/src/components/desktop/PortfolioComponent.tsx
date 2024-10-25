import React, { useEffect, useState } from 'react';
import Header from './Header';
import '../../app/globals.css';
import MobileHeader from '../mobile/Header';
import slidesMock from '../../mock/slides';
import HomeMadeCarousel from './HomeMadeCarousel';
import MobilePortfolioComponent from '../mobile/PortfolioComponent';
import Footer from '../mobile/Footer';
export default function PortfolioComponent() {
    const [isMobile, setIsMobile] = useState(false); 
    const [viewportHeight, setViewportHeight] = useState('h-screen'); 

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
                <div className='w-screen mt-6'>
                    <Footer />
                </div>
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
