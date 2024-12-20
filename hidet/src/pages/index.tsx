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
  const [isSmallHeight, setIsSmallHeight] = useState(false); // State to track if height is less than 1000px
  const [isTinyHeight, setIsTinyHeight] = useState(false); // State to track if height is less than 600px
  const threshold = 375; // Define the scroll threshold
  const ticking = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 820) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }

      if (window.innerHeight < 1000) {
        setIsSmallHeight(true);
      } else {
        setIsSmallHeight(false);
      }

      // Set the tiny height state for very small heights
      if (window.innerHeight < 600) {
        setIsTinyHeight(true);
      } else {
        setIsTinyHeight(false);
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
         <div className={`flex flex-col ${isTinyHeight ? 'tiny:[h-200vh] xs:[' : 'tiny:h-[100vh] xs:h-[100vh]'}  border-b-2 border-t-2 border-white mt-16 justify-center items-center bg-black`}>
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
