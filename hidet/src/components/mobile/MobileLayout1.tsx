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

export default function MobileLayout1({ slide }: { slide: Slide }) {
    const [embedUrl, setEmbedUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchEmbedUrl = async () => {
            const videoId = getVideoId(slide.largeImage.video);
            if (videoId) {
                try {
                    const response = await fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}`);
                    const data = await response.json();
                    setEmbedUrl(data.html.match(/src="([^"]+)"/)?.[1] || null);
                } catch (error) {
                    console.error("Failed to fetch Vimeo embed URL:", error);
                }
            }
        };

        if (!slide.largeImage.isImg) {
            fetchEmbedUrl();
        }
    }, [slide.largeImage.video, slide.largeImage.isImg]);

    return (

        <div className='w-[80%]'>
            <div className="h-full w-full bg-black border-2 border-white items-center justify-center overflow-hidden">
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
                            embedUrl && (<iframe
                                className="h-full w-full object-cover bg-black"
                                src={embedUrl}
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
        </div>
    );


}
