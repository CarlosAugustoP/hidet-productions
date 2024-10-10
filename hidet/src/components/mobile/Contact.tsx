import React from 'react';
import '../../app/globals.css';
import { StyledContainer, InsideContainer } from './WhyChoose';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';   // Importing the Toaster component

const handleSubmit = async (event: any, toast: any) => {
  event.preventDefault();

  const data = new FormData(event.target);
  const formData = {
    subject: `Message from ${data.get('name')}`,
    text: data.get('message'),
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
        description: "Houve um problema desconhecido no envio.",
        variant: "destructive",
      });
    }
  } catch (error) {
    toast({
      title: "Error",
      description: "Something went wrong.",
      variant: "destructive",
    });
  }
};

export default function MobileContact() {
  const { toast } = useToast(); // Using the toast hook from shadcn

  return (
    <>
      <div className='w-full h-[50vh] tiny:h-[60vh] flex items-center justify-center bg-black border-t-2 border-b-2 border-white mt-10 mb-10' id="contact">
        <div className='w-3/5 tiny:w-4/5 h-4/5 flex items-center gap-10 '>

          <div className='flex flex-col w-full h-full justify-center bg-black'>
            <h1 className='text-white text-4xl font-semibold leading-normal'>
              Contato
            </h1>
            <form onSubmit={(event) => handleSubmit(event, toast)}>
              <label htmlFor="name" className="block sm:text-md md:text-lg lg:text-xl xl:text:2xl font-medium text-gray-700">
                Nome
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  className="shadow-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md h-8"
                />
              </div>

              <label htmlFor="message" className="block text-lg font-medium text-gray-700 mt-4">
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

              <button type="submit" className="mt-5 mb-10 sm:text-md md:text-lg lg:text-xl xl:text:2xl text-white bg-gray-600 w-full sm:text-sm rounded-md h-8">
                Enviar
              </button>
            </form>
            <div className='flex items-start mb-5 space-x-4'>
              <img src='/img/insta.png' alt="Instagram" className='w-7 h-7' />
              <img src='/img/mail.png' alt="Email" className='w-7 h-7' />
              <img src='/img/wpp.png' alt="WhatsApp" className='w-7 h-7' />
              <img src='/img/linkedin.png' alt="LinkedIn" className='w-7 h-7' />
            </div>
          </div>
        </div>
      </div>
      <Toaster/> 
    </>
  );
}
