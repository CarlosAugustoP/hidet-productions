import '../app/globals.css';
import React, {use, useEffect} from 'react';
import Hero from '../components/desktop/Hero';
import WhyChoose from '../components/desktop/WhyChoose';

const ParallaxSection = () => {
    useEffect(() => {
        const handleScroll = () => {
            const parallaxElement: any = document.querySelector('.parallax')
            const scrollPosition = window.scrollY;
            parallaxElement.style.backgroundPositionY = scrollPosition * 0.2 + 'px';

        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div className="parallax">
            <Hero />
        </div>
    );

}
export default function Index() {
    return (
        <div>
           <ParallaxSection/>
           <WhyChoose   />

        </div>
    );
}