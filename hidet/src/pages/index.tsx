import React, { useEffect, useState, useRef } from 'react';
import '../app/globals.css';
import Hero from '../components/desktop/Hero';
import WhyChoose from '../components/desktop/WhyChoose';
import Companies from '@/components/desktop/Companies';
import AboutUs from '@/components/desktop/AboutsUs';
import Contact from '@/components/desktop/Contact';
import Footer from '@/components/desktop/Footer';

export default function Index() {
  const [scrollPos, setScrollPos] = useState(0);
  const threshold = 375; // Define the scroll threshold
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollPos = window.scrollY;
          setScrollPos((prevScrollPos) => {
            if (currentScrollPos <= threshold) {
              return currentScrollPos;
            } else if (prevScrollPos !== threshold) {
              return threshold;
            } else {
              return prevScrollPos;
            }
          });
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return (
    <div>
      <section className="relative z-10">
        <Hero />
      </section>

      <section
        className="relative z-20"
        style={{
          marginTop: `${Math.min(scrollPos * -0.4, 150)}px`,
          transition: 'margin-top 0.1s ease-out',
        }}
      >
        <WhyChoose />
      </section>

      <section className="relative z-20">
        <Companies />
      </section>

      <section className="relative z-20">
        <AboutUs />
      </section>
        <Contact />
        <Footer />

    </div>
  );
}
