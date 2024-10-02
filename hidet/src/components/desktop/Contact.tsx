import React from 'react';
import '../../app/globals.css';
import { StyledContainer, StyledContainer2, InsideContainer, InsideContainer2 } from './WhyChoose';
const handleSubmit = async (event: any) => {
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
      console.log('Email sent:', result);
      alert('Email sent successfully');
    } else {
      console.error('Error sending email:', result);
      alert('Error sending email');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export default function Contact() {
  return (
   <>
   <div className='h-[60vh] w-full flex items-center justify-center bg-black border-t-2 border-b-2 border-white'>
    <div className='w-4/5 h-4/5 flex items-center gap-10'>
      <div className='flex flex-col w-1/2 h-full justify-center'>
      <StyledContainer width = '100%'>
                    <InsideContainer>
                        <div className='w-full p-10'>
                            <h1 className='2xl:text-5xl xl:text-5xl lg:text-4xl md:text-3xl text-white h-full w-1/2 md:w-2/3'>
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
      <form onSubmit={handleSubmit}>
          <label
            htmlFor="name"
            className="block sm:text-md md:text-lg lg:text-xl xl:text:2xl font-medium text-gray-700"
          >
            Nome
          </label>
          <div className="mt-1">
            <input
              id="name"
              name="name"
              className="shadow-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md h-8"
            />
          </div>

          <label
            htmlFor="message"
            className="block text-lg font-medium text-gray-700 mt-4"
          >
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
            className="mt-5 mb-10 sm:text-md md:text-lg lg:text-xl xl:text:2xl text-white bg-gray-600 w-full sm:text-sm rounded-md h-8"
          >
            Enviar
          </button>
        </form>
        <div className='flex items-start mb-5 space-x-4'>
          <img src='/img/insta.png' alt="Instagram" />
          <img src='/img/mail.png' alt="Email" />
          <img src='/img/wpp.png' alt="WhatsApp" />
          <img src='/img/linkedin.png' alt="LinkedIn" />
        </div>
      </div>
      
    </div>
   </div>
   </>
  );
}
