import React from 'react';
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

const Layout1 = ({slide}: {slide: Slide}) => {
    return (
        <div className='2xl:h-[600px] xl:h-[500px] lg:h-[400px] md:h-[350px] w-5/6'>
            <div className="h-full w-full bg-black border-2 border-white items-center justify-center">
                <Image
                    src={slide.largeImage.img}
                    alt='Slide Large'
                    quality={80}
                    width={1920}
                    height={1080}
                    className='w-full h-full object-contain'
                    loading='lazy'
                />
            </div>
        </div>
    );
};

export default Layout1;
