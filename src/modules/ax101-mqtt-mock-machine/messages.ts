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
