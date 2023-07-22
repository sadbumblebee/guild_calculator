import adapter from '@sveltejs/adapter-static';
import autoprefixer from 'autoprefixer'
import sveltePreprocess from 'svelte-preprocess'

const dev = process.argv.includes('dev');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		sveltePreprocess({
			scss: true,
			postcss: {
				plugins: [autoprefixer]
			}
		})
	],
	kit: {
		adapter: adapter({
            // default options are shown. On some platforms
            // these options are set automatically — see below
            pages: 'build',
            assets: 'build',
            fallback: undefined,
            precompress: false,
            strict: true
        }),
		paths: {
			base: dev ? '' : process.env.BASE_PATH,
		}
	},
	extensions: ['.svelte']
};

export default config;
