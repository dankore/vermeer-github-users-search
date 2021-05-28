import React from 'react';
import Head from 'next/head';
import '../css/main.css';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <ThemeProvider attribute="class">
            <Head>
                <meta content="width=device-width, initial-scale=1" name="viewport" />
            </Head>
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
        </ThemeProvider>
    );
}
