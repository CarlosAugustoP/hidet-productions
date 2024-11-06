import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from 'next/image';
import { Slide } from './HomeMadeCarousel';


const getVideoId = (url: string) => {
    const match = url.match(/(\d+)$/);
    return match ? match[0] : null;
}

const Layout5 = ({ slide }: { slide: Slide }) => {
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
        <div className='2xl:h-[500px] xl:h-[400px] md:h-[350px] w-5/6 flex gap-2'>
            <div className="h-full w-1/2 bg-black items-center justify-center">
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
                                embedUrls[0] && (
                                    <iframe
                                        className="h-full w-full object-cover bg-black"
                                        src={embedUrls[0]}
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
            <div className='flex w-1/2 h-full justify-between'>
                <div className='flex flex-col w-[49%] h-full justify-between'>
                    {slide.smallImages.slice(0, 2).map((smallImage, i) => (
                        <div key={i} className="h-[49%] bg-black items-center justify-center">
                            <Dialog>
                                <DialogTrigger className='w-full h-full'>
                                    <div className="w-full h-full overflow-hidden border-2 border-white">
                                        {smallImage.isImg ? (
                                            <Image
                                                src={smallImage.img}
                                                alt='Slide Small'
                                                quality={80}
                                                width={1920}
                                                height={1080}
                                                className='w-full h-full object-contain transition-transform duration-200 hover:scale-110 cursor-pointer'
                                                loading='lazy'
                                            />
                                        ) : (
                                            embedUrls[i + 1] && (
                                                <iframe
                                                    className="h-full w-full object-cover bg-black"
                                                    src={embedUrls[i + 1] || undefined}
                                                    frameBorder="0"
                                                    allow="autoplay; fullscreen; picture-in-picture"
                                                    allowFullScreen
                                                    title={smallImage.title}
                                                ></iframe>
                                            )
                                        )}
                                    </div>
                                </DialogTrigger>
                                <DialogContent className='text-white bg-black'>
                                    <DialogHeader>
                                        <DialogTitle className='flex gap-4 items-center'>
                                            <h2 className='2xl:text-4xl xl:text-2xl lg:text-xl'>{smallImage.title}</h2>
                                            <p className='text-lg font-thin'>{smallImage.date}</p>
                                        </DialogTitle>
                                        <DialogDescription className='mt-4 2xl:text-lg xl:text-md lg:text-sm'>
                                            {smallImage.description}
                                        </DialogDescription>
                                        <div className='mt-6 mb-6 w-full items-center justify-center flex'>
                                            <Image
                                                src={smallImage.img}
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
                    ))}
                </div>
                <div className='flex flex-col w-[49%] h-full justify-between'>
                    {slide.smallImages.slice(2, 4).map((smallImage, i) => (
                        <div key={i + 2} className="h-[49%] bg-black items-center justify-center">
                            <Dialog>
                                <DialogTrigger className='w-full h-full'>
                                    <div className="w-full h-full overflow-hidden border-2 border-white">
                                        {smallImage.isImg ? (
                                            <Image
                                                src={smallImage.img}
                                                alt='Slide Small'
                                                quality={80}
                                                width={1920}
                                                height={1080}
                                                className='w-full h-full object-contain transition-transform duration-200 hover:scale-110 cursor-pointer'
                                                loading='lazy'
                                            />
                                        ) : (
                                            embedUrls[i + 3] && (
                                                <iframe
                                                    className="h-full w-full object-cover bg-black"
                                                    src={embedUrls[i + 3] || undefined}
                                                    frameBorder="0"
                                                    allow="autoplay; fullscreen; picture-in-picture"
                                                    allowFullScreen
                                                    title={smallImage.title}
                                                ></iframe>
                                            )
                                        )}
                                    </div>
                                </DialogTrigger>
                                <DialogContent className='text-white bg-black'>
                                    <DialogHeader>
                                        <DialogTitle className='flex gap-4 items-center'>
                                            <h2 className='2xl:text-4xl xl:text-2xl lg:text-xl'>{smallImage.title}</h2>
                                            <p className='text-lg font-thin'>{smallImage.date}</p>
                                        </DialogTitle>
                                        <DialogDescription className='mt-4 2xl:text-lg xl:text-md lg:text-sm'>
                                            {smallImage.description}
                                        </DialogDescription>
                                        <div className='mt-6 mb-6 w-full items-center justify-center flex'>
                                            <Image
                                                src={smallImage.img}
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
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Layout5;
