import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    paths: {
      base: process.env.GITHUB_ACTIONS ? '/sikkim-govt-salary-calculator-' : ''
    }
  }
};

export default config;
