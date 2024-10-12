import React from "react";
import Image from 'next/image';

export default function Header() {
    return (
        <div className="bg-gray-300">
            <div className="flex items-center justify-between w-full px-5 border-b border-black py-4">
                <div className='flex gap-6 items-center'>
                    <img src="../img/logopreto.png" alt="Logo" className="w-36 cursor-pointer"onClick={
                        () => window.location.href = '/'
                    } />
                    <h1 className="font-semibold 2xl:text-5xl xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl xs:text-lg">Admin</h1>
                </div>
            </div>
        </div>
    );
}
