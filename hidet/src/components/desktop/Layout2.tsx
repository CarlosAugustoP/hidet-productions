import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from 'next/image';

interface Slide {
    largeImage: {
        img: string;
        title: string;
        date: string;
        description: string;
        video:string;

    };
    smallImages: {
        img: string;
        title: string;
        date: string;
        description: string;
        video: string;
    }[];
}

const Layout2 = ({ slide }: { slide: Slide }) => {
    return (
        <div className='2xl:h-[500px] xl:h-[400px] md:h-[350px] w-5/6 flex gap-2'>
            {/* Ensure the container has overflow-hidden */}
            <div className="h-full w-1/2 bg-black items-center justify-center overflow-hidden relative">
                <Dialog>
                    <DialogTrigger className='w-full h-full'>
                        <div className="w-full h-full overflow-hidden border-2 border-white">
                            <Image
                                src={slide.largeImage.img}
                                alt='Slide Large'
                                quality={80}
                                width={1920}
                                height={1080}
                                className='w-full h-full object-contain transition-transform duration-200 hover:scale-110 cursor-pointer'
                                loading='lazy'
                            />
                        </div>
                    </DialogTrigger>

                    <DialogContent className='text-white bg-black'>
                        <DialogHeader>
                            <DialogTitle className='flex gap-4 items-center'>
                                <h2 className='2xl:text-4xl xl:text-2xl lg:text-xl'>{slide.largeImage.title}</h2>
                                <p className='text-lg font-thin'>{slide.largeImage.date}</p>
                            </DialogTitle>
                            <DialogDescription className='mt-4 2xl:text-lg xl:text-md lg:text-sm'>
                                {slide.largeImage.description}
                            </DialogDescription>
                            <div className='mt-6 mb-6 w-full items-center justify-center flex'>
                                <Image
                                    src={slide.largeImage.img}
                                    alt='Slide Large'
                                    quality={80}
                                    width={1920}
                                    height={1080}
                                    className='max-w-[70vh] max-h-[60vh] object-contain border-2 border-white'
                                    loading='lazy'
                                />
                            </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Same for the second image */}
            <div className="h-full w-1/2 bg-black items-center justify-center overflow-hidden relative">
                <Dialog>
                    <DialogTrigger className='w-full h-full'>
                    <div className="w-full h-full overflow-hidden border-2 border-white">
                            <Image
                                src={slide.smallImages[0].img}
                                alt='Slide Large'
                                quality={80}
                                width={1920}
                                height={1080}
                                className='w-full h-full object-contain transition-transform duration-200 hover:scale-110 cursor-pointer'
                                loading='lazy'
                            />
                        </div>
                    </DialogTrigger>
                    <DialogContent className='text-white bg-black'>
                        <DialogHeader>
                            <DialogTitle className='flex gap-4 items-center'>
                                <h2 className='2xl:text-4xl xl:text-2xl lg:text-xl'>{slide.largeImage.title}</h2>
                                <p className='text-lg font-thin'>{slide.largeImage.date}</p>
                            </DialogTitle>
                            <DialogDescription className='mt-4 2xl:text-lg xl:text-md lg:text-sm'>
                                {slide.smallImages[0].description}
                            </DialogDescription>
                            <div className='mt-6 mb-6 w-full items-center justify-center flex'>
                                <Image
                                    src={slide.smallImages[0].img}
                                    alt='Slide Large'
                                    quality={80}
                                    width={1920}
                                    height={1080}
                                    className='max-w-[70vh] max-h-[60vh] object-contain border-2 border-white'
                                    loading='lazy'
                                />
                            </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default Layout2;
