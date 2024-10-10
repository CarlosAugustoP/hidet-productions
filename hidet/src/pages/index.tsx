import React, { useEffect, useState, useRef } from 'react';
import '../app/globals.css';
import Hero from '../components/desktop/Hero';
import WhyChoose from '../components/desktop/WhyChoose';
import Companies from '@/components/desktop/Companies';
import AboutUs from '@/components/desktop/AboutsUs';
import Contact from '@/components/desktop/Contact';
import Footer from '@/components/desktop/Footer';
import MobileHero from '@/components/mobile/Hero';
import MobileHeader from '@/components/mobile/Header';
import MobileWhyChoose from '@/components/mobile/WhyChoose';
import MobileCompanies from '@/components/mobile/Companies';
import MobileAboutUs from '@/components/mobile/AboutUs';
import MobileFooter from '@/components/mobile/Footer';
import MobileContact from '@/components/mobile/Contact';

export default function Index() {
  const [scrollPos, setScrollPos] = useState(0);
  const [isMobile, setIsMobile] = useState(false); // State to track if screen is mobile
  const threshold = 375; // Define the scroll threshold
  const ticking = useRef(false);

  // Check if the screen size is smaller than the 'sm' breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    // Initial check and adding event listener for resizing
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      {isMobile ? (
        <div className=''>
         <MobileHero />
         <div className='flex flex-col tiny:h-[90vh] xs:h-[80vh] border-b-2 border-t-2 border-white mt-16 justify-center items-center bg-black'>
           <MobileWhyChoose />
           <MobileCompanies />

         </div>
          <MobileAboutUs />
          <MobileContact />
          <MobileFooter />
        </div>
      ) : (
        <>
          <section className="relative z-10">
            <Hero />
          </section>

          <section
            className="relative z-20"
            style={{
              marginTop: `${Math.min(scrollPos * -0.6, 200)}px`,
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
        </>
      )}
    </div>
  );
}
