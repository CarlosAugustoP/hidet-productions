import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/pages/api/firebase/firebase";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "@/hooks/use-toast";
import Router from "next/router";

interface Slide {
    title: string;
    id: number;
    order: number; 
}

interface Post {
    id: number;
    title: string;
    content: string;
    img: string; 
}

async function getAllSlides() {
    const res = await fetch('/api/slides');
    const data = await res.json();
    return data;
}

async function getSlidesPosts(slideId: number) {    
    const res = await fetch(`/api/slides/${slideId}/posts`, {
        method: 'GET',
    });
    const data = await res.json();
    return data;
}

export default function Slides() {
    const [slides, setSlides] = useState<Slide[]>([]);
    const [slidesPosts, setSlidesPosts] = useState<{ [key: number]: Post[] }>({});

    useEffect(() => {
        getAllSlides().then((data) => {
            setSlides(data);

            data.forEach((slide: Slide) => {
                getSlidesPosts(slide.id).then((posts) => {
                    setSlidesPosts((prevPosts) => ({
                        ...prevPosts,
                        [slide.id]: posts, 
                    }));
                });
            });
        });
    }, []);

    return (
        <div className="w-full flex items-center justify-center mt-16" >
            {slides.map((slide) => (
                <div key={slide.id} className="slide w-4/5 flex flex-col gap-3 bg-white shadow-md rounded-lg p-8 cursor-pointer" onClick={()=>Router.push(`/admin/slides/${slide.id}`)}>
                    <h2 className="text-black font-bold text-3xl">{slide.title}</h2>
                    <p>Ordem de apresentação: {slide.order}</p>
                    <p>Identificação: {slide.id}</p>
                    {slidesPosts[slide.id] ? (
                        <div className="flex items-center gap-6 justify-start w-full overflow-x-auto">
                            {slidesPosts[slide.id].map((post) => (
                                <div key={post.id} className="post">
                                    <img className= 'h-36' src = {post.img}></img>
                                    <p>{post.content}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Loading posts...</p>
                    )}
                </div>
            ))}
        </div>
    );
}
