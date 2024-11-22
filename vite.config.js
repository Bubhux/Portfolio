// vite.config.js
import { defineConfig } from 'vite';
import { vitePlugin as remix } from '@remix-run/dev';
import jsconfigPaths from 'vite-jsconfig-paths';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypeImgSize from 'rehype-img-size';
import rehypeSlug from 'rehype-slug';
import rehypePrism from '@mapbox/rehype-prism';

export default defineConfig({
    assetsInclude: ['**/*.glb', '**/*.hdr', '**/*.glsl'],
    build: {
        assetsInlineLimit: 1024,
    },
    plugins: [
        mdx({
            rehypePlugins: [[rehypeImgSize, { dir: 'app' }], rehypeSlug, rehypePrism],
            remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
            providerImportSource: '@mdx-js/react',
        }),
        remix({
            routes(defineRoutes) {
                return defineRoutes(route => {
                    route('/', 'routes/home/route.js', { index: true });
                });
            },
        }),
        jsconfigPaths(),
    ],
});
