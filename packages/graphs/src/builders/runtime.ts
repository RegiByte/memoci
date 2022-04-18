import { GraphRuntime, GraphRuntimeResolver } from "../types/graphRuntime"
import { NodeGraph } from "../types/graph"
import { BasicRuntime } from "../impl/graphRuntime"

export interface RuntimeBuilder {
  build(): GraphRuntime

  addResolver(nodeType: string, resolver: GraphRuntimeResolver): RuntimeBuilder
}

export function basicRuntimeBuilder(graph: NodeGraph): RuntimeBuilder {
  const runtime = new BasicRuntime(graph)

  return {
    addResolver(
      nodeType: string,
      resolver: GraphRuntimeResolver
    ): RuntimeBuilder {
      runtime.addResolver(nodeType, resolver)
      return this
    },
    build(): GraphRuntime {
      return runtime
    }
  }
}

export function testRuntimeBuilder(graph: NodeGraph): RuntimeBuilder {
  const builder = basicRuntimeBuilder(graph)

  return builder
    .addResolver("string", async (node, edges, utils) => {
      return node.data?.value || ""
    })
    .addResolver("inputs", async (node, edges, utils) => {
      const inputs = utils.graph.inputs

      return inputs.reduce((payload, input) => {
        return {
          ...payload,
          [input.id]: utils.getInput(input.id, null)
        }
      }, {})
    })
    .addResolver("join_strings", async (node, edges, utils) => {
      const string1Edge = utils.findEdgeByTargetSocket(
        edges,
        node.id,
        "string1"
      )
      const string2Edge = utils.findEdgeByTargetSocket(
        edges,
        node.id,
        "string2"
      )

      const string1Value = utils.getEdgeValue(string1Edge, "")
      const string2Value = utils.getEdgeValue(string2Edge, "")

      let string1, string2

      if (!string1Edge) {
        string1 = node.data?.string1 || ""
      } else {
        if (string1Edge.source === "inputs") {
          const { [string1Edge.sourceSocket]: value } = string1Value
          string1 = value
        } else {
          string1 = string1Value
        }
      }

      if (!string2Edge) {
        string2 = node.data?.string2 || ""
      } else {
        if (string2Edge.source === "inputs") {
          const { [string2Edge.sourceSocket]: value } = string2Value
          string2 = value
        } else {
          string2 = string2Value
        }
      }

      return {
        result: `${string1}${string2}`
      }
    })
    .addResolver("reverse_string", async (node, edges, utils) => {
      const inputEdge = utils.findEdgeByTargetSocket(edges, node.id, "input")

      if (!inputEdge || inputEdge.type !== "string") {
        return {
          result: ""
        }
      }

      const edgeValue = utils.getEdgeValue(inputEdge, "")
      let value: string

      if (inputEdge.source === "inputs") {
        value = edgeValue[inputEdge.sourceSocket]
      } else {
        value = edgeValue
      }

      return value.split("").reverse().join("")
    })
}
