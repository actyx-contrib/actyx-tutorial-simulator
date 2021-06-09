import { Command } from 'commander'

export const cli = (program: Command): Command => {
  program
    .command('ax101-3-machine')
    .description('Starts a MQTT machine simulation that consumes material')
    .action(() => require('./index.js').default(process.argv))

  return program
}

export default cli
