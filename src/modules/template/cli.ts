import { Command } from 'commander'

export const cli = (program: Command): Command => {
  // uncomment this to add a new module to the project
  // program
  //   .command('Template')
  //   .description('example to present how to add a new module')
  //   .action(() => require('./index.js').default(process.argv))

  // add this new command to src/index.spec.ts
  return program
}

export default cli
