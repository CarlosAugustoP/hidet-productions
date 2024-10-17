import React, { useState, useEffect } from "react";
import Header from "@/components/admin/photos/Header";
import { useRouter } from "next/router";

interface Slide {
    title: string;
    id: number;
    order: number;
}

interface Post {
    id: string;
    title: string;
    description: string;
    img: string;
}

async function getSlidesPosts(slideId: number) {
    const res = await fetch(`/api/slides/${slideId}/posts`, {
        method: 'GET',
    });
    const data = await res.json();
    return data;
}

export default function SpecificSlidePage() {
    const router = useRouter();
    const { id } = router.query; // Slide ID from the URL

    const [slide, setSlide] = useState<Slide | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    const getCurrentSlide = async () => {
        try {
            // Fetch the slide information
            const slideRes = await fetch(`/api/slides/${id}`);
            const slideData = await slideRes.json();
            setSlide(slideData); 

            // Fetch the posts associated with the slide
            const postsData = await getSlidesPosts(Number(id));
            setPosts(postsData);
        } catch (error) {
            console.error("Failed to fetch slide or posts", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            getCurrentSlide(); // Fetch both the slide and its posts
        }
    }, [id]);

    if (loading) {
        return <p className="h-screen bg-white w-full">Loading...</p>;
    }

    if (!slide) {
        return <p>Slide not found</p>;
    }

    return (
        <div className="bg-gray-200 min-h-screen">
            <Header />
            <div className="w-full flex flex-col items-center mt-16">
                <h1 className="text-4xl font-bold">{slide.title}</h1>
                <p className="text-lg">Order: {slide.order}</p>
            
            </div>
        </div>
    );
}
