import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/index.ts',
  plugins: [typescript({
    useTsconfigDeclarationDir: true
  })],
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
