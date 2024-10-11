import React, { useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { toast, useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface PostProps {
    id: string;
    title: string;
    img: string;
    description: string;
    postedAt: string;
}

async function removePost(id: string, password: string) {
    const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        body: JSON.stringify({ password }),
    });
    return res;
}

export default function PostComponent({ id, title, img, description, postedAt }: PostProps) {
    const { toast } = useToast();

    const [password, setPassword] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setErrorMessage("");
    };

    const handleConfirmClick = async () => {
        const res = await removePost(id, password);
        if (res.status === 204) {
            if (res.status === 204) {
                toast({
                    title: "Successo! ✓",
                    description: "Imagem deletada com sucesso!",
                    variant: "default",
                });
                setIsDialogOpen(false);
            }
            return true;
        }
        setErrorMessage("Chave de segurança inválida.");
        return false;
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
                            {errorMessage && (
                                <div className="text-red-500 mb-4">{errorMessage}</div>
                            )}
                            <div className="flex justify-center">
                                <DialogClose className="bg-black hover:bg-blue-700 text-white px-4 py-2 rounded border border-white mr-4">Cancelar</DialogClose>
                                <button
                                    className="bg-black hover:bg-red-700 text-white px-4 py-2 rounded border border-white"
                                    onClick={handleConfirmClick}
                                >Confirmar</button>
                            </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
            <Toaster />
        </div>
    )
}
