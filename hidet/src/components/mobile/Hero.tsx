import { useEffect, useState } from 'react';
import Router from 'next/router';


export default function MobileHero() {
    const images = ['img/editing.svg', 'img/music.svg', 'img/photo.svg', 'img/video.svg'];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [prevImageIndex, setPrevImageIndex] = useState<number | null>(null);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsFading(true);

            setTimeout(() => {
                setPrevImageIndex(currentImageIndex);

                setCurrentImageIndex((currentImageIndex + 1) % images.length);

                setIsFading(false);

                setTimeout(() => {
                    setPrevImageIndex(null);
                }, 500); 
            }, 500); 
        }, 2000);

        return () => clearInterval(interval);
    }, [currentImageIndex]);

    return (
        <div className="flex h-[90vh]" id = "hero">
            <div className="w-2/3 flex flex-col h-full justify-between p-16">
                <div className='h-3/4 flex justify-between flex-col mb-5'>
                    <h1 className="text-white text-4xl sm:text-5xl md:text-custom-3xl-4xl lg:text-custom-5xl-6xl xl:text-7xl 2xl:text-huge text-left font-semibold">
                        Soluções audiovisuais compatíveis com seu negócio.
                    </h1>
                    <div className='flex items-center gap-5'>
                        <div className='relative w-7 h-7'>
                            {prevImageIndex !== null && (
                                <img
                                    className={`absolute inset-0 transition-opacity duration-500 opacity-0`}
                                    src={images[prevImageIndex]}
                                    alt="Previous"
                                />
                            )}
                            <img
                                className={`absolute inset-0 transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}
                                src={images[currentImageIndex]}
                                alt="Dynamic"
                            />
                        </div>
                        <p className='text-xl sm:text-xxl md:text-xl lg:text-2xl xl:text-3xl text-white'>
                            Vídeo • Fotografia • Áudio • Edição
                        </p>
                    </div>
                    <div className='flex gap-6 items-center '>
                        <button className=' hover:scale-110 cursor-pointer transition-transform duration-200 rounded-[5px] bg-white text-black flex items-center px-2 sm:px-4 lg:px-5'>
                            <a href = "#contact" className='text-lg sm:text-xl md:text-sm lg:text-lg xl:text-2xl 2xl:text-2xl text-black py-2 sm:py-3 lg:py-2 px-4 sm:px-5 lg:px-4'>
                                Entre em contato
                            </a>
                        </button>
                        <button className=' hover:scale-110 cursor-pointer transition-transform duration-200 rounded-[5px] bg-white text-black flex items-center gap-1 px-3 sm:px-4 lg:px-5'>
                            <img className='w-5 sm:w-6 lg:w-5 h-5 sm:h-6 lg:h-7' src='img/play.svg' alt="Play" />
                            <a onClick = {()=>Router.push('/portfolio')}className='text-lg sm:text-xl md:text-sm lg:text-lg xl:text-2xl 2xl:text-2xl text-black py-2 sm:py-3 lg:py-2 px-4 sm:px-5 lg:px-4'>
                                Conheça-nos
                            </a>
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-1/3 h-full border-l-2 border-white">
                <img className="w-full h-full object-cover" src="img/1.jpg" alt="Background" />
            </div>
        </div>
    );
}