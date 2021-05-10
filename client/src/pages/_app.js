import Head from 'next/head';
import { useEffect } from 'react';

import Header from '../components/Header';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const metaTitle =
    (pageProps.meta && pageProps.meta.title) || 'NextJS Onboarding';
  const metaDescription = (pageProps.meta && pageProps.meta.title) || '';

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header pageName={pageProps.pageName} />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
