import React from 'react';
import styled from 'styled-components';
import '../../app/globals.css'
import { useState, useEffect } from 'react';

// Define the type for width prop
interface StyledContainer2Props {
    width?: string;
}

interface StyledContainerProps {
    width?: string;
}

interface InsideContainerProps {
    image?: string;
}

export const StyledContainer = styled.div<StyledContainerProps>`
    width: ${({ width }) => width || '65%'};
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 0;
    border-radius: 15px;
    background: linear-gradient(225deg, #5E107D 0%, #B04F6D 25%, #0B0B0B 50%, #A11ED4 100%);
`;

export const InsideContainer = styled.div`
    width: 99%;
    height: 98%;
    background: linear-gradient(225deg, rgba(176, 79, 109, 0.86) 0%, #631582 19%, #200829 47%, #0B0B0B 75%, #33158C 100%);
    border-radius: 15px;
    display: flex;
    align-items: center;
    z-index: 1;
`;

// Accept the width prop with type definition
export const StyledContainer2 = styled.div<StyledContainer2Props>`
    width: ${({ width }) => width || '30%'};
    height: 100%;
    background: linear-gradient(90deg, #FFFFFF 0%, #000000 50%, #FFFFFF 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 0;
    border-radius: 15px;
`;

export const InsideContainer2 = styled.div`
    width: 99%;
    height: 98%;
    background: black;
    border-radius: 15px;
    display: flex;
    align-items: center;
    z-index: 1;
`;

export default function WhyChoose() {
    const [isHeightExceeded, setIsHeightExceeded] = useState(false);

    // Verifica a altura da janela e atualiza o estado
    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== 'undefined') {
                setIsHeightExceeded(window.innerHeight > 950);
            }
        };

        handleResize(); // Inicializa o estado com a altura atual

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <div className='h-[95vh] p-20 bg-black border-t-2 border-white flex flex-col justify-between'>
            <div className='w-full h-3/5 flex items-center justify-between'>
                <StyledContainer>
                    <InsideContainer>
                        <div className='w-10/12 p-10'>
                            <h1 className='2xl:text-6xl xl:text-5xl lg:text-4xl md:text-3xl text-white h-full w-1/2 md:w-2/3'>
                                Somos Orientados a <strong>High Detail Production</strong>
                            </h1>
                        </div>
                    </InsideContainer>
                </StyledContainer>
                <StyledContainer2 width='30%'>
                    <InsideContainer2>
                        <div className={`w-full h-full ${isHeightExceeded ? 'p-14': '2xl:p-8 xl:p-6 lg:p-6 md:p-6'} text-white 2xl:text-3xl xl:text-2xl lg:text-custom-md-lg md:text-custom-xs-sm flex items-center justify-center font-light`}>
                            <ul className='h-full w-5/6 md:w-full flex flex-col justify-between'>
                                <li>• <strong>Maior</strong> qualidade audiovisual </li>
                                <li>• Foco em detalhes</li>
                                <li>• Uso das mais recentes tecnologias e IA</li>
                                <li>• Padrão elevado</li>
                            </ul>
                        </div>
                    </InsideContainer2>
                </StyledContainer2>
            </div>
            <div className='w-full h-2/6 flex justify-between'>
                <div className='w-[65%] flex justify-between'>
                    <StyledContainer2 width='40%'>
                        <InsideContainer2 className='justify-center'>
                            <div className='w-4/5 text-center flex flex-col justify-between text-white p-3'>
                                <p className='2xl:text-3xl xl:text-xl lg:text-lg md:text-sm '>PADRÃO</p>
                                <p className='2xl:text-7xl xl:text-7xl lg:text-4xl md:text-4xl font-extrabold'>4K</p>
                                <p className='2xl:text-3xl xl:text-xl lg:text-lg md:text-sm '>OU SUPERIOR</p>
                            </div>
                        </InsideContainer2>
                    </StyledContainer2>
                    <StyledContainer width='55%'>
                        <InsideContainer2 className='justify-center'>
                            <img src='img/2.jpg' className='w-full h-full rounded-xl object-cover' />
                        </InsideContainer2>
                    </StyledContainer>

                </div>
                <StyledContainer width='30%'>
                    <InsideContainer2 className='justify-center'>
                        <img src='img/5.jpg' className='w-full h-full rounded-xl object-cover' />
                    </InsideContainer2>
                </StyledContainer>

            </div>
        </div>
    );

}
