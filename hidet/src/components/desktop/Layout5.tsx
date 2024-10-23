import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Slide {
    largeImage: {
        img: string;
        title: string;
        date: string;
    };
    smallImages: {
        img: string;
        title: string;
        date: string;
    }[];
}

const Layout5 = (/*{ slide }: { slide: Slide }*/) => {
    return (
        <div className='2xl:h-[600px] xl:h-[500px] lg:h-[400px] md:h-[350px] w-5/6 flex gap-2'>
            <div className="h-full w-1/2 bg-black items-center justify-center">
                <img src = 'img/1.jpg' alt='Slide Large' className='w-full h-full object-contain border-white border'/>
            </div>
            <div className='flex w-1/2 h-full justify-between'>
                <div className='flex flex-col w-[49%] h-full justify-between'>
                    <div className="h-[49%] bg-black items-center justify-center">
                        <img src = 'img/1.jpg' alt='Slide Small 1' className='w-full h-full object-contain border-white border'/>
                    </div>
                    <div className="h-[49%] bg-black items-center justify-center">
                        <img src = 'img/1.jpg' alt='Slide Small 2' className='w-full h-full object-contain border-white border'/>
                    </div>
                </div>
                <div className='flex flex-col w-[49%] h-full justify-between'>
                    <div className="h-[49%] bg-black items-center justify-center">
                        <img src = 'img/1.jpg' alt='Slide Small 1' className='w-full h-full object-contain border-white border'/>
                    </div>
                    <div className="h-[49%] bg-black items-center justify-center">
                        <img src = 'img/1.jpg' alt='Slide Small 2' className='w-full h-full object-contain border-white border'/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout5;
