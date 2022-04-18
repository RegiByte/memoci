import { GraphNode, GraphNodePosition, GraphNodeSocket } from "../types/graph"
import { DateTime } from "luxon"

interface NodeBuilder {
  id(id: string): NodeBuilder

  data(data: any): NodeBuilder

  type(type: string): NodeBuilder

  position(position: GraphNodePosition): NodeBuilder

  build(): GraphNode

  targets(targets: Omit<GraphNodeSocket<"target">, "direction">[]): NodeBuilder

  target(target: Omit<GraphNodeSocket<"target">, "direction">): NodeBuilder

  sources(sources: Omit<GraphNodeSocket<"source">, "direction">[]): NodeBuilder

  source(source: Omit<GraphNodeSocket<"source">, "direction">): NodeBuilder
}

export function basicNodeBuilder(): NodeBuilder {
  const node: GraphNode = {
    id: DateTime.now().toUnixInteger().toString(),
    data: {},
    type: "none",
    targets: [],
    sources: [],
    position: {
      x: 0,
      y: 0
    }
  }

  return {
    id(id): NodeBuilder {
      node.id = id
      return this
    },
    type(type): NodeBuilder {
      node.type = type
      return this
    },
    data(data): NodeBuilder {
      node.data = data
      return this
    },
    position(position): NodeBuilder {
      node.position = position
      return this
    },
    targets(targets) {
      node.targets = targets.map(target => ({
        ...target,
        direction: "target"
      }))
      return this
    },
    target(target: GraphNodeSocket<"target">): NodeBuilder {
      node.targets.push({
        ...target,
        direction: "target"
      })
      return this
    },
    sources(sources: GraphNodeSocket<"source">[]): NodeBuilder {
      node.sources = sources.map(source => ({
        ...source,
        direction: "source"
      }))
      return this
    },
    source(source: GraphNodeSocket<"source">): NodeBuilder {
      node.sources.push({
        ...source,
        direction: "source"
      })
      return this
    },
    build(): GraphNode {
      return node
    }
  }
}

export function stringNodeBuilder(): NodeBuilder {
  const builder = basicNodeBuilder()

  return builder
    .type("string")
    .data({
      value: ""
    })
    .source({
      id: "value",
      type: "string",
      label: "value"
    })
}

export function joinStringsNodeBuilder(): NodeBuilder {
  const builder = basicNodeBuilder()

  return builder
    .type("join_strings")
    .target({
      id: "string1",
      type: "string",
      label: "string 1"
    })
    .target({
      id: "string2",
      type: "string",
      label: "string 2"
    })
    .source({
      id: "result",
      type: "string",
      label: "result"
    })
}

export function reverseStringNodeBuilder(): NodeBuilder {
  const builder = basicNodeBuilder()

  return builder
    .type("reverse_string")
    .source({
      id: "result",
      type: "string",
      label: "result"
    })
    .target({
      id: "input",
      type: "string",
      label: "input"
    })
}

export function inputsNodeBuilder(): NodeBuilder {
  const builder = basicNodeBuilder()

  return builder.id("inputs").type("inputs")
}

export function outputsNodeBuilder(): NodeBuilder {
  const builder = basicNodeBuilder()

  return builder.id("outputs").type("outputs")
}

const nodeBuilder = {
  inputs: inputsNodeBuilder(),
  outputs: outputsNodeBuilder(),
  string: stringNodeBuilder(),
  joinStrings: joinStringsNodeBuilder(),
  reverseString: reverseStringNodeBuilder()
}

export default nodeBuilder
