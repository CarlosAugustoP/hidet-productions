import React, { useEffect, useState } from 'react';
import Header from './Header';
import '../../app/globals.css';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { title } from 'process';
import MobileHeader from '../mobile/Header';
import slidesMock from '../../mock/slides';
import Layout5 from './Layout5';
import Layout2 from './Layout2';
import { cp } from 'fs';
import Layout1 from './Layout1';
import Layout3 from './Layout3';
import HomeMadeCarousel from './HomeMadeCarousel';
export default function PortfolioComponent() {
    var slides2: { largeImage: { img: string; title: string; description: string; date: string; }; smallImages: { img: string; title: string; description: string; date: string; }[]; }[] = [];


    async function fetchSlides() {
        try {
            const res = await fetch('/api/slides');
            const data = await res.json();
            data.sort((a: { order: number; }, b: { order: number; }) => a.order - b.order);


            for (let i = 0; i < data.length; i++) {
                const res = await fetch(`/api/slides/${data[i].id}/posts`);
                const slideData = await res.json();
                slides2[i] = slides2[i] || {};
                slides2[i].largeImage = slideData[0];
                slides2[i] = slides2[i] || {};
                slides2[i].smallImages = slides2[i].smallImages || [];
                slides2[i].smallImages.push(...slideData.slice(1));
            }
            console.log(slides2);
            setSlides(slides2);
        } catch (error) {
            console.error('Failed to fetch slides', error);
        }
    }

    var useMock = true;
    if (!useMock) {
        useEffect(() => {
            fetchSlides();
        }, []);
    }

    const [isMobile, setIsMobile] = useState(false); // State to track if screen is mobile
    const [slides, setSlides] = useState(slidesMock);
    const [isHeightExceeded, setIsHeightExceeded] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== 'undefined') {
                setIsHeightExceeded(window.innerHeight < 400);
            }
        };

        handleResize(); // Inicializa o estado com a altura atual

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

        // Initial check and adding event listener for resizing
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);


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


    return (
        <div className={`relative ${!isHeightExceeded? 'h-screen':'h-[120vh]'}`}>
            <div className="w-2/3 flex flex-col justify-between p-12 absolute">
                <Header />
            </div>
            <div className="flex items-center justify-center w-full h-full">
                <HomeMadeCarousel />
            </div>
        </div>
    );
}
