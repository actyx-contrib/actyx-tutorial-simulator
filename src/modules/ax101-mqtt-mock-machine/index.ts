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
import { createServer } from 'net'
import { handleKeyboardCommands, handleMqttCommands } from './hander'
import { usage, welcomeMessage } from './messages'
import { mkSimulation } from './simulation'

type Options = Partial<{
  port: string
}>
const main = async ({ port }: Options) => {
  // create MQTT server
  const aedesServer = aedes()
  const server = createServer(aedesServer.handle)
  const serverPort = parseInt(port || '1883')
  server.listen(serverPort, function () {
    console.log(welcomeMessage)
    console.log('MQTT-server available on port ', port)
    console.log(usage)
  })

  // create simulation
  const simulation = mkSimulation(aedesServer)

  // listen to mqtt commands
  handleMqttCommands(aedesServer, simulation)

  // listen to keyboard command
  handleKeyboardCommands(simulation)
}

export default main
