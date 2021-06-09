import { Command } from 'commander'

export const cli = (program: Command): Command => {
  program
    .command('opcua-mock-plc')
    .description('Starts an OPC UA mock PLC. Compatible to the demobox')
    .action(() => require('./index.js').default(process.argv))

  return program
}

export default cli
