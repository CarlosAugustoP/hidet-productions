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

const Layout2 = ({ slide }: { slide: Slide }) => {
    return (
        <div className="flex-shrink-0 w-full flex gap-2 items-stretch ">
            <div className="w-1/2 h-full flex items-center justify-center">
                <Dialog>
                    <DialogTrigger>
                        <img
                            src={slide.largeImage.img}
                            alt={`Slide Large`}
                            className='w-full h-full object-cover'
                            style={{ maxHeight: '400px' }}
                        />
                    </DialogTrigger>
                    <DialogContent className=' text-white bg-black'>
                        <DialogHeader>
                            <DialogTitle className='flex gap-4 items-center'>
                                <h2 className='2xl:text-4xl xl:text-2xl lg:text-xl'>{slide.largeImage.title}</h2>
                                <p className='text-lg font-thin'>{slide.largeImage.date}</p>
                            </DialogTitle>
                            <DialogDescription className='mt-4 2xl:text-lg xl:text-md lg:text-sm'>
                                This is a very long description that should wrap to the next line when it exceeds the width of the dialog.
                            </DialogDescription>
                            <div className='mt-6 mb-6 w-full items-center justify-center flex'>
                                <img src={slide.largeImage.img} alt={slide.largeImage.title} className='w-4/5 object-cover rounded-[10px] border-white border-2' />
                            </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="w-1/2 flex items-center justify-center">
                <Dialog>
                    <DialogTrigger>
                        <img
                            src={slide.smallImages[0].img}
                            alt={`Slide Large Duplicate`}
                            className='w-full h-full object-cover'
                            style={{ maxHeight: '400px' }}
                        />
                    </DialogTrigger>
                    <DialogContent className=' text-white bg-black'>
                        <DialogHeader>
                            <DialogTitle className='flex gap-4 items-center'>
                                <h2 className='2xl:text-4xl xl:text-2xl lg:text-xl'>{slide.smallImages[0].title}</h2>
                                <p className='text-lg font-thin'>{slide.smallImages[0].date}</p>
                            </DialogTitle>
                            <DialogDescription className='mt-4 2xl:text-lg xl:text-md lg:text-sm'>
                                This is a very long description that should wrap to the next line when it exceeds the width of the dialog.
                            </DialogDescription>
                            <div className='mt-6 mb-6 w-full items-center justify-center flex'>
                                <img src={slide.smallImages[0].img} alt={slide.smallImages[0].title} className='w-4/5 object-cover rounded-[10px] border-white border-2' />
                            </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default Layout2;
