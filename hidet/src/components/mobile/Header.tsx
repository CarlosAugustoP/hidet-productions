
import '../../app/globals.css';
import Image from 'next/image';
import React from 'react';
import Router from 'next/router';

interface HeaderProps {
  className?: string;
}

export default function MobileHeader({ className: className }: HeaderProps) {
  // Function to handle navigation
  const handleNavigation = (anchor: string) => {
    // Checks if the current path is the home page
    if (Router.pathname === '/') {
      // Uses the browser's built-in method to scroll to the anchor
      const anchorElement = document.querySelector(anchor);
      if (anchorElement) {
        anchorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Redirects to the home page then scrolls to the anchor
      Router.push('/').then(() => {
        setTimeout(() => {
          const anchorElement = document.querySelector(anchor);
          if (anchorElement) {
            anchorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100); // Timeout to allow page to load
      });
    }
  };

  return (
    <div className={`flex flex-col w-full justify-center items-center gap-4 mt-6 ${className}`}>
      <div className="w-1/3">
        <Image onClick={() => handleNavigation('#hero')} src="/img/logo.png" alt="logo" layout="responsive" width={500} height={500} objectFit="contain" className='cursor-pointer' />
      </div>
      <div className="text-white flex items-center gap-10 mb-2">
        <h1 className=" sm:text-2xl xs:text-lg transition-transform duration-200 hover:scale-110 cursor-pointer" onClick={() => handleNavigation('#about-us')}>Sobre nós</h1>
        <h1 className=" sm:text-2xl xs:text-lg transition-transform duration-200 hover:scale-110 cursor-pointer" onClick={() => handleNavigation('#contact')}>Contato</h1>
        <h1 className=" sm:text-2xl xs:text-lg transition-transform duration-200 hover:scale-110 cursor-pointer" onClick={() => Router.push('/portfolio')}>Portfolio</h1>
      </div>
    </div>
  );
}
