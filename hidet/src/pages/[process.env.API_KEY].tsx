import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { storage } from './api/firebase/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function Admin() {
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [remove, setRemove] = useState(false);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null); // State for media (image or video) preview
  const [title, setTitle] = useState('');
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');

  async function publishPost(title: string, imgFile: File | null, description: string) {
    try {
      if (!imgFile) {
        alert("Por favor, selecione uma mídia (imagem ou vídeo).");
        return;
      }
      // etapa 1: publica no firebase
      const fileName = imgFile.name + "_" + uuidv4();
      const imageRef = ref(storage, `images/${fileName}`);
      const snapshot = await uploadBytes(imageRef, imgFile);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // etapa 2: publicar no prisma
      const response = await fetch('/api/create/new-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, img: downloadURL, description })
      });

      if (response.ok) {
        const data = await response.json();
        alert('Post created successfully: ' + JSON.stringify(data));
      } else {
        const error = await response.json();
        alert('Error: ' + error.error);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  }

  const handleAdd = () => {
    setAdd(!add);
    setEdit(false);
    setRemove(false);
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImgFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string); // Set media (image or video) preview
      };
      reader.readAsDataURL(file);
    } else {
      setMediaPreview(null); // Clear preview if no file
    }
  };

  return (
    <div className="h-screen bg-[#FAF3EB]">
      <div className="flex items-center justify-between w-full px-5 border-b border-black py-4">
        <div className='flex gap-6 items-center'>
          <img src="img/logopreto.png" alt="Logo" className="w-36" />
          <h1 className="text-2xl font-medium">Página do Administrador</h1>
        </div>
        <div className="flex items-center justify-center space-x-4 h-full">
          <button onClick={handleAdd} className="bg-black hover:bg-blue-700 text-white  py-2 px-4 rounded">
            Adicionar
          </button>
          <button className="bg-black hover:bg-yellow-700 text-white  py-2 px-4 rounded">
            Editar
          </button>
          <button className="bg-black hover:bg-red-700 text-white  py-2 px-4 rounded">
            Remover
          </button>
        </div>
      </div>
      <div className="h-5/6 w-full flex items-center justify-center">
        {add ? (
          <div className='h-full w-1/2 flex items-center justify-between'>
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>Publique uma nova foto ou vídeo</CardTitle>
                <CardDescription>Insira os campos a frente:</CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Título do trabalho</Label>
                      <Input id="name" placeholder="Nome do título de sua nova postagem" onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="conteúdo">Conteúdo (foto ou vídeo)</Label>
                      <div className="relative">
                        <input
                          type="file"
                          id="conteúdo"
                          accept="image/*,video/*" // Accept both images and videos
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
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancele</Button>
                <Button onClick={() => publishPost(title, imgFile, "asdasd")}>Adicione</Button>
              </CardFooter>
            </Card>
            <div className=' w-[350px] flex justify-center items-center rounded-lg'>
              {mediaPreview ? (
                <div className='flex flex-col items-center'>
                  <Label>Previsualização:</Label>
                  {mediaPreview.startsWith('data:video') ? (
                    <video controls className="max-w-full max-h-full object-contain rounded-lg border-black">
                      <source src={mediaPreview} type="video/mp4" />
                      Seu navegador não suporta o elemento de vídeo.
                    </video>
                  ) : (
                    <img
                      src={mediaPreview}
                      alt="Selected Media"
                      className="max-w-full max-h-full object-contain rounded-lg border-black"
                    />
                  )}
                </div>
              ) : (
                <p className="text-gray-500 text-center">Sua imagem ou vídeo irá aparecer aqui!</p>
              )}
            </div>

          </div>
        ) : (
          <h1 className="font-xl w-1/5 border border-gray-500 rounded-lg p-20 shadow-lg">
            Bem vindo à página do administrador! Selecione uma operação acima para inserir, atualizar ou remover um post inserido no portfólio!
          </h1>
        )}
      </div>
    </div>
  );
}
