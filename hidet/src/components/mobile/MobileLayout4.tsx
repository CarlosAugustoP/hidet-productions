import React from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Slide {
    largeImage: {
        img: string;
        title: string;
        date: string;
        description: string;
        video: string;
        isImg: boolean;

    };
    smallImages: {
        img: string;
        title: string;
        date: string;
        description: string;

    }[];
}

export default function MobileLayout4({ slide }: { slide: Slide }) {
    return (
        <div className='w-[80%] flex flex-col gap-2'>
            <div className="flex gap-2">
                {/* Large Image */}
                <div className="h-full w-1/2 bg-black border-2 border-white items-center justify-center overflow-hidden">
                    <Dialog>
                        <DialogTrigger className='w-full h-full'>
                            <Image
                                src={slide.largeImage.img}
                                alt={slide.largeImage.title}
                                quality={80}
                                width={1920}
                                height={1080}
                                className='w-full max-h-[50vh] object-contain transition-transform duration-200 hover:scale-110 cursor-pointer'
                                loading='lazy'
                            />
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
                                        alt={slide.largeImage.title}
                                        quality={80}
                                        width={1920}
                                        height={1080}
                                        loading='lazy'
                                        className='max-w-[30vh] max-h-[30vh] object-contain'
                                    />
                                </div>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* First Small Image */}
                <div className="h-full w-1/2 bg-black border-2 border-white items-center justify-center overflow-hidden">
                    <Dialog>
                        <DialogTrigger className='w-full h-full'>
                            <Image
                                src={slide.smallImages[0].img}
                                alt={slide.smallImages[0].title}
                                quality={80}
                                width={1920}
                                height={1080}
                                className='w-full max-h-[50vh] object-contain transition-transform duration-200 hover:scale-110 cursor-pointer'
                                loading='lazy'
                            />
                        </DialogTrigger>
                        <DialogContent className='text-white bg-black'>
                            <DialogHeader>
                                <DialogTitle className='flex gap-4 items-center'>
                                    <h2 className='2xl:text-4xl xl:text-2xl lg:text-xl'>{slide.smallImages[0].title}</h2>
                                    <p className='text-lg font-thin'>{slide.smallImages[0].date}</p>
                                </DialogTitle>
                                <DialogDescription className='mt-4 2xl:text-lg xl:text-md lg:text-sm'>
                                    {slide.smallImages[0].description}
                                </DialogDescription>
                                <div className='mt-6 mb-6 w-full items-center justify-center flex'>
                                    <Image
                                        src={slide.smallImages[0].img}
                                        alt={slide.smallImages[0].title}
                                        quality={80}
                                        width={1920}
                                        height={1080}
                                        loading='lazy'
                                        className='max-w-[30vh] max-h-[30vh] object-contain'
                                    />
                                </div>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Second row of small images */}
            <div className="flex gap-2">
                {/* Second Small Image */}
                <div className="h-full w-1/2 bg-black border-2 border-white items-center justify-center overflow-hidden">
                    <Dialog>
                        <DialogTrigger className='w-full h-full'>
                            <Image
                                src={slide.smallImages[1].img}
                                alt={slide.smallImages[1].title}
                                quality={80}
                                width={1920}
                                height={1080}
                                className='w-full max-h-[50vh] object-contain transition-transform duration-200 hover:scale-110 cursor-pointer'
                                loading='lazy'
                            />
                        </DialogTrigger>
                        <DialogContent className='text-white bg-black'>
                            <DialogHeader>
                                <DialogTitle className='flex gap-4 items-center'>
                                    <h2 className='2xl:text-4xl xl:text-2xl lg:text-xl'>{slide.smallImages[1].title}</h2>
                                    <p className='text-lg font-thin'>{slide.smallImages[1].date}</p>
                                </DialogTitle>
                                <DialogDescription className='mt-4 2xl:text-lg xl:text-md lg:text-sm'>
                                    {slide.smallImages[1].description}
                                </DialogDescription>
                                <div className='mt-6 mb-6 w-full items-center justify-center flex'>
                                    <Image
                                        src={slide.smallImages[1].img}
                                        alt={slide.smallImages[1].title}
                                        quality={80}
                                        width={1920}
                                        height={1080}
                                        loading='lazy'
                                        className='max-w-[30vh] max-h-[30vh] object-contain'
                                    />
                                </div>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Third Small Image */}
                <div className="h-full w-1/2 bg-black border-2 border-white items-center justify-center overflow-hidden">
                    <Dialog>
                        <DialogTrigger className='w-full h-full'>
                            <Image
                                src={slide.smallImages[2].img}
                                alt={slide.smallImages[2].title}
                                quality={80}
                                width={1920}
                                height={1080}
                                className='w-full max-h-[50vh] object-contain transition-transform duration-200 hover:scale-110 cursor-pointer'
                                loading='lazy'
                            />
                        </DialogTrigger>
                        <DialogContent className='text-white bg-black'>
                            <DialogHeader>
                                <DialogTitle className='flex gap-4 items-center'>
                                    <h2 className='2xl:text-4xl xl:text-2xl lg:text-xl'>{slide.smallImages[2].title}</h2>
                                    <p className='text-lg font-thin'>{slide.smallImages[2].date}</p>
                                </DialogTitle>
                                <DialogDescription className='mt-4 2xl:text-lg xl:text-md lg:text-sm'>
                                    {slide.smallImages[2].description}
                                </DialogDescription>
                                <div className='mt-6 mb-6 w-full items-center justify-center flex'>
                                    <Image
                                        src={slide.smallImages[2].img}
                                        alt={slide.smallImages[2].title}
                                        quality={80}
                                        width={1920}
                                        height={1080}
                                        loading='lazy'
                                        className='max-w-[30vh] max-h-[30vh] object-contain'
                                    />
                                </div>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}
