import React, { useState, useEffect } from "react";
import PostComponent from "@/components/admin/photos/PostComponent";
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
import { toast } from "@/hooks/use-toast";

interface Post {
    id: string;
    title: string;
    img: string;
    description: string;
    postedAt: string;
}

interface PostsProps {
    slideId: number;
}

export default function Posts({ slideId }: PostsProps) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [title, setTitle] = useState('');
    const [imgFile, setImgFile] = useState<File | null>(null);
    const [description, setDescription] = useState('');
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setErrorMessage("");
    };

    useEffect(() => {
        if (slideId) {
            getSlidePosts(slideId).then(data => setPosts(data));
        }
    }, [slideId]);

    const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImgFile(file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
        }
    };

    const handlePostRemoval = (id: string) => {
        setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
    };

    async function getSlidePosts(slideId: number) {
        const res = await fetch(`/api/slides/${slideId}/posts`);
        const data = await res.json();
        return data;
    }

    async function publishPost(title: string, imgFile: File | null, description: string) {
        try {
            if (!imgFile) {
                alert("Por favor, selecione uma mídia (imagem ou vídeo).");
                return;
            }
            const formData = new FormData();
            formData.append('file', imgFile);
            formData.append('password', password);
    
            const responseFirebase = await fetch('/api/firebase/upload', {
                method: 'POST',
                body: formData,
            });
    
            if (responseFirebase.ok) {
                const { downloadURL } = await responseFirebase.json();
    
                const addingPostResponse = await fetch(`/api/posts`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title, img: downloadURL, description, password })
                });
    
                const data = await addingPostResponse.json(); 
                const postId = data.id;
                console.log(postId);
    
                const response = await fetch(`/api/slides/${slideId}/posts/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ postId, password })
                });
    
                if (addingPostResponse.ok && response.ok) {
                    toast({
                        title: "Sucesso! ✓",
                        description: "Imagem adicionada com sucesso!",
                        variant: "default",
                    });
                    setIsDialogOpen(false);
                    setPosts(prevPosts => [
                        {
                            id: data.id, 
                            title,
                            img: downloadURL,
                            description,
                            postedAt: new Date().toISOString(),
                        },
                        ...prevPosts,
                    ]);
                } else if (addingPostResponse.status === 401 || response.status === 401) {
                    setErrorMessage('Chave de segurança inválida');
                } else {
                    setErrorMessage('Erro ao criar post');
                }
            } else if (responseFirebase.status === 401) {
                setErrorMessage('Chave de segurança inválida');
            } else {
                setErrorMessage('Erro ao fazer upload da imagem');
            }
        } catch (error) {
            console.error('Erro ao criar post:', error);
            setErrorMessage('Erro ao criar post');
        }
    }

    const handlePostUpdate = (updatedPost: Post) => {
        setPosts(prevPosts =>
            prevPosts.map(post => (post.id === updatedPost.id ? updatedPost : post))
        );
    };

    return (
        <div className="flex flex-col items-center w-full h-full p-6 bg-gray-200">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger className="text-4xl text-white bg-black rounded-full mb-3 w-14 h-14 flex items-center justify-center border border-black shadow-lg hover:shadow-xl transition-transform transform hover:scale-125">+</DialogTrigger>
                <DialogContent className="bg-black p-6 rounded-lg">
                    <DialogHeader>
                        <DialogTitle className="text-white mb-4">Publique uma nova foto</DialogTitle>
                        <DialogDescription className="text-white mb-4">Insira os campos a frente:</DialogDescription>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label className="text-white" htmlFor="title">Título do trabalho</Label>
                                    <Input className="bg-white" id="title" placeholder="Título da nova postagem" onChange={(e) => setTitle(e.target.value)} />
                                    <Label className="text-white" htmlFor="description">Descrição do trabalho</Label>
                                    <Input className="bg-white" id="description" placeholder="Descrição da nova postagem" onChange={(e) => setDescription(e.target.value)} />
                                </div>
                                <div className="text-white flex flex-col space-y-1.5">
                                    <Label htmlFor="media">Conteúdo (imagem)</Label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            id="media"
                                            accept="image/*,video/*"
                                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-gray-100 file:text-gray-700
                                hover:file:bg-gray-200"
                                            onChange={handleMediaChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                        <DialogDescription className="text-white mb-2 mt-2">
                            Informe sua chave de segurança para adicionar o post.
                        </DialogDescription>
                        <input
                            type="password"
                            className="w-full p-2 mb-4 rounded bg-white text-black"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        {errorMessage && (
                            <div className="text-red-500 mb-4">{errorMessage}</div>
                        )}
                        <div className="flex justify-center">
                            <DialogClose className="bg-black hover:bg-red-500 text-white px-4 py-2 rounded border border-white mr-4">Cancelar</DialogClose>
                            <button
                                onClick={() => publishPost(title, imgFile, description)}
                                className="bg-black hover:bg-blue-500 text-white px-4 py-2 rounded border border-white"
                            >Adicionar</button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            {posts.map(post => (
                <PostComponent
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    img={post.img}
                    description={post.description}
                    postedAt={post.postedAt}
                    onPostRemoval={handlePostRemoval}
                    onPostUpdate={handlePostUpdate}
                />
            ))}
        </div>
    );
}
