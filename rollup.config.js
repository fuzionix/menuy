import { babel } from '@rollup/plugin-babel'
import { dts } from "rollup-plugin-dts"
import terser from '@rollup/plugin-terser'

const config = [
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/menuy.js',
        format: 'cjs',
      },
      {
        file: 'dist/menuy.esm.js',
        format: 'esm',
      },
      {
        file: 'dist/menuy.umd.js',
        format: 'umd',
        name: 'Menuy',
      }
    ],
    plugins: [
      babel({
        babelHelpers: 'runtime',
        plugins: ['@babel/plugin-transform-runtime'],
        exclude: 'node_modules/**'
      }),
      terser()
    ],
    external: [/@babel\/runtime/]
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/index.d.ts',
        format: 'es'
      }
    ],
    plugins: [
      dts(),
      babel({
        babelHelpers: 'runtime',
        plugins: ['@babel/plugin-transform-runtime'],
        exclude: 'node_modules/**'
      })
    ]
  }
]

export default config