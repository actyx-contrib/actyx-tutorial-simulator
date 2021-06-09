import { createCliProgram } from '../lib/index'
import { Command } from 'commander'

describe('module auto-loader', () => {
  it('all modules still available', () => {
    const program = new Command() as Command
    const commandSpy = spyOn(program, 'command').and.callThrough()
    createCliProgram(program)

    expect(commandSpy).toHaveBeenCalledTimes(3)
    expect(commandSpy).toBeCalledWith('ax101-3-scanner')
    expect(commandSpy).toBeCalledWith('ax101-3-machine')
    expect(commandSpy).toBeCalledWith('opcua-mock-plc')
  })
})
