// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { vitePlugin as remix, cloudflareDevProxyVitePlugin as remixCloudflareDevProxy } from '@remix-run/dev';

import jsconfigPaths from 'vite-jsconfig-paths';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypeImgSize from 'rehype-img-size';
import rehypeSlug from 'rehype-slug';
import rehypePrism from '@mapbox/rehype-prism';
import glsl from 'vite-plugin-glsl';
import svgr from 'vite-plugin-svgr';
import copy from 'rollup-plugin-copy';


export default defineConfig({
    base: process.env.NODE_ENV === 'production' ? '/' : '/',
    assetsInclude: ['**/*.glb', '**/*.hdr', '**/*.glsl', '**/*.svg', '**/*.wasm', '**/*.webp'],
    optimizeDeps: {
        include: [
            "isbot",
            "@remix-run/react",
            "tsparticles",
            "@fortawesome/free-brands-svg-icons",
            "@fortawesome/free-solid-svg-icons",
            "framer-motion",
            "react-tsparticles"
        ],
        exclude: [],
        ssr: {
            noExternal: [
                "isbot",
                "@remix-run/react",
                "tsparticles",
                "@fortawesome/free-brands-svg-icons",
                "@fortawesome/free-solid-svg-icons",
                "framer-motion",
                "react-tsparticles"
            ]
        },
    },
    esbuild: {
        treeShaking: true,
    },
    build: {
        reportCompressedSize: false,
        sourcemap: false,
        terserOptions: {
            compress: {
                drop_console: true,
                pure_funcs: ['console.debug'],
            },
        },
        assetsInlineLimit: 1024,
        manifest: true,
        outDir: "build/client",
        rollupOptions: {
            onwarn(warning, warn) {
                if (warning.code === 'UNUSED_EXTERNAL_IMPORT' || warning.message.includes('sideEffects')) {
                    return;
                }
                warn(warning);
            },
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('react') || id.includes('react-dom')) {
                            return;
                        }
                        return 'vendor';
                    }
                },
            },
            plugins: [
                copy({
                    targets: [
                        { src: 'public/static/robots.txt', dest: 'build/client/' },
                    ],
                    hook: 'writeBundle',
                }),
            ],
        },
        minify: 'terser',
        chunkSizeWarningLimit: 4000,
    },
    resolve: {
        alias: {
            '~app': resolve(__dirname, 'app'),
        },
    },
    plugins: [
        svgr(),
        mdx({
            rehypePlugins: [[rehypeImgSize, { dir: 'app' }], rehypeSlug, rehypePrism],
            remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
            providerImportSource: '@mdx-js/react',
        }),
        remixCloudflareDevProxy(),
        remix({
            routes(defineRoutes) {
                return defineRoutes(route => {
                    route('/', 'routes/home/route.js', { index: true });
                });
            },
        }),
        jsconfigPaths(),
        glsl(),
    ],
    server: {
        headers: {
            'Cross-Origin-Opener-Policy': 'same-origin',
            'Cross-Origin-Embedder-Policy': 'require-corp',
            'Cross-Origin-Resource-Policy': 'cross-origin',
            'Access-Control-Allow-Origin': '*'
        }
    },
});