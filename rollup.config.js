import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

const plugins = [
  typescript({
    useTsconfigDeclarationDir: true
  }),
  terser({
    include: [/^.+\.min\.js$/], 
  })
]

export default {
  input: 'src/index.ts',
  plugins,
  output: [
    {
      file: 'dist/my-async-store.esm.js',
      format: 'esm'
    }, 
    {
      file: 'dist/my-async-store.esm.min.js',
      format: 'esm'
    }, 
    {
      file: 'dist/my-async-store.cjs.js',
      format: 'cjs'
    }, 
    {
      file: 'dist/my-async-store.cjs.min.js',
      format: 'cjs'
    }, 
    {
      name: 'MyAsyncStore',
      file: 'dist/my-async-store.umd.js',
      format: 'umd'
    }, 
    {
      name: 'MyAsyncStore',
      file: 'dist/my-async-store.umd.min.js',
      format: 'umd'
    }
  ]
}
