// app/root.jsx
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData, useNavigation, useRouteError } from '@remix-run/react';
import { ThemeProvider, themeStyles } from '~/components/theme-provider';
import GothamBook from '~/assets/fonts/gotham-book.woff2';
import GothamMedium from '~/assets/fonts/gotham-medium.woff2';
import { useEffect, useState } from 'react';
import { Error } from '~/layouts/error';
import { VisuallyHidden } from '~/components/visually-hidden';
import { Navbar } from '~/layouts/navbar';
import { Progress } from '~/components/progress';
import config from '~/config.json';
import styles from './root.module.css';
import './reset.module.css';
import './global.module.css';


export const links = () => [
    {
        rel: 'preload',
        href: GothamMedium,
        as: 'font',
        type: 'font/woff2',
        crossOrigin: '',
    },
    {
        rel: 'preload',
        href: GothamBook,
        as: 'font',
        type: 'font/woff2',
        crossOrigin: '',
    },
    { rel: 'manifest', href: '/manifest.json' },
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
    { rel: 'shortcut_icon', href: '/shortcut.png', type: 'image/png', sizes: '64x64' },
    { rel: 'apple-touch-icon', href: '/icon-256.png', sizes: '256x256' },
    { rel: 'author', href: '/humans.txt', type: 'text/plain' },
];

export const loader = async ({ request }) => {
    const { url } = request;
    const { pathname } = new URL(url);
    const pathnameSliced = pathname.endsWith('/') ? pathname.slice(0, -1) : url;
    const canonicalUrl = `${config.url}${pathnameSliced}`;

    return {
        canonicalUrl,
        theme: 'dark', // Valeur par défaut
    };
};

export default function App() {
    const { canonicalUrl } = useLoaderData();
    const { state } = useNavigation();

    // État du thème
    const [theme, setTheme] = useState('dark'); // Valeur par défaut

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    const toggleTheme = (newTheme) => {
        const updatedTheme = newTheme ? newTheme : theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', updatedTheme);
        setTheme(updatedTheme);
    };

    useEffect(() => {
        console.info(
            `${config.ascii}\n`,
            `Taking a peek huh? Check out the source code: ${config.repo}\n\n`
        );
    }, []);

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {/* Theme color doesn't support oklch so I'm hard coding these hexes for now */}
                <meta name="theme-color" content={theme === 'dark' ? '#111' : '#F2F2F2'} />
                <meta name="color-scheme" content={theme === 'light' ? 'light dark' : 'dark light'} />
                <style dangerouslySetInnerHTML={{ __html: themeStyles }} />
                <Meta />
                <Links />
                <link rel="canonical" href={canonicalUrl} />
            </head>
            <body data-theme={theme}>
                <ThemeProvider theme={theme} toggleTheme={toggleTheme}>
                    <Progress />
                    <VisuallyHidden showOnFocus as="a" className={styles.skip} href="#main-content">
                        Skip to main content
                    </VisuallyHidden>
                    <Navbar />
                    <main
                        id="main-content"
                        className={styles.container}
                        tabIndex={-1}
                        data-loading={state === 'loading'}
                    >
                        <Outlet />
                    </main>
                </ThemeProvider>
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export function ErrorBoundary() {
    const error = useRouteError();

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#111" />
                <meta name="color-scheme" content="dark light" />
                <style dangerouslySetInnerHTML={{ __html: themeStyles }} />
                <Meta />
                <Links />
            </head>
            <body data-theme="dark">
                <Error error={error} />
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}
