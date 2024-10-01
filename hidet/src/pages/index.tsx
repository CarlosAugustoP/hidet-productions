import '../app/globals.css';
import React from 'react';
import Hero from '../components/desktop/Hero';
import WhyChoose from '../components/desktop/WhyChoose';
export default function Index() {
    return (
        <div className="h-[100vh]">
           <Hero /> 
           <WhyChoose />

        </div>
    );
}