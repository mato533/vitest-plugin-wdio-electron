import { builtinModules } from 'node:module'
import { dirname } from 'node:path'
import { readFileSync } from 'node:fs'

import typescript from '@rollup/plugin-typescript'
import del from 'rollup-plugin-delete'
// import json from '@rollup/plugin-json'
import nodeExternals from 'rollup-plugin-node-externals'

import type { Plugin, WarningHandlerWithDefault } from 'rollup'

const onwarn: WarningHandlerWithDefault = (warning) => {
  console.error(
    'Building Rollup produced warnings that need to be resolved. ' +
      'Please keep in mind that the browser build may never have external dependencies!'
  )
  throw Object.assign(new Error(), warning)
}
const emitModulePackageFile = (): Plugin => {
  return {
    name: 'emit-module-package-file',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'package.json',
        source: `{"type":"module"}`,
      })
    },
  }
}

let isDeleted = false
const getPlugins = (plugins: Plugin[]): Plugin[] => {
  if (!isDeleted) {
    isDeleted = true
    return plugins.concat([
      del({
        targets: 'dist/*',
        runOnce: true,
        verbose: true,
      }),
    ])
  } else {
    return plugins
  }
}
const sourcemap = () => process.env.CI !== 'true'

const pkg = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url), 'utf8')
)

const external = [].concat(
  Object.keys(pkg.peerDependencies || {}),
  builtinModules,
  ['@electron-forge/shared-types']
)

const buildConfig = {
  input: {
    index: 'src/index.ts',
    setup: 'src/setup.ts',
  },
  external,
  onwarn,
  strictDeprecations: true,
  output: [
    {
      format: 'cjs',
      dir: dirname(pkg.main),
      exports: 'named',
      footer: 'module.exports = Object.assign(exports.default, exports);',
      sourcemap: sourcemap(),
    },
    {
      format: 'es',
      dir: dirname(pkg.module),
      plugins: [emitModulePackageFile()],
      sourcemap: sourcemap(),
    },
  ],
  plugins: getPlugins([
    typescript({
      sourceMap: sourcemap(),
    }),
    nodeExternals(),
  ]),
}

export default [buildConfig]
