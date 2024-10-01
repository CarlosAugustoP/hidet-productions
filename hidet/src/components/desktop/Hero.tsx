import React from 'react';
import Header from './Header';

export default function Hero() {
    return (
        <div className="flex h-[90vh]">
            <div className="w-2/3 flex flex-col h-full justify-between p-10">
                <Header />
                <div className='h-2/3 flex justify-between flex-col mb-5'>
                    <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-left font-semibold">
                        Soluções audiovisuais compatíveis com seu negócio.
                    </h1>
                    <p className='text-xl sm:text-xxl md:text-2xl lg:text-3xl xl:text-3xl text-white'>
                        Vídeo • Fotografia • Áudio • Edição
                    </p>
                    <div className='flex gap-6 items-center'>
                        <button className='rounded-lg bg-white text-black'>
                            <p className='text-xl sm:text-xxl md:text-2xl lg:text-xl xl:text-2xl text-black py-3 px-5'>Entre em contato</p>
                        </button>
                        <button className='rounded-lgb bg-white rounded-lg text-black flex items-center gap-1 px-4'>
                            <img className='w-6 h-6 ' src='img/play.svg'></img>
                            <p className='text-xl sm:text-xxl md:text-2xl lg:text-xl xl:text-2xl text-black py-3 px-5'>Conheça-nos</p>
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-1/3 h-full border-l-2 border-b-2 border-white">
                <img className="w-full h-full object-cover" src="img/1.jpg"></img>
            </div>
        </div>
    );
}
