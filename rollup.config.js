import typescript from 'rollup-plugin-typescript2'

const plugins = [
  typescript({
    useTsconfigDeclarationDir: true
  })
]

export default {
  input: 'src/index.ts',
  plugins,
  output: [{
    file: 'dist/my-async-store.esm.js',
    format: 'esm'
  }, {
    file: 'dist/my-async-store.cjs.js',
    format: 'cjs'
  }, {
    name: 'MyAsyncStore',
    file: 'dist/my-async-store.umd.js',
    format: 'umd'
  }]
}
