/*
 * Copyright 2021 Actyx AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
