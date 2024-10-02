import React from 'react';
import '../../app/globals.css';

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
    <div className='mt-20 flex flex-col sm:flex-row md:flex-row items-center justify-center md:space-x-5 bg-black px-4 sm:space-x-5'>
      <div className='w-full h-full md:h-1/2 md:w-1/2 flex justify-center items-center'>
        <div
          className='p-[6px] rounded-[15px]'
          style={{
            background: 'linear-gradient(297.08deg, #5E107D 3.94%, #0B0B0B 50.37%, #A11ED5 96.81%)',
          }}
        >
          <div
            className='rounded-[9px] p-6'
            style={{
              background: 'linear-gradient(292.11deg, rgba(176, 79, 109, 0.86) 2.98%, #631582 19.11%, #200829 42.46%, #0B0B0B 67.09%, #33158C 87.9%)',
            }}
          >
            <p className='text-white sm:text-lg md:text-xl lg:text-2xl xl:text-3xl'>Preencha o formulário ao lado e solicite agora seu orçamento!</p>
          </div>
        </div>
      </div>
      <div className='mt-10 w-full md:w-1/2'>
        <h1 className='text-white sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold leading-normal'>
          Contato
        </h1>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="email"
            className="block sm:text-md md:text-lg lg:text-xl xl:text:2xl font-medium text-gray-700"
          >
            Email
          </label>
          <div className="mt-1">
            <input
              type="email"
              id="email"
              name="email"
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
  );
}
