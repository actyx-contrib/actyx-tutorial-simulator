import { Aedes } from 'aedes/types/instance'
import { usage } from './messages'
import { Simulation } from './simulation'
import { hasProp, sendError } from './utils'

export const handleMqttCommands = (aedesServer: Aedes, simulation: Simulation) => {
  aedesServer.subscribe(
    'commands',
    (packet, _cb) => {
      try {
        const data: unknown = JSON.parse(packet.payload.toString())
        if (
          typeof data === 'object' &&
          data &&
          hasProp(data, 'command') &&
          typeof data.command === 'string'
        ) {
          switch (data.command) {
            case 'start': {
              if (hasProp(data, 'partsToProduce') && typeof data.partsToProduce === 'number') {
                simulation.start(data.partsToProduce)
              } else {
                sendError(aedesServer, 'mqtt Package start requires partsToProduce as number', data)
              }
              break
            }
            case 'stop': {
              simulation.stop()
              break
            }
            default: {
              sendError(aedesServer, 'only start and stop commands are supported', data)
            }
          }
        } else {
          sendError(aedesServer, 'mqtt Package not valid', data)
        }
      } catch (e) {
        sendError(aedesServer, 'failed to parse mqtt Package', `${e}`.split('\n')[0])
      }
    },
    () => {
      console.log(' -> subscription to mqtt commands established')
    },
  )
}

export const handleKeyboardCommands = (simulation: Simulation) => {
  process.stdin.on('data', (data) => {
    const [cmd, ...value] = data.toString().trim().split(' ')

    switch (cmd) {
      case 'start': {
        try {
          const amount = parseInt(value.join(''))
          simulation.start(amount)
        } catch (e) {
          console.error(`${e}`.split('\n')[0])
        }
        break
      }
      case 'stop': {
        simulation.stop()
        break
      }
      default:
        console.log('Command not found\n' + usage)
        break
    }
  })
}
