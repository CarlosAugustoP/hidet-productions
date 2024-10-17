import React, { useState, useEffect } from "react";
import Header from "@/components/admin/photos/Header";
import Posts from "@/components/admin/photos/Posts"; // Importe o componente Posts
import { useRouter } from "next/router";

interface Slide {
    title: string;
    id: number;
    order: number;
}

export default function SpecificSlidePage() {
    const router = useRouter();
    const { id } = router.query; 

    const [slide, setSlide] = useState<Slide | null>(null);
    const [loading, setLoading] = useState(true);

    const getCurrentSlide = async () => {
        try {
            const slideRes = await fetch(`/api/slides/${id}`);
            const slideData = await slideRes.json();
            setSlide(slideData); 
        } catch (error) {
            console.error("Failed to fetch slide", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            getCurrentSlide(); 
        }
    }, [id]);

    if (loading) {
        return <p className="h-screen bg-white w-full">Loading...</p>;
    }

    if (!slide) {
        return <p>Slide not found</p>;
    }

    const slideProp = slide.title + " - " + slide.order;

    return (
        <div className="bg-gray-200 min-h-screen">
            <Header slideName = {slideProp} />
            <div className="w-full flex flex-col items-center mt-16">
                <Posts slideId={slide.id} />
            </div>
        </div>
    );
}
