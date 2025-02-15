import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'
import { resolve } from 'path'
import { threeMinifier } from "@yushijinhun/three-minifier-rollup"

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),

    target: '#svelte',

    package: {
      emitTypes: true,
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      exports: (file) => file === 'index.ts'
    },

    vite: {
      plugins: [
        { ...threeMinifier(), enforce: "pre" }
      ],
      resolve: {
        alias: {
          threlte: resolve('src/lib'),
          $components: resolve('src/components'),
          $examples: resolve('src/examples')
        }
      },
      ssr: {
        noExternal: ['three']
      }
    }
  }
}

export default config
