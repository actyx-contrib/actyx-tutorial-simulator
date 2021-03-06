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
import { Command } from 'commander'

export const cli = (program: Command): Command => {
  // Template of a new module
  // the template is not packed into the public node module
  program
    .command('template')
    .description('example to present how to add a new module')
    .option('-p --port <port>', 'MQTT-server port')
    .action((param) => require('./index.js').default(param))

  // add your new module to src/index.spec.ts
  return program
}

export default cli
