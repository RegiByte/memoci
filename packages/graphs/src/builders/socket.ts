import { GraphNodeSocket, GraphNodeSocketDirection } from "../types/graph"
import { DateTime } from "luxon"
import { kSocketTypes } from "../constants/sockets"

export interface SocketBuilder {
  build(): GraphNodeSocket<any>

  source(): SocketBuilder

  target(): SocketBuilder

  id(id: string): SocketBuilder

  direction(direction: GraphNodeSocketDirection): SocketBuilder

  type(newType: string): SocketBuilder

  label(label: string): SocketBuilder
}

export function basicSocketBuilder(): SocketBuilder {
  const socket: GraphNodeSocket<GraphNodeSocketDirection> = {
    id: DateTime.now().toUnixInteger().toString(),
    type: "empty",
    label: "basic",
    direction: "source"
  }

  return {
    id(id: string): SocketBuilder {
      socket.id = id
      return this
    },
    type(newType: string): SocketBuilder {
      socket.type = newType
      return this
    },
    source(): SocketBuilder {
      socket.direction = "source"
      return this
    },
    target(): SocketBuilder {
      socket.direction = "target"
      return this
    },
    direction(direction: GraphNodeSocketDirection): SocketBuilder {
      socket.direction = direction
      return this
    },
    label(label: string): SocketBuilder {
      socket.label = label
      return this
    },
    build(): GraphNodeSocket<any> {
      return socket
    }
  }
}

const socketBuilders: any = kSocketTypes.reduce((payload, socketType) => {
  return {
    ...payload,
    source: {
      ...((payload as any)?.source || {}),
      [socketType]: basicSocketBuilder().type(socketType).source()
    },
    target: {
      ...((payload as any)?.target || {}),
      [socketType]: basicSocketBuilder().type(socketType).target()
    },
    [socketType]: basicSocketBuilder().type(socketType)
  }
}, {})

export interface SocketBuilderMap {
  [key: string]: SocketBuilder

  string: SocketBuilder
  number: SocketBuilder
  boolean: SocketBuilder
  json: SocketBuilder
}

const {
  source: sourceSocketBuilders,
  target: targetSocketBuilders,
  ...normalSocketBuilders
} = socketBuilders

export const socketBuilder: SocketBuilderMap = {
  ...(normalSocketBuilders as any)
} as SocketBuilderMap

export const sourceSocketBuilder: SocketBuilderMap = {
  ...sourceSocketBuilders
} as SocketBuilderMap

export const targetSocketBuilder: SocketBuilderMap = {
  ...targetSocketBuilders
} as SocketBuilderMap
