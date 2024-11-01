import React, { useEffect, useState } from "react";
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
        video: string;
        isImg: boolean;
    }[];
}

const getVideoId = (url: string) => {
    const match = url.match(/(\d+)$/);
    return match ? match[0] : null;
}

export default function MobileLayout3({ slide }: { slide: Slide }) {
    const [embedUrls, setEmbedUrls] = useState<(string | null)[]>(Array(slide.smallImages.length + 1).fill(null));

    useEffect(() => {
        const fetchEmbedUrl = async (videoUrl: string, index: number) => {
            const videoId = getVideoId(videoUrl);
            if (videoId) {
                try {
                    const response = await fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}`);
                    const data = await response.json();
                    const embedSrc = data.html.match(/src="([^"]+)"/)?.[1] || null;
                    setEmbedUrls(prevUrls => {
                        const newUrls = [...prevUrls];
                        newUrls[index] = embedSrc;
                        return newUrls;
                    });
                } catch (error) {
                    console.error("Failed to fetch Vimeo embed URL:", error);
                }
            }
        };

        // Fetch the embed URL for the large video if it's not an image
        if (!slide.largeImage.isImg) {
            fetchEmbedUrl(slide.largeImage.video, 0);
        }

        // Fetch the embed URLs for the small videos if they are not images
        slide.smallImages.forEach((smallImage, i) => {
            if (!smallImage.isImg) {
                fetchEmbedUrl(smallImage.video, i + 1);
            }
        });
    }, [slide]);

    return (
        <div className='w-[80%] flex gap-2 flex-col'>
            <div className="w-full bg-black border-2 border-white overflow-hidden">
                <Dialog>
                    <DialogTrigger className='w-full h-full'>
                        {slide.largeImage.isImg ?
                            <Image
                                src={slide.largeImage.img}
                                alt='Slide Large'
                                quality={80}
                                width={1920}
                                height={1080}
                                className='w-full max-h-[50vh] object-contain transition-transform duration-200 hover:scale-110 cursor-pointer'
                                loading='lazy'
                            /> :
                            embedUrls[0] && (<iframe
                                className="h-full w-full object-cover bg-black"
                                src={embedUrls[0] || undefined}
                                frameBorder="0"
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                                title={slide.largeImage.title}
                            ></iframe>)}
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
                                    loading='lazy'
                                    className='max-w-[30vh] max-h-[30vh] object-contain'
                                />
                            </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="flex gap-2">
                <div className="h-full w-1/2 bg-black border-2 border-white items-center justify-center overflow-hidden">
                    <Dialog>
                        <DialogTrigger className='w-full h-full'>
                            {slide.smallImages[0].isImg ?
                                <Image
                                    src={slide.smallImages[0].img}
                                    alt='Slide Large'
                                    quality={80}
                                    width={1920}
                                    height={1080}
                                    className='w-full max-h-[50vh] object-contain transition-transform duration-200 hover:scale-110 cursor-pointer'
                                    loading='lazy'
                                /> :
                                embedUrls[1] && (<iframe
                                    className="w-full object-contain transition-transform duration-200 hover:scale-110 cursor-pointer max-h-[50vh]"
                                    src={embedUrls[1] || undefined}
                                    frameBorder="0"
                                    allow="autoplay; fullscreen; picture-in-picture"
                                    allowFullScreen
                                    title={slide.smallImages[0].title}
                                ></iframe>)}
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
                                        alt='Slide Large'
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
                <div className="h-full w-1/2 bg-black border-2 border-white items-center justify-center overflow-hidden">
                    <Dialog>
                        <DialogTrigger className='w-full h-full'>
                            {slide.smallImages[1].isImg ?
                                <Image
                                    src={slide.smallImages[1].img}
                                    alt='Slide Large'
                                    quality={80}
                                    width={1920}
                                    height={1080}
                                    className='w-full max-h-[50vh] object-contain transition-transform duration-200 hover:scale-110 cursor-pointer'
                                    loading='lazy'
                                /> :
                                embedUrls[2] && <iframe
                                    className="w-full object-contain transition-transform duration-200 hover:scale-110 cursor-pointer max-h-[50vh]"
                                    src={embedUrls[2]}
                                    frameBorder="0"
                                    allow="autoplay; fullscreen; picture-in-picture"
                                    allowFullScreen
                                    title={slide.smallImages[1].title}
                                ></iframe>}
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
                                        alt='Slide Large'
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
