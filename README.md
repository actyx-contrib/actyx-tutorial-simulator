# Actyx Tutorial Simulations

TODO

## Modules

### opcua-mock-plc

OPC UA mock plc simulating a machine behavior

Compatible to the Actyx-Demo-Box

```
start:
> actyx-tutorial-simu opcua-mock-plc --port 4334
```

### ax101-3-scanner

Barcode or RFID reader simulation with an MQTT interface

Use your keyboard to simulate a Barcode or RFID scanner.
The scanner will send MQTT packages on the 'scan' topic.
Two packages are generated:

1. scanned: '{ "event": "scanned", "value": "\<id\>" }'
2. lost: '{ "event": "lost" }

Available keyboard commands are:

- r - Send a random uuid as 'scanned' package
- l - Send 'lost' package
- s <ID> - Send given id as 'scanned' package

Compatible to the Actyx-Academy-ax101 course Module 3

```
start:
> actyx-tutorial-simu ax101-3-scanner --port 1883
```

### ax101-3-machine

Simulates a machine with a MQTT interface that consumes material.
On one side, the machine listens on the topic 'commands' to start and stop the production.
On the other side, the active machine emits frequently 'material-consumed' events on the topic 'material'

1. start: '{ "command": "start", "partsToProduce": "\<amount\>" }'
2. stop: '{ "command": "stop" }'
3. material-consumed: '{ "event": "material-consumed" }'

Available keyboard commands are:

- start \<amount\> - starts the machine manually
- stop - stops the machine manually

```
start:
> actyx-tutorial-simu ax101-3-machine --port 1884
```
