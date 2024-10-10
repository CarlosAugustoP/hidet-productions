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
        <div className="flex flex-col w-full items-center justify-center mt-10 " id = "hero">
            <div className="w-5/6 h-full flex flex-col gap-10 tablet:gap-12">            
            <div className="border-2 h-[300px] tablet:h-[400px] flex flex-col justify-center items-center border-white rounded-lg">
                <img className="w-full h-full object-cover rounded-lg" src="img/1.jpg" alt="Background" />
            </div>
            <div className='flex h-2/5 gap-10 flex-col'>
                    <h1 className="text-white text-3xl tablet:text-6xl text-left font-semibold">
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
                        <p className='tablet:text-2xl text-white md:text-3xl '>
                            Vídeo • Fotografia • Áudio • Edição
                        </p>
                    </div>
                    <div className='flex gap-6 items-center '>
                        <button className=' hover:scale-110 cursor-pointer transition-transform duration-200 rounded-[5px] tablet:text-2xl  bg-white text-black flex items-center px-2'>
                            <a href = "#contact" className='text-black py-2'>
                                Entre em contato
                            </a>
                        </button>
                        <button className='hover:scale-110 cursor-pointer transition-transform duration-200 rounded-[5px] tablet:text-2xl  bg-white text-black flex items-center gap-1 px-3'>
                            <img className='w-5 h-7' src='img/play.svg' alt="Play" />
                            <a onClick = {()=>Router.push('/portfolio')}className='text-black py-2'>
                                Conheça-nos
                            </a>
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    );
}