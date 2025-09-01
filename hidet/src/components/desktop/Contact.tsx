import React, { useState } from 'react';
import '../../app/globals.css';
import { StyledContainer, InsideContainer } from './WhyChoose';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

const handleSubmit = async (event: any, toast: any, setLoading: (isLoading: boolean) => void) => {
  event.preventDefault();
  setLoading(true); // Define isLoading como true para iniciar o spinner

  const data = new FormData(event.target);
  const formData = {
    subject: `Message from ${data.get('name')}`,
    text: data.get('message'),
    contact: data.get('email'), // Incluindo o campo de email
  };

  try {
    const response = await fetch('/api/send/route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (response.ok) {
      toast({
        title: "Successo! ✓",
        description: "Seu e-mail foi enviado para a HIDET.",
        variant: "success",
      });
    } else {
      toast({
        title: "Erro! X",
        description: "Por favor, aguarde antes de enviar novamente.",
        variant: "success",
      });
    }
  } catch (error) {
    toast({
      title: "Erro!",
      description: "Por favor, aguarde antes de enviar novamente.",
      variant: "success",
    });
  } finally {
    setLoading(false); // Define isLoading como false para parar o spinner
  }
};

export default function Contact() {
  const { toast } = useToast(); // Usando o hook de toast do shadcn
  const [isLoading, setLoading] = useState(false); // Estado para controlar o spinner

  return (
    <>
      <div className='h-auto py-24 w-full flex items-center justify-center bg-black border-t-2 border-b-2 border-white mt-10 mb-10' id="contact">
        <div className='w-3/5 h-full flex items-center gap-10 '>
          <div className='flex flex-col w-1/2 h-full justify-center'>
            <StyledContainer width='100%'>
              <InsideContainer>
                <div className='w-full p-10 h-full'>
                  <h1 className='2xl:text-5xl xl:text-4xl lg:text-3xl md:text-3xl text-white h-full w-1/2 md:w-2/3'>
                    Preencha o formulário e solicite agora seu orçamento!
                  </h1>
                </div>
              </InsideContainer>
            </StyledContainer>
          </div>
          <div className='flex flex-col w-1/2 h-full justify-center bg-black'>
            <h1 className='text-white sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold leading-normal'>
              Contato
            </h1>
            <form onSubmit={(event) => handleSubmit(event, toast, setLoading)}>
              <label htmlFor="name" className="block sm:text-md md:text-lg lg:text-xl xl:text:2xl font-medium text-gray-400">
                Nome
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  className="shadow-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md h-8"
                />
              </div>

              <label htmlFor="email" className="block sm:text-md md:text-lg lg:text-xl xl:text:2xl font-medium text-gray-400 mt-4">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="shadow-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md h-8"
                />
              </div>

              <label htmlFor="message" className="block text-lg font-medium text-gray-400 mt-4">
                Recado
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="message"
                  name="message"
                  className="shadow-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md h-8"
                />
              </div>

              <button 
                type="submit" 
                className="mt-5 mb-10 sm:text-md md:text-lg lg:text-xl xl:text:2xl text-white bg-gray-600 w-full sm:text-sm rounded-md h-8 flex items-center justify-center"
                disabled={isLoading} // Desativa o botão enquanto o envio está em andamento
              >
                {isLoading ? (
                  <span className="loader border-t-white border-4 border-solid rounded-full animate-spin w-5 h-5"></span>
                ) : (
                  "Enviar"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Toaster/> 
    </>
  );
}
