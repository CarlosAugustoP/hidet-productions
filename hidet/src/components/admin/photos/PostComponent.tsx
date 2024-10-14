// PostComponent.tsx

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
import { toast, useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface PostProps {
  id: string;
  title: string;
  img: string;
  description: string;
  postedAt: string;
  onPostRemoval: (id: string) => void;
  onPostUpdate: (updatedPost: Post) => void;
}

interface Post {
  id: string;
  title: string;
  img: string;
  description: string;
  postedAt: string;
}

export default function PostComponent({
  id,
  title,
  img,
  description,
  postedAt,
  onPostRemoval,
  onPostUpdate,
}: PostProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: title || "",
    description: description || "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      title: title || "",
      description: description || "",
    }));
  }, [title, description]);

  async function editPost(formData: any) {
    const res = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData }),
    });
    const data = await res.json();
    return { res, data };
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    const { res, data } = await editPost(formData);
    if (res.ok) {
      toast({
        title: "Successo! ✓",
        description: "Post editado com sucesso!",
        variant: "default",
      });
      setIsEditDialogOpen(false);
      onPostUpdate(data); // Pass the updated post data to parent
    } else {
      setErrorMessage(data.error || "Erro ao editar o post.");
    }
  };

  const [password, setPassword] = useState("");
  const [removeErrorMessage, setRemoveErrorMessage] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setRemoveErrorMessage("");
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
            setIsRemoveDialogOpen(false);
            onPostRemoval(id);
        }
        return true;
    }
    setErrorMessage("Chave de segurança inválida.");
    return false;
};

async function removePost(id: string, password: string) {
    // TODO: Remover post do firebase
    const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        body: JSON.stringify({ password }),
    });
    return res;
}


  return (
    <div className="flex flex-col lg:flex-row gap-5 items-start w-full max-w-4xl bg-white shadow-md rounded-lg p-5 mb-8">
      <img
        src={img}
        alt={title}
        className="w-full lg:w-1/3 h-auto rounded-lg object-cover"
      />
      <div className="flex flex-col justify-between w-full lg:w-2/3">
        <div>
          <h1 className="text-2xl font-semibold mb-2">{title}</h1>
          <p className="text-gray-700 mb-4">{description}</p>
        </div>
        <div className="text-gray-500 text-sm mb-4">
          Publicado em: {new Date(postedAt).toLocaleDateString()}
        </div>
        <div className="flex w-full gap-4">
          {/* Remove Dialog */}
          <Dialog
            open={isRemoveDialogOpen}
            onOpenChange={setIsRemoveDialogOpen}
          >
            <DialogTrigger asChild>
              <button
                className="bg-black hover:bg-red-700 text-white py-2 w-1/2 px-4 rounded"
                onClick={() => setIsRemoveDialogOpen(true)}
              >
                Remover
              </button>
            </DialogTrigger>
            <DialogContent className="bg-black p-6 rounded-lg">
              <DialogHeader>
                <DialogTitle className="text-white mb-4">
                  Você realmente gostaria de remover esse post?
                </DialogTitle>
                <DialogDescription className="text-white mb-4">
                  Informe sua chave de segurança para confirmar a remoção.
                </DialogDescription>
                <input
                  type="password"
                  className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {removeErrorMessage && (
                  <div className="text-red-500 mb-4">{removeErrorMessage}</div>
                )}
                <div className="flex justify-center">
                  <DialogClose asChild>
                    <button
                      className="bg-black hover:bg-blue-700 text-white px-4 py-2 rounded border border-white mr-4"
                      onClick={() => setIsRemoveDialogOpen(false)}
                    >
                      Cancelar
                    </button>
                  </DialogClose>
                  <button
                    className="bg-black hover:bg-red-700 text-white px-4 py-2 rounded border border-white"
                    onClick={handleConfirmClick}
                  >
                    Confirmar
                  </button>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          {/* Edit Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
              <button
                className="bg-black hover:bg-yellow-600 text-white py-2 px-4 rounded w-1/2"
                onClick={() => setIsEditDialogOpen(true)}
              >
                Editar
              </button>
            </DialogTrigger>
            <DialogContent className="bg-black p-6 rounded-lg">
              <DialogHeader>
                <DialogTitle className="text-white mb-4">Editar post</DialogTitle>
                <DialogDescription className="text-white mb-4">
                  Atualize as informações do post.
                </DialogDescription>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="title"
                    placeholder="Título"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
                  />
                  <textarea
                    name="description"
                    placeholder="Descrição"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Chave de segurança"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
                  />
                  {errorMessage && (
                    <div className="text-red-500 mb-4">{errorMessage}</div>
                  )}
                  <div className="flex justify-center">
                    <DialogClose asChild>
                      <button
                        className="bg-black hover:bg-blue-700 text-white px-4 py-2 rounded border border-white mr-4"
                        onClick={() => setIsEditDialogOpen(false)}
                      >
                        Cancelar
                      </button>
                    </DialogClose>
                    <button
                      type="submit"
                      className="bg-black hover:bg-yellow-700 text-white px-4 py-2 rounded border border-white"
                    >
                      Salvar
                    </button>
                  </div>
                </form>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
