import React from "react";
import Router from "next/router";
export default function Footer() {
    return (
        <div className=" flex justify-center items-center text-white">
            <div className="w-5/6 flex items-center justify-between mt-16 mb-16 ">
                <img className = '2xl:w-64 md:w-48'src="/img/logo.png" />
                <div className="flex flex-col justify-start items-start text-lg">
                    <a href="#contact" className="cursor-pointer">
                        <u>
                            Contato
                        </u>
                    </a>
                    <u>
                    </u>
                    <a href="#about-us" className="cursor-pointer">
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
                    <a>
                        <u>
                            Inicio
                        </u>
                    </a>
                </div>
                <div>
                    <span>
                        CNPJ: 55.094.826/0001-59
                    </span>
                </div>
                <div>
                    <footer>
                        2024 HIDET, direitos reservados
                    </footer>
                </div>
            </div>
        </div>
    )
}
