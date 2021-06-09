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
import { OPCUAServer } from 'node-opcua'
import { simulateMachine } from './simulation'

// main entry-point for the opcua mock
const main = async () => {
  const port = parseInt(process.env.OPCUA_MOCK_PORT || '4434')
  const server = new OPCUAServer({
    port: port,
    resourcePath: '/UA/actyx/',
    buildInfo: {
      productName: 'Actyx-OPC_UA-MockPlc',
      buildNumber: '1',
      buildDate: new Date(2021, 5, 3),
    },
    allowAnonymous: false,
    userManager: {
      isValidUser: (username, password) => username === 'actyx' && password === 'actyx',
    },
  })

  const setupValues = async (server: OPCUAServer): Promise<() => void> => {
    const addressSpace = server.engine.addressSpace
    if (addressSpace) {
      const namespace = addressSpace.getOwnNamespace()
      const device = namespace.addObject({
        organizedBy: addressSpace.rootFolder.objects,
        browseName: 'mockPlc',
      })
      return simulateMachine(device, namespace)
    }
    return () => undefined
  }

  // init opcua server internals
  await server.initialize()
  // setup values provided by the OPCUA server
  const stopSimulation = await setupValues(server)
  // listen to port and show log message for the user
  server.start(() => {
    // multiple endpoints are supported. Reduce/Join will merge all ports to one coma separated string
    console.log(
      `Server is now listening on port ${server.endpoints
        .reduce<string[]>(
          (acc, ep) => [
            ...acc,
            `${ep.port} - ${ep.endpointDescriptions()[0].securityMode.toString()}, ${ep
              .endpointDescriptions()[0]
              .securityPolicyUri?.toString()}`,
          ],
          [],
        )
        .join(',')} (press CTRL+C to stop)`,
    )
  })

  server.on('session_closed', (session) => console.log('say goodbye to: ', session.sessionName))

  process.on('SIGINT', async () => {
    await server.shutdown()
    stopSimulation()
    console.log('terminated')
  })
}
export default main
