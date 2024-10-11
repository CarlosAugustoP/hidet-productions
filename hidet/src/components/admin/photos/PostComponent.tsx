import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface PostProps {
    id: string;
    title: string;
    img: string;
    description: string;
    postedAt: string;
}

function removePost(id: string, password: string) {
    console.log("Removing post with id:", id);
    console.log("Password:", password);
    fetch(`/api/posts/${id}`, {
        method: "DELETE",
        body: JSON.stringify({ password }),
    });
}

export default function PostComponent({ id, title, img, description, postedAt }: PostProps) {
    const [password, setPassword] = useState("");

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleConfirmClick = () => {
        console.log(password);
        removePost(id, password);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-5 items-start w-full max-w-4xl bg-white shadow-md rounded-lg p-5 mb-8">
            <img src={img} alt={title} className="w-full lg:w-1/3 h-auto rounded-lg object-cover" />
            <div className="flex flex-col justify-between w-full lg:w-2/3">
                <div>
                    <h1 className="text-2xl font-semibold mb-2">{title}</h1>
                    <p className="text-gray-700 mb-4">{description}</p>
                </div>
                <div className="text-gray-500 text-sm mb-4">Publicado em: {new Date(postedAt).toLocaleDateString()}</div>
                <Dialog>
                    <DialogTrigger className="bg-black hover:bg-red-700 text-white py-2 px-4 rounded">Remover</DialogTrigger>
                    <DialogContent className="bg-black p-6 rounded-lg">
                        <DialogHeader>
                            <DialogTitle className="text-white mb-4">Você realmente gostaria de remover esse post?</DialogTitle>
                            <DialogDescription className="text-white mb-4">
                                Informe sua chave de segurança para confirmar a remoção.
                            </DialogDescription>
                            <input
                                type="password"
                                className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <div className="flex justify-center">
                                <button
                                    className="bg-black hover:bg-red-700 text-white px-4 py-2 rounded border border-white"
                                    onClick={handleConfirmClick}
                                >Confirmar</button>
                            </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
