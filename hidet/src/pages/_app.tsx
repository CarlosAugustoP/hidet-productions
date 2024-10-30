import '../app/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" /> 
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anek+Tamil:wght@100..800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="debug-screens">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
