import React from 'react';
import Header from './Header';

export default function Hero() {
    return (
        <div className="flex h-[90vh]">
            <div className="w-2/3 flex flex-col h-full justify-between p-16">
                <Header />
                <div className='h-3/4 flex justify-between flex-col mb-5'>
                    <h1 className="text-white text-4xl sm:text-5xl md:text-custom-3xl-4xl lg:text-custom-5xl-6xl xl:text-7xl 2xl:text-huge text-left font-semibold">
                        Soluções audiovisuais compatíveis com seu negócio.
                    </h1>
                    <p className='text-xl sm:text-xxl md:text-xl lg:text-2xl xl:text-3xl text-white'>
                        Vídeo • Fotografia • Áudio • Edição
                    </p>
                    <div className='flex gap-6 items-center'>
                        <button className='rounded-lg bg-white text-black'>
                            <p className='text-lg sm:text-xl md:text-sm lg:text-lg xl:text-2xl 2xl:text-2xl text-black py-2 sm:py-3 lg:py-2 px-4 sm:px-5 lg:px-4'>
                                Entre em contato
                            </p>
                        </button>
                        <button className='rounded-lg bg-white text-black flex items-center gap-1 px-3 sm:px-4 lg:px-5'>
                            <img className='w-5 sm:w-6 lg:w-5 h-5 sm:h-6 lg:h-7' src='img/play.svg' />
                            <p className='text-lg sm:text-xl md:text-sm lg:text-lg xl:text-2xl 2xl:text-2xl text-black py-2 sm:py-3 lg:py-2 px-4 sm:px-5 lg:px-4'>
                                Conheça-nos
                            </p>
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-1/3 h-full border-l-2 border-white">
                <img className="w-full h-full object-cover" src="img/1.jpg"></img>
            </div>
        </div>
    );
}
