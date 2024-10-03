import '../../app/globals.css';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Router from 'next/router';

type WindowSize = {
  width: number | undefined;
  breakpoint: string;
};

export default function Header(className: any) {

  return (
    <div className={`flex w-full justify-between gap-10 ${className}`}>
      <div className="w-1/3">
        <Image src="/img/logo.png" alt="logo" layout="responsive" width={500} height={500} objectFit="contain" />
      </div>
      <div className="text-white flex items-center gap-10 mb-2 w-3/4">
        <h1 className="2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl transition-transform duration-200 hover:scale-110"><a href = "#about-us">Sobre nós</a></h1>
        <h1 className="2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl transition-transform duration-200 hover:scale-110"><a href = "#contact">Contato</a></h1>
        <h1 className="2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl transition-transform duration-200 hover:scale-110 cursor-pointer"><p onClick = {()=>Router.push('/portfolio')}>Portfolio</p></h1>
      </div>
    </div>
  );
}
