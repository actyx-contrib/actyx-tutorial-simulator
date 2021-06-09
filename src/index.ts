import { Command } from 'commander'
import { removeDot, toolVersion } from './utils'
import { readdirSync } from 'fs'

export const cli = (): void => {
  let program = createCliProgram(new Command() as Command)

  if (program) {
    program.parse(process.argv)
  } else {
    console.error('Failed to load module. Please check your node installation')
  }
}

export const createCliProgram = (program: Command): Command | undefined => {
  if (!require.main) {
    return undefined
  }

  program.version('Actyx Tutorial Simulation V:' + toolVersion)

  const rootPath = require.main.path + '/..'
  const lib = rootPath + '/lib'
  const modules = removeDot(readdirSync(lib + '/modules'))

  modules.forEach((module) => {
    const mod = require(`./modules/${module}/cli.js`)
    program = mod.default(program)
  })
  return program
}
