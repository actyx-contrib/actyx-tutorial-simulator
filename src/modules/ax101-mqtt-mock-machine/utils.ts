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
