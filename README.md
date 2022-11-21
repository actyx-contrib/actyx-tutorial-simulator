# IMPORTANT NOTICE

**This repository has been archived and is no longer maintained. You are welcome to copy the code into your own projects and continue using it at your own discretion and risk.**

# Actyx Tutorial Simulations

## 📦 Installation

```shell
npm install -g @actyx-contrib/actyx-tutorial-simulator
```

## Modules

### opcua-mock-plc

The opcua-mock-plc starts an opcua-server and simulates a very trivial machine with a state, a speed value, and a temperature.

```
default address: opc.tcp://localhost:4434/UA/actyx/
security:
  user: actyx
  password: actyx
Component State:  /mockPLC/State  |  ns=1;s=state  |  Int16
Component Speed:  /mockPLC/Speed  |  ns=1;s=speed  |  Float
Component Temp:   /mockPLC/Temp   |  ns=1;s=temp   |  Float
```

Compatible to the Actyx-Demo-Box [https://github.com/actyx-contrib/machine-demo-box]

#### Start

```
> npx @actyx-contrib/actyx-tutorial-simulator opcua-mock-plc --port 4334
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

#### Start

```
> npx @actyx-contrib/actyx-tutorial-simulator ax101-3-scanner --port 1885
> actyx-tutorial-simu ax101-3-scanner --port 1885
```

#### Test

```
npx mqtt sub -t 'scan' -h 'localhost' -p 1884
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

#### Start

```
> npx @actyx-contrib/actyx-tutorial-simulator ax101-3-machine --port 1884
> actyx-tutorial-simu ax101-3-machine --port 1884
```

#### Test

```
> npx mqtt sub -t 'material' -h 'localhost' -p 1885
> npx mqtt sub -t 'error' -h 'localhost' -p 1885
> npx mqtt pub -t 'commands' -h 'localhost' -p 1885 -m '{"command": "start", "partsToProduce": 2}'
> npx mqtt pub -t 'commands' -h 'localhost' -p 1885 -m '{"command": "stop"}'
```
