import React, { ReactNode } from 'react';
import { NextSeo } from 'next-seo';
import Navigation from './navigation';

interface IProps {
    title: string | string[];
    description?: string;
    webUrl?: string;
    imgUrl?: string;
    imgAlt?: string;
    children: ReactNode;
}
const Layout = (props: IProps): JSX.Element => (
    <div>
        <NextSeo
            title={`${props.title} | Vermeer Github Users Search`}
            description={props.description}
            canonical={props.webUrl}
            openGraph={{
                type: 'website',
                url: `${props.webUrl}`,
                title: `${props.title} | Vermeer Github Users Search`,
                description: `${props.description}`,
                images: [
                    {
                        url: `${props.imgUrl}`,
                        width: 800,
                        height: 600,
                        alt: `${props.imgAlt}`,
                    },
                ],
            }}
            robotsProps={{
                nosnippet: true,
                notranslate: true,
                noimageindex: true,
                noarchive: true,
                maxSnippet: -1,
                maxImagePreview: 'none',
                maxVideoPreview: -1,
            }}
        />
        <Navigation />
        <div className="flex flex-col">
            <main className="pt-5 bg-main dark:bg-gray-800" style={{ minHeight: '50rem' }}>
                {props.children}
            </main>
            <footer className="flex justify-center pt-3">
                <span>
                    &copy; {new Date().getFullYear()}{' '}
                    <a className="hover:text-indigo-600" href="https://dankore.com/">
                        Adamu M. Dankore.
                    </a>
                </span>
            </footer>
        </div>
    </div>
);

export default Layout;
