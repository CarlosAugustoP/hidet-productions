import React, { useEffect, useState } from 'react';
import Hero from '../components/desktop/Hero';
import WhyChoose from '../components/desktop/WhyChoose';
import Companies from '@/components/desktop/Companies';

export default function Index() {
    const [scrollPos, setScrollPos] = useState(0);

    // Use effect hook triggers whenever the scroll position changes
    useEffect(() => {

        // Avoid calling the handleScroll function too often.
        // Only one request per animation frame is enough.
        let ticking = false;

        const handleScroll = () => {

            //If there is no request
            // Request animation frame asks the browser to call the function on the next frame making things smoother
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrollPos(window.scrollY);
                    ticking = false;
                });

                // Condition finished
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div>
            <section className="relative z-10">
                <Hero />
            </section>

            <section
                className="relative z-20"
                style={{
                    /* The scrollPos is multiplied by -0.4 to make the section scroll slower than the rest of the page */
                    marginTop: `${Math.min(scrollPos * -0.4, 150)}px`,
                    transition: 'margin-top 0.1s ease-out', 
                }}
            >
                <WhyChoose />
            </section>
            <section className="relative z-20">

            <Companies />
            </section>

        </div>
    );
}
