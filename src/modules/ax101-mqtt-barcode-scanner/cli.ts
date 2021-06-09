import { Command } from 'commander'

export const cli = (program: Command): Command => {
  program
    .command('ax101-3-scanner')
    .description('Starts a MQTT barcode scanner simulation')
    .action(() => require('./index.js').default(process.argv))

  return program
}

export default cli
