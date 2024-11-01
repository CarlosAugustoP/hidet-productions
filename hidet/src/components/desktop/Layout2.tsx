import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from 'next/image';

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

const Layout2 = ({ slide }: { slide: Slide }) => {
    const [largeEmbedUrl, setLargeEmbedUrl] = useState<string | null>(null);
    const [smallEmbedUrl, setSmallEmbedUrl] = useState<string | null>(null);

    useEffect(() => {
        // Function to fetch the Vimeo embed URL
        const fetchEmbedUrl = async (videoUrl: string, setEmbedUrl: React.Dispatch<React.SetStateAction<string | null>>) => {
            const videoId = getVideoId(videoUrl);
            if (videoId) {
                try {
                    const response = await fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}`);
                    const data = await response.json();
                    const embedSrc = data.html.match(/src="([^"]+)"/)?.[1] || null;
                    setEmbedUrl(embedSrc);
                } catch (error) {
                    console.error("Failed to fetch Vimeo embed URL:", error);
                }
            }
        };

        // Fetch the embed URL for the large video if it's not an image
        if (!slide.largeImage.isImg) {
            fetchEmbedUrl(slide.largeImage.video, setLargeEmbedUrl);
        }

        // Fetch the embed URL for the first small video if it's not an image
        if (!slide.smallImages[0].isImg) {
            fetchEmbedUrl(slide.smallImages[0].video, setSmallEmbedUrl);
        }
    }, [slide]);

    return (
        <div className='2xl:h-[500px] xl:h-[400px] md:h-[350px] w-5/6 flex gap-2'>
            {/* Large Image/Video Container */}
            <div className="h-full w-1/2 bg-black items-center justify-center overflow-hidden relative">
                <Dialog>
                    <DialogTrigger className='w-full h-full'>
                        <div className="w-full h-full overflow-hidden border-2 border-white">
                            {slide.largeImage.isImg ? (
                                <Image
                                    src={slide.largeImage.img}
                                    alt='Slide Large'
                                    quality={80}
                                    width={1920}
                                    height={1080}
                                    className='w-full h-full object-contain transition-transform duration-200 hover:scale-110 cursor-pointer'
                                    loading='lazy'
                                />
                            ) : (
                                largeEmbedUrl && (
                                    <iframe
                                        className="h-full w-full object-cover bg-black"
                                        src={largeEmbedUrl}
                                        frameBorder="0"
                                        allow="autoplay; fullscreen; picture-in-picture"
                                        allowFullScreen
                                        title={slide.largeImage.title}
                                    ></iframe>
                                )
                            )}
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

            {/* Small Image/Video Container */}
            <div className="h-full w-1/2 bg-black items-center justify-center overflow-hidden relative">
                <Dialog>
                    <DialogTrigger className='w-full h-full'>
                        <div className="w-full h-full overflow-hidden border-2 border-white">
                            {slide.smallImages[0].isImg ? (
                                <Image
                                    src={slide.smallImages[0].img}
                                    alt='Slide Small'
                                    quality={80}
                                    width={1920}
                                    height={1080}
                                    className='w-full h-full object-contain transition-transform duration-200 hover:scale-110 cursor-pointer'
                                    loading='lazy'
                                />
                            ) : (
                                smallEmbedUrl && (
                                    <iframe
                                        className="h-full w-full object-cover bg-black"
                                        src={smallEmbedUrl}
                                        frameBorder="0"
                                        allow="autoplay; fullscreen; picture-in-picture"
                                        allowFullScreen
                                        title={slide.smallImages[0].title}
                                    ></iframe>
                                )
                            )}
                        </div>
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
                                    alt='Slide Small'
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
