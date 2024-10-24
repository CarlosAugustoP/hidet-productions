import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from 'next/image';

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

const Layout2 = ({ slide }: { slide: Slide }) => {
    return (
        <div className='2xl:h-[600px]  xl:h-[500px] lg:h-[400px] md:h-[350px] w-5/6 flex gap-2'>
            <div className="h-full w-1/2 bg-black items-center justify-center">
                <Image
                    src={slide.largeImage.img}
                    alt='Slide Large'
                    quality={80}
                    width={1920}
                    height={1080}
                    className='w-full h-full object-contain border-white border'
                    loading='lazy'
                />
            </div>
            <div className="h-full w-1/2 bg-black items-center justify-center">
                <Image
                    src={slide.smallImages[0].img}
                    alt='Slide Large'
                    quality={80}
                    width={1920}
                    height={1080}
                    className='w-full h-full object-contain border-white border'
                    loading='lazy'
                />
            </div>

        </div>
    );
};

export default Layout2;
