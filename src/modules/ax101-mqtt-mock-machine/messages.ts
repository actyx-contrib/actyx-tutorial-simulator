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
export const welcomeMessage = `Simulates a machine with a MQTT interface.
On one side, the machine listens on the topic 'commands' to start and stop the production.
On the other side, the active machine emits frequently 'material-consumed' events on the topic 'material'
1. start:              '{ "command": "start", "partsToProduce": "<amount>" }'
2. stop:               '{ "command": "stop" }'
3. material-consumed:  '{ "event": "material-consumed" }'
`
export const usage = `Available commands are:
 start <amount> - starts the machine manually
 stop           - stops the machine manually
`
