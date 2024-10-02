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
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="name" className="text-white">Nome</label>
          <input type="text" name="name" id="name" className="bg-gray-700 p-2 rounded-lg" />
          
          <label htmlFor="message" className="text-white">Mensagem</label>
          <textarea name="message" id="message" className="bg-gray-700 p-2 rounded-lg"></textarea>
          
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">Enviar</button>
        </form>
      </div>
    </div>
  );
}
