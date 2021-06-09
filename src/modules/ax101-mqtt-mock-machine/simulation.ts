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
import { mkMaterialConsumedPackage, sendMqtt } from './utils'

export type Simulation = {
  start: (amount: number) => boolean
  stop: () => boolean
}

export const mkSimulation = (aedesServer: Aedes): Simulation => {
  let running = false
  let todo = 0
  let nextStepTimer: NodeJS.Timeout | undefined = undefined

  const sendPartProduced = () => {
    sendMqtt(aedesServer, 'material', mkMaterialConsumedPackage())
  }
  const nextStep = () => {
    if (todo > 0) {
      sendPartProduced()
      todo -= 1
      nextStepTimer = triggerNextStep()
    } else {
      todo = 0
      running = false
    }
  }
  const triggerNextStep = () => setTimeout(nextStep, 4500 + Math.floor(Math.random() * 1000))

  const start = (amount: number) => {
    if (running || amount === 0) {
      return false
    }

    todo = amount
    running = true
    nextStepTimer = triggerNextStep()
    return true
  }
  const stop = () => {
    if (running) {
      todo = 0
      running = false
      nextStepTimer && clearTimeout(nextStepTimer)
      return true
    }
    return false
  }

  return {
    start,
    stop,
  }
}
