// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      input: resolve(__dirname, 'client/build/index.html'),
      external: ['react'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'React',
        },
      },
    },
  },
})