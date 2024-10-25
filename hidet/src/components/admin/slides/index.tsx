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
    video: string;
    isImg: boolean;
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
    console.log(data);
    return data;
}

async function deleteSlide(slideId: number) {
    const res = await fetch(`/api/slides/${slideId}`, {
        method: 'DELETE',
    });
    const data = await res.json();
    return data;
}



export default function Slides() {
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [order, setOrder] = useState<number | undefined>(undefined);
    const [slides, setSlides] = useState<Slide[]>([]);
    const [slidesPosts, setSlidesPosts] = useState<{ [key: number]: Post[] }>({});

    async function insertSlide(slide: Omit<Slide, "id">, password: string) {
        const res = await fetch(`/api/slides`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...slide, password }),
        });
        const data = await res.json();
        if (res.status === 401) {
            setErrorMessage("Senha invalida.");
            return;
        }
        if (res.status === 500) {
            setErrorMessage("Verifique se a ordem não foi colocada em outro slide.");
            return;
        }
        return data;
    }

    const handleRemoveSlide = (slideId: number) => {
        setSlides((prevSlides) => prevSlides.filter((slide) => slide.id !== slideId));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setErrorMessage("");
    };

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

    const addNewSlide = async () => {
        if (!title || !order || !password) {
            setErrorMessage("Preencha todos os campos e informe a senha.");
            return;
        }

        const newSlide: Omit<Slide, "id"> = {
            title,
            order,
        };

        try {
            const result = await insertSlide(newSlide, password);
            if (result) {
                toast({
                    title: "Sucesso! ✓",
                    description: "Slide adicionado com sucesso!",
                    variant: "default",
                });
                setSlides([...slides, result]);
                setIsDialogOpen(false);
                setErrorMessage('');
                setTitle('');
                setOrder(undefined);
                setPassword('');
            }
        } catch (error: any) {
            setErrorMessage(error.message || "Erro ao adicionar o slide.");
        }
    };

    return (
        <div className="w-full flex flex-col items-center justify-center mt-16 gap-9">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger className="text-4xl text-white bg-black rounded-full mb-3 w-14 h-14 flex items-center justify-center border border-black shadow-lg hover:shadow-xl transition-transform transform hover:scale-125">+</DialogTrigger>
                <DialogContent className="bg-black p-6 rounded-lg">
                    <DialogHeader>
                        <DialogTitle className="text-white mb-4">Adicionar Novo Slide</DialogTitle>
                        <DialogDescription className="text-white mb-4">Preencha as informações do novo slide abaixo:</DialogDescription>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label className="text-white" htmlFor="title">Título do Slide</Label>
                                    <Input className="bg-white" id="title" placeholder="Título do Slide" value={title} onChange={(e) => setTitle(e.target.value)} />
                                    <Label className="text-white" htmlFor="order">Ordem do Slide</Label>
                                    <Input className="bg-white" id="order" placeholder="Ordem" type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
                                    <Label className="text-white" htmlFor="password">Senha</Label>
                                    <Input className="bg-white" id="password" placeholder="Senha" type="password" value={password} onChange={handlePasswordChange} />
                                </div>
                            </div>
                        </form>
                        {errorMessage && (
                            <div className="text-red-500 mb-4">{errorMessage}</div>
                        )}
                        <div className="flex justify-center mt-4">
                            <DialogClose className="bg-gray-500 hover:bg-red-500 text-white px-4 py-2 rounded border border-white mr-4">Cancelar</DialogClose>
                            <button
                                onClick={addNewSlide}
                                className="bg-black hover:bg-blue-500 text-white px-4 py-2 rounded border border-white"
                            >
                                Adicionar
                            </button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            {slides.map((slide) => (
                <div key={slide.id} className="slide w-4/5 flex flex-col gap-3 bg-white shadow-md rounded-lg p-8">
                    <div className="flex justify-between items-center">
                        <h2 className="text-black font-bold text-3xl">{slide.title}</h2>
                        <div className="flex gap-3">
                            <SlideEditDialog slide={slide} />
                            <button className="bg-black hover:bg-yellow-700 text-white py-2 px-4 rounded" onClick={() => Router.push(`/admin/slides/${slide.id}`)}>Editar</button>
                            <SlideRemoveDialog slide={slide} onRemove={handleRemoveSlide} />
                        </div>
                    </div>
                    <p>Ordem de apresentação: {slide.order}</p>
                    <p>Identificação: {slide.id}</p>
                    {slidesPosts[slide.id] ? (
                        <div className="flex items-center gap-6 justify-start border-2 border-gray-400 w-full overflow-x-auto rounded-lg">
                            {slidesPosts[slide.id].map((post) => (
                                <div key={post.id} className="post">
                                    {post.isImg ? <img className='h-36 object-cover bg-black' src={post.img}></img> : (
        <iframe
            className="h-36 object-cover bg-black"
            src={`https://www.youtube.com/embed/${new URL(post.video).searchParams.get("v")}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={post.title}
        ></iframe>
    )}
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

function SlideRemoveDialog({ slide, onRemove }: { slide: Slide, onRemove: (slideId: number) => void }) {
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setErrorMessage("");
    };

    const removeSlide = async () => {
        if (!password) {
            setErrorMessage("Informe a senha.");
            return;
        }

        try {
            const res = await fetch(`/api/slides/${slide.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });
            if (res.status === 403) {
                setErrorMessage("Senha inválida.");
                return;
            }
            if (res.status === 500) {
                setErrorMessage("Erro ao remover slide.");
                return;
            }
            if (res.status === 204) {
                toast({
                    title: "Sucesso! ✓",
                    description: "Slide removido com sucesso!",
                    variant: "default",
                });
                setIsDialogOpen(false);
                onRemove(slide.id); // Chama a função passada por props para atualizar a lista
            }
        } catch (error: any) {
            setErrorMessage(error.message || "Erro ao remover o slide.");
        }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger className="bg-black hover:bg-red-700 text-white px-4 py-2 rounded">Remover</DialogTrigger>
            <DialogContent className="bg-black p-6 rounded-lg">
                <DialogHeader>
                    <DialogTitle className="text-white mb-4">Remover o slide {slide.title}</DialogTitle>
                    <DialogDescription className="text-white mb-4">
                        Você tem certeza que deseja remover o slide {slide.title}? Esta ação não pode ser desfeita. Informe a senha para confirmar.
                    </DialogDescription>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label className="text-white" htmlFor={`password-${slide.id}`}>Senha</Label>
                                <Input
                                    className="bg-white"
                                    id={`password-${slide.id}`}
                                    placeholder="Senha"
                                    type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                        </div>
                    </form>
                    {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                    <div className="flex justify-center mt-4">
                        <DialogClose className="bg-gray-500 hover:bg-red-500 text-white px-4 py-2 rounded border border-white mr-4">
                            Cancelar
                        </DialogClose>
                        <button
                            onClick={removeSlide}
                            className="bg-black hover:bg-red-500 text-white px-4 py-2 rounded border border-white"
                        >
                            Remover
                        </button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

function SlideEditDialog({ slide }: { slide: Slide }) {
    const [title, setTitle] = useState(slide.title);
    const [order, setOrder] = useState(slide.order);
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setErrorMessage("");
    };

    const updateSlide = async () => {
        if (!title || !order || !password) {
            setErrorMessage("Preencha todos os campos e informe a senha.");
            return;
        }

        const updatedSlide: Slide = {
            ...slide,
            title,
            order,
        };

        try {
            const res = await fetch(`/api/slides/${slide.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...updatedSlide, password }),
            });
            if (res.status === 403) {
                setErrorMessage("Senha inválida.");
                return;
            }
            if (res.status === 500) {
                setErrorMessage("Erro ao editar slide.");
                return;
            }
            const data = await res.json();
            if (data) {
                toast({
                    title: "Sucesso! ✓",
                    description: "Slide atualizado com sucesso!",
                    variant: "default",
                });
                Router.reload();
            }
        } catch (error: any) {
            setErrorMessage(error.message || "Erro ao atualizar o slide.");
        };
    }

    return (
        <Dialog>
            <DialogTrigger className="bg-black hover:bg-yellow-700 px-4 rounded text-white flex items-center justify-center">
                Alterar informações
            </DialogTrigger>
            <DialogContent className="bg-black p-6 rounded-lg">
                <DialogHeader>
                    <DialogTitle className="text-white mb-4">Alterar informações do slide {slide.title}</DialogTitle>
                    <DialogDescription className="text-white mb-4">
                        Preencha as novas informações abaixo:
                    </DialogDescription>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label className="text-white" htmlFor={`title-${slide.id}`}>Novo título do Slide</Label>
                                <Input
                                    className="bg-white"
                                    id={`title-${slide.id}`}
                                    placeholder="Título do Slide"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <Label className="text-white" htmlFor={`order-${slide.id}`}>
                                    Nova ordem do Slide (ordem atual: {slide.order})
                                </Label>
                                <Input
                                    className="bg-white"
                                    id={`order-${slide.id}`}
                                    placeholder="Ordem"
                                    type="number"
                                    value={order}
                                    onChange={(e) => setOrder(Number(e.target.value))}
                                />
                                <Label className="text-white" htmlFor={`password-${slide.id}`}>Senha</Label>
                                <Input
                                    className="bg-white"
                                    id={`password-${slide.id}`}
                                    placeholder="Senha"
                                    type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                        </div>
                    </form>
                    {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                    <div className="flex justify-center mt-4">
                        <DialogClose className="bg-gray-500 hover:bg-red-500 text-white px-4 py-2 rounded border border-white mr-4">
                            Cancelar
                        </DialogClose>
                        <button
                            onClick={updateSlide}
                            className="bg-black hover:bg-blue-500 text-white px-4 py-2 rounded border border-white"
                        >
                            Salvar
                        </button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}