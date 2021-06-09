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
import { Aedes } from 'aedes'
import { PublishPacket } from 'aedes/types/packet'

export const mkPublishPackage = (topic: string, payload: any): PublishPacket => ({
  topic,
  payload: JSON.stringify(payload),
  cmd: 'publish',
  retain: false,
  dup: false,
  qos: 0,
})
export const mkMaterialConsumedPackage = () => ({ event: 'material-consumed' })

export const sendError = (aedesServer: Aedes, message: string, data: any) => {
  console.error(message, data)
  sendMqtt(aedesServer, 'error', { message, data })
}

export const sendMqtt = (aedesServer: Aedes, topic: string, data: any) => {
  aedesServer.publish(mkPublishPackage(topic, data), (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log(`${JSON.stringify(data)} send successfully`)
    }
  })
}

export const hasProp = <T extends object, K extends string>(
  obj: T,
  key: K,
): obj is T & Record<K, unknown> => obj.hasOwnProperty(key)
