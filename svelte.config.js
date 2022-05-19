import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import path from 'path';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter({
			// default options are shown
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false
		}),
		vite: {
			optimizeDeps: {
				esbuildOptions: {
					// Node.js global to browser globalThis
					define: {
						global: 'globalThis'
					},
					// Enable esbuild polyfill plugins
					plugins: [
						NodeGlobalsPolyfillPlugin({
							buffer: true,
							global: true,
							process: true,
							url: true,
							assert: true,
							crypto: true,
							http: true,
							https: true,
							os: true,
							stream: true
						})
					]
				}
			},
			resolve: {
				alias: {
					'@toruslabs/openlogin': path.resolve(
						'./node_modules/@toruslabs/openlogin/dist/openlogin.umd.min.js'
					)
				}
			}
		}
	}
};

export default config;
