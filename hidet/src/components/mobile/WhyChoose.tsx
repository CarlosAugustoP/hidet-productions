import React from 'react';
import styled from 'styled-components';
import '../../app/globals.css'

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


export default function MobileWhyChoose() {
    return (
        <div className='bg-black'>
        <div className='h-[50vh] w-full flex items-center justify-center bg-black'>
            <div className='flex w-4/5 h-5/6 xs:w-11/12 gap-6'>
                {/* Left side with two sections */}
                <div className='flex flex-col w-1/2 gap-6'>
                    {/* First section (text block) */}
                    <StyledContainer width="100%">
                        <InsideContainer>
                        <div className='w-full p-10 xs:p-5'>
                            <h1 className='text-3xl text-white h-full xs:text-lg'>
                                Somos Orientados a <strong>High Detail Production</strong>
                            </h1>
                        </div>
                        </InsideContainer>
                    </StyledContainer>

                    {/* Second section (image block) */}
                    <StyledContainer width="100%">
                    <InsideContainer2 className='justify-center'>
                    <img src='img/2.jpg' className='w-full h-full rounded-xl object-cover' />

                        </InsideContainer2>
                    </StyledContainer>
                </div>

                {/* Right side with a list of features */}
                <StyledContainer2 width="50%">
                    <InsideContainer2>
                        <div className='w-full h-full p-8 text-white text-xl xs:text-sm xs:p-6 tiny:p-0 flex items-center justify-center font-light'>
                            <ul className='h-5/6 w-5/6 md:w-full flex flex-col justify-between '>
                                <li>• Alta qualidade audiovisual </li>
                                <li>• Foco em detalhes invisíveis</li>
                                <li>• Uso das mais recentes tecnologias</li>
                                <li>• Padrão elevado</li>
                            </ul>
                        </div>
                    </InsideContainer2>
                </StyledContainer2>
            </div>
        </div>
        <div className=' w-full flex items-center justify-center bg-black  border-white'>
                    <div className='w-full text-center flex-col p-4'>
                        <h1 className='text-xl text-white h-full'>
                            PADRÃO
                        </h1>
                        <h1 className='text-6xl font-extrabold text-white h-full'>
                            4K 
                        </h1>
                        <h1 className='text-2xl text-white h-full'>
                            OU SUPERIOR
                        </h1>
                    </div>
            </div>
        </div>
    );
}