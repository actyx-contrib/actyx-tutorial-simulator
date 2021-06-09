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
import aedes from 'aedes'
import { PublishPacket } from 'aedes/types/packet'
import { createServer } from 'net'
import * as uuid from 'uuid'

type Options = Partial<{
  port: string
}>
const main = async ({ port }: Options) => {
  const aedesServer = aedes()
  const server = createServer(aedesServer.handle)

  const serverPort = parseInt(port || '1883')

  server.listen(serverPort, function () {
    console.log(welcomeMessage)
    console.log('MQTT-server available on port ', port)
    console.log(usage)
  })

  process.stdin.on('data', (data) => {
    const input = data.toString().trim()

    switch (input.substr(0, 1)) {
      case 'r': {
        const randomId = uuid.v4()
        const data = mkScannedPackage(randomId)
        aedesServer.publish(mkPublishPackage('scan', data), (err) => {
          if (err) {
            console.log(err)
          } else {
            console.log(`${JSON.stringify(data)} send successfully`)
          }
        })
        break
      }
      case 's': {
        const id = input.substr(2)
        if (id.length === 0) {
          console.log("command 's' requires an id\n" + usage)
          break
        }
        const data = mkScannedPackage(id)
        aedesServer.publish(mkPublishPackage('scan', data), (err) => {
          if (err) {
            console.log(err)
          } else {
            console.log(`${JSON.stringify(data)} send successfully`)
          }
        })

        break
      }
      case 'l': {
        const data = mkLossPackage()

        aedesServer.publish(mkPublishPackage('scan', data), (err) => {
          if (err) {
            console.log(err)
          } else {
            console.log(`${JSON.stringify(data)} send successfully`)
          }
        })
        break
      }

      default:
        console.log('Command not found\n' + usage)
        break
    }
  })
}

const welcomeMessage = `Use your keyboard to simulate a Barcode or RFID scanner.
The scanner will send MQTT packages on the 'scan' topic.
Two packages are generated:
1. scanned: '{ "event": "scanned", "value": "<id>" }'
2. lost:    '{ "event": "lost" }'
`

const usage = `Available commands are:
 r      - Send a random uuid as 'scanned' package
 l      - Send 'lost' package
 s <ID> - Send given id as 'scanned' package
`

const mkPublishPackage = (topic: string, payload: any): PublishPacket => ({
  topic,
  payload: JSON.stringify(payload),
  cmd: 'publish',
  retain: false,
  dup: false,
  qos: 0,
})

const mkScannedPackage = (value: string) => ({
  event: 'scanned',
  value,
})
const mkLossPackage = () => ({
  event: 'lost',
})

export default main
