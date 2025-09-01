import React, { useState } from 'react';
import '../../app/globals.css';
import { StyledContainer, InsideContainer } from './WhyChoose';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

const handleSubmit = async (event: any, toast: any, setLoading: (isLoading: boolean) => void) => {
  event.preventDefault();
  setLoading(true); // Start the loading spinner

  const data = new FormData(event.target);
  const formData = {
    subject: `Message from ${data.get('name')}`,
    text: data.get('message'),
    contact: data.get('email'), // Including the email field
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
    setLoading(false); // Stop the loading spinner, no matter what
  }
};

export default function MobileContact() {
  const { toast } = useToast();
  const [isLoading, setLoading] = useState(false); // State for controlling the loading spinner

  return (
    <>
      <div className='w-full py-10 flex items-center justify-center bg-black border-t-2 border-b-2 border-white mt-10 mb-10' id="contact">
        <div className='w-3/5 tiny:w-4/5 h-4/5 flex items-center gap-10 '>

          <div className='flex flex-col w-full h-full justify-center bg-black'>
            <h1 className='text-white text-4xl font-semibold leading-normal'>
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
                disabled={isLoading} // Disable the button while loading
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
