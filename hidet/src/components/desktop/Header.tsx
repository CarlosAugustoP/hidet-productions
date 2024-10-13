
import '../../app/globals.css';
import Image from 'next/image';
import React from 'react';
import Router from 'next/router';

interface HeaderProps {
  className?: string;
}

export default function Header({ className: className }: HeaderProps) {
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
    <div className={`flex flex-col md:flex-row w-full justify-center items-center md:gap-10 gap-4 md:mt-0 mt-6 ${className}`}>
      <div className="w-1/4">
        <Image onClick={() => handleNavigation('#hero')} src="/img/logo.png" alt="logo" layout="responsive" width={500} height={500} objectFit="contain" className='cursor-pointer' />
      </div>
      <div className="text-white flex md:flex-row items-center gap-10 mb-2 md:w-3/4">
        <h1 className="2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg sm:text-2xl xs:text-lg transition-transform duration-200 hover:scale-110 cursor-pointer" onClick={() => handleNavigation('#about-us')}>Sobre nós</h1>
        <h1 className="2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg sm:text-2xl xs:text-lg transition-transform duration-200 hover:scale-110 cursor-pointer" onClick={() => handleNavigation('#contact')}>Contato</h1>
        <h1 className="2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg sm:text-2xl xs:text-lg transition-transform duration-200 hover:scale-110 cursor-pointer" onClick={() => Router.push('/portfolio')}>Portfolio</h1>
      </div>
    </div>
  );
}
