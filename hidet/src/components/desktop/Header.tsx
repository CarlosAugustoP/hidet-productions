import '../../app/globals.css';
import Image from 'next/image';
import React from 'react';

export default function Header() {
    return (
        <div className="absolute top-5 left-5 flex w-2/3 justify-between gap-10">
            <div className="w-1/4"> 
                <Image src="/img/logo.png" alt="logo" layout="responsive" width={500} height={500} objectFit="contain" />
            </div>
            <div className='text-white flex items-center gap-10 mb-2 w-3/4'>
                <h1 className='text-4xl'>Sobre nós</h1>
                <h1 className='text-4xl'>Contato</h1>
                <h1 className='text-4xl'>Portfolio</h1>
            </div>
        </div>
    );
}
