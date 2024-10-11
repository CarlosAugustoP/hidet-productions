import React, { useState, useEffect } from "react";
import PostComponent from "@/components/admin/photos/PostComponent";

interface Post {
    id: string;
    title: string;
    img: string;
    description: string;
    postedAt: string;
}

async function getAllPosts() {
    const res = await fetch('../api/posts');
    const data = await res.json();
    return data;
}

export default function Posts() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        getAllPosts().then(data => setPosts(data));
    }, []);

    return (
        <div className="flex flex-col items-center w-full h-full p-6 bg-gray-200">
            {posts.map(post => (
                <PostComponent
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    img={post.img}
                    description={post.description}
                    postedAt={post.postedAt}
                />
            ))}
        </div>
    );
}
