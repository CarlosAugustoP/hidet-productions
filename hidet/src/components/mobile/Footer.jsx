import React from "react";
import Router from 'next/router'

export default function Footer() {

    return (
        <div className=" flex justify-center items-center text-white">
            <div className="w-5/6 flex items-center justify-between mt-8 mb-8 ">
                <div className="flex flex-col gap-2"> 
                    <img className = 'w-32' src="/img/logo.png" />
                    <p>CNPJ: 55.094.826/0001-59.</p>
                    <p className="text-xs">Desenvolvedores: <a className = "text-blue-400 cursor-pointer" href="https://www.linkedin.com/in/carlos-augusto-vasconcelos-6472a3240/">Carlos Augusto</a>, <a href="https://www.linkedin.com/in/gabriel-pires-777106222/" className = "text-blue-400" >Gabriel Pires</a></p>

                </div>
                <div className="flex flex-col justify-start items-start text-md">
                    <a href="#contact">
                        <u>
                            Contato
                        </u>
                    </a>
                    <u>
                    </u>
                    <a href="#about-us">
                        <u>
                            Sobre nós
                        </u>
                    </a>
                    <u>
                    </u>
                    <a onClick={()=>Router.push('/portfolio')} className="cursor-pointer">
                        <u>
                            Porfolio
                        </u>
                    </a>
                    <u>
                    </u>
                    <a href = "#">
                        <u>
                            Inicio
                        </u>
                    </a>
                </div>
                
        
            </div>
        </div>
    )
}
