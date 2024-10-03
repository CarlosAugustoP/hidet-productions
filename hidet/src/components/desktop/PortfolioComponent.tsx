import React, { useEffect, useState } from 'react';
import Header from './Header';
import '../../app/globals.css';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { title } from 'process';

export default function PortfolioComponent() {
    const slides = [
        {
            largeImage: {
                src: 'https://via.placeholder.com/600x400?text=Large+Image+1',
                title: 'Large Image 1',
                description: 'Description for Large Image 1',
                date: '2023-01-01',
            },
            smallImages: [
                {
                    src: 'https://via.placeholder.com/300x200?text=Small+1-1',
                    title: 'Small Image 1-1',
                    description: '1dawwwwwwdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                    date: '2023-01-02',
                },
                {
                    src: 'https://via.placeholder.com/300x200?text=Small+1-2',
                    title: 'Small Image 1-2',
                    description: 'Description for Small Image 1-2',
                    date: '2023-01-03',
                },
                {
                    src: 'https://via.placeholder.com/300x200?text=Small+1-3',
                    title: 'Small Image 1-3',
                    description: 'Description for Small Image 1-3',
                    date: '2023-01-04',
                },
                {
                    src: 'https://via.placeholder.com/300x200?text=Small+1-4',
                    title: 'Small Image 1-4',
                    description: 'Description for Small Image 1-4',
                    date: '2023-01-05',
                },
            ],
        },
        {
            largeImage: {
                src: 'https://via.placeholder.com/600x400?text=Large+Image+2',
                title: 'Large Image 2',
                description: 'Description for Large Image 2',
                date: '2023-02-01',
            },
            smallImages: [
                {
                    src: 'https://via.placeholder.com/300x200?text=Small+2-1',
                    title: 'Small Image 2-1',
                    description: 'Description for Small Image 2-1',
                    date: '2023-02-02',
                },
                {
                    src: 'https://via.placeholder.com/300x200?text=Small+2-2',
                    title: 'Small Image 2-2',
                    description: 'Description for Small Image 2-2',
                    date: '2023-02-03',
                },
                {
                    src: 'https://via.placeholder.com/300x200?text=Small+2-3',
                    title: 'Small Image 2-3',
                    description: 'Description for Small Image 2-3',
                    date: '2023-02-04',
                },
                {
                    src: 'https://via.placeholder.com/300x200?text=Small+2-4',
                    title: 'Small Image 2-4',
                    description: 'Description for Small Image 2-4',
                    date: '2023-02-05',
                },
            ],
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="relative h-screen">
            <div className="w-2/3 flex flex-col justify-between p-12 absolute">
                <Header />
            </div>

            <div className="flex items-center justify-center w-full h-full">
                <div className="flex items-center justify-center w-full max-w-7xl gap-4 px-4 mt-16">
                    <button
                        onClick={prevSlide}
                        className="bg-gray-800 text-white p-2 rounded-full"
                    >
                        &#10094;
                    </button>

                    <div className="relative w-full overflow-hidden">
                        <div
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {slides.map((slide, index) => (
                               <div className="flex-shrink-0 w-full flex gap-2 items-stretch" key={index}>
                               <div className="w-1/2 flex items-center justify-center">
                                   <Dialog>
                                       <DialogTrigger>
                                           <img
                                               src={slide.largeImage.src}
                                               alt={`Slide ${index + 1} Large`}
                                               className="w-full h-full object-cover"
                                               style={{ maxHeight: '400px' }} 
                                           />
                                       </DialogTrigger>
                                               <DialogContent className=' text-white bg-black'>
                                                   <DialogHeader>
                                                       <DialogTitle className='flex gap-4 items-center'><h2 className='2xl:text-4xl xl:text-2xl lg:text-xl'>{slide.largeImage.title}</h2><p className='text-lg font-thin'>{slide.largeImage.date}</p></DialogTitle>
                                                       <DialogDescription className='mt-4 2xl:text-lg xl:text-md lg:text-sm'>This is a very long description that should wrap to the next line when it exceeds the width of the dialog. If it doesn't wrap, it will overflow horizontally and cause layout issues.This is a very long description that should wrap to the next line when it exceeds the width of the dialog. that should wrap to the next line when it exceeds the width of the dialog. If it doesn't wrap, it will overflow horizontally and cause layout issues.</DialogDescription>
                                                         <div className='mt-6 mb-6 w-full items-center justify-center flex'><img src={slide.largeImage.src} alt={slide.largeImage.title} className=' w-4/5 object-cover rounded-[10px] border-white border-2' /></div>
                                                   </DialogHeader>
                                               </DialogContent>
                                           </Dialog>
                               </div>
                               <div className="w-1/2 grid grid-cols-2 grid-rows-2 gap-2">
                                   {slide.smallImages.map((image, idx) => (
                                       <div key={idx} className="flex items-center justify-center">
                                           <Dialog>
                                               <DialogTrigger>
                                                   <img
                                                       src={image.src}
                                                       alt={`Slide ${index + 1} Small ${idx + 1}`}
                                                       className="w-full h-full object-cover"
                                                       style={{ maxHeight: '200px' }}
                                                   />
                                               </DialogTrigger>
                                               <DialogContent className=' text-white bg-black'>
                                                   <DialogHeader>
                                                       <DialogTitle className='flex gap-4 items-center'><h2 className='2xl:text-4xl xl:text-2xl lg:text-xl'>{image.title}</h2><p className='text-lg font-thin'>{image.date}</p></DialogTitle>
                                                       <DialogDescription className='mt-4 2xl:text-lg xl:text-md lg:text-sm'>This is a very long description that should wrap to the next line when it exceeds the width of the dialog. If it doesn't wrap, it will overflow horizontally and cause layout issues.This is a very long description that should wrap to the next line when it exceeds the width of the dialog. that should wrap to the next line when it exceeds the width of the dialog. If it doesn't wrap, it will overflow horizontally and cause layout issues.</DialogDescription>
                                                         <div className='mt-6 mb-6 w-full items-center justify-center flex'><img src={image.src} alt={image.title} className=' w-4/5 object-cover rounded-[10px] border-white border-2' /></div>
                                                   </DialogHeader>
                                               </DialogContent>
                                           </Dialog>
                                       </div>
                                   ))}
                               </div>
                           </div>
                            ))}
                    </div>
                </div>

                <button
                    onClick={nextSlide}
                    className="bg-gray-800 text-white p-2 rounded-full"
                >
                    &#10095;
                </button>
            </div>
        </div>
        </div >
        
    );
}
