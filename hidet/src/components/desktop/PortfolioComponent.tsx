import React, { useEffect, useState } from 'react';
import Header from './Header';
import '../../app/globals.css';
import MobileHeader from '../mobile/Header';
import HomeMadeCarousel from './HomeMadeCarousel';
import MobilePortfolioComponent from '../mobile/PortfolioComponent';
import Footer from '../mobile/Footer';

export default function PortfolioComponent() {
    const [isMobile, setIsMobile] = useState(false); 
    const [viewportHeight, setViewportHeight] = useState('h-screen'); 
    const [title, setTitle] = useState(''); // State for the title
    const [fade, setFade] = useState(false); // State for triggering fade animation

    // Handle viewport height based on screen size
    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== 'undefined') {
                const windowHeight = window.innerHeight;
                setViewportHeight(
                    windowHeight < 270 ? 'h-[230vh]' :
                    windowHeight < 350 ? 'h-[180vh]' :
                    windowHeight < 400 ? 'h-[160vh]' :
                    windowHeight < 500 ? 'h-[140vh]' :
                    'h-screen'
                );
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Detect mobile view
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 820);

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Trigger fade animation on title change
    useEffect(() => {
        if (title) {
            setFade(true);
            const timer = setTimeout(() => setFade(false), 1000); // Reset fade after 1s

            return () => clearTimeout(timer); // Cleanup timeout on unmount
        }
    }, [title]);

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
            <div className='w-full flex justify-between'>
                <div className="w-full flex items-center justify-between p-12 absolute">
                    <div className='w-2/3'>
                        <Header />
                    </div>
                    <h1 className={`text-white font-semibold 2xl:text-4xl xl:text-3xl lg:text-xl relative bottom-1 mr-16 ${fade ? 'fade' : ''}`}>
                         {title && title}
                    </h1> 
                </div>
            </div>
            <div className={`flex items-center justify-center w-full h-full`}>
                <HomeMadeCarousel setTitle={setTitle} /> 
            </div>
        </div>
    );
}
