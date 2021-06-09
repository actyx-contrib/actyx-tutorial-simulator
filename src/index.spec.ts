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
import { createCliProgram } from '../lib/index'
import { Command } from 'commander'

describe('module auto-loader', () => {
  it('all modules still available', () => {
    const program = new Command() as Command
    const commandSpy = spyOn(program, 'command').and.callThrough()
    createCliProgram(program)

    expect(commandSpy).toHaveBeenCalledTimes(4)
    expect(commandSpy).toBeCalledWith('ax101-3-scanner')
    expect(commandSpy).toBeCalledWith('ax101-3-machine')
    expect(commandSpy).toBeCalledWith('opcua-mock-plc')
    expect(commandSpy).toBeCalledWith('Template')
  })
})
