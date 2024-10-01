import '../../app/globals.css';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

type WindowSize = {
  width: number | undefined;
  breakpoint: string;
};

export default function Header() {

  return (
    <div className="flex w-full justify-between gap-10">
      <div className="w-1/3">
        <Image src="/img/logo.png" alt="logo" layout="responsive" width={500} height={500} objectFit="contain" />
      </div>
      <div className="text-white flex items-center gap-10 mb-2 w-3/4">
        <h1 className="xl:text-4xl lg:text-2xl md:text-xl">Sobre nós</h1>
        <h1 className="xl:text-4xl lg:text-2xl md:text-xl">Contato</h1>
        <h1 className="xl:text-4xl lg:text-2xl md:text-xl">Portfolio</h1>
      </div>
    </div>
  );
}
