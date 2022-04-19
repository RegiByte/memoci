import {
  GraphEdge,
  GraphNode,
  NodeGraph,
  NodeGraphAttribute
} from "../types/graph"

interface GraphBuilder {
  addNode: (params: GraphNode) => GraphBuilder
  addEdge: (params: GraphEdge) => GraphBuilder
  addInput: (params: NodeGraphAttribute) => GraphBuilder
  addOutput: (params: NodeGraphAttribute) => GraphBuilder

  build(): NodeGraph
}

export function graphBuilder(): GraphBuilder {
  let graph: NodeGraph = {
    nodes: [],
    edges: [],
    inputs: [],
    outputs: []
  }

  return {
    addNode(params) {
      graph.nodes.push(params)
      return this
    },
    addEdge(params) {
      graph.edges.push(params)
      return this
    },
    addInput(params) {
      graph.inputs.push(params)
      return this
    },
    addOutput(params) {
      graph.outputs.push(params)
      return this
    },
    build(): NodeGraph {
      return graph as NodeGraph
    }
  }
}
