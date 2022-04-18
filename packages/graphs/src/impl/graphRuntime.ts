import { GraphEdge, GraphNode, NodeGraph } from "../types/graph"
import { GraphPathfinder } from "../types/graphPathfinder"
import {
  GraphRuntime,
  GraphRuntimeResolver,
  GraphRuntimeResolvers,
  GraphRuntimeResolverUtils
} from "../types/graphRuntime"
import { BfsPathfinder } from "./graphPathfinder"

export class BasicRuntime implements GraphRuntime {
  edgeValues: { [p: string]: any }

  graph: NodeGraph

  pathfinder: GraphPathfinder

  resolvers: GraphRuntimeResolvers

  execute(inputs: Record<string, any>): Promise<any> {
    return Promise.resolve(undefined)
  }

  async preview(inputs: Record<string, any>): Promise<any> {
    const graphInputs = this.graph.inputs
    const requiredInputs = graphInputs
      .filter(input => input.required)
      .map(input => input.id)
    const inputKeys = Object.keys(inputs)

    const missingInputs: string[] = []
    requiredInputs.forEach(input => {
      const isPresent = inputKeys.includes(input)

      if (!isPresent) {
        missingInputs.push(input)
      }

      return true
    })

    if (missingInputs.length > 0) {
      throw new Error(`missing inputs: ${missingInputs.join(", ")}`)
    }

    await this.pathfinder.forwards(
      "inputs",
      true,
      async (edge, addNextNode) => {
        if (addNextNode) {
          addNextNode(edge.target)
        }

        const edgeValueKey = this.getEdgeValueKey(edge)
        this.edgeValues[edgeValueKey] = await this.resolve(
          this.pathfinder.findNode(edge.source),
          this.pathfinder.findNodeEdges(edge.source),
          {
            getEdgeValue: this.getEdgeValue.bind(this),
            graph: this.graph,
            findEdgeByTargetSocket: this.findEdgeByTargetSocket.bind(this),
            findEdgeBySourceSocket: this.findEdgeBySourceSocket.bind(this),
            resolveOutputValue: this.resolveOutputValue.bind(this),
            getInput(inputKey: string, defaultValue: any): any {
              return inputs[inputKey] || defaultValue
            }
          }
        )
      }
    )

    return this.getOutputs()
  }

  findEdgeByTargetSocket(
    edges: GraphEdge[],
    nodeId: string,
    socketId: string
  ) {
    return edges.find(
      edge => edge.target === nodeId && edge.targetSocket === socketId
    )
  }

  findEdgeBySourceSocket(
    edges: GraphEdge[],
    nodeId: string,
    socketId: string
  ) {
    return edges.find(
      edge => edge.target === nodeId && edge.sourceSocket === socketId
    )
  }

  getOutputs(): any {
    const outputEdges = this.graph.edges.filter(
      edgeCandidate => edgeCandidate.target === "outputs"
    )

    const outputValues = outputEdges.map(edgeCandidate => ({
      edge: edgeCandidate,
      value: this.getEdgeValue(edgeCandidate, null)
    }))

    return outputValues.reduce((payload, outputValue) => {
      return {
        ...payload,
        [outputValue.edge.targetSocket]: this.resolveOutputValue(outputValue)
      }
    }, {})
  }

  resolveOutputValue(outputValue: { edge: GraphEdge; value: any }) {
    const { value } = outputValue
    if (typeof value === 'object') {
      return value?.result || value?.output
    }

    return value
  }

  getEdgeValueKey(edge: GraphEdge): string {
    return `${edge.source}:${edge.sourceSocket}--${edge.target}:${edge.targetSocket}`
  }

  getEdgeValue(edge: GraphEdge | undefined, defaultValue: any): any {
    if (!edge) {
      return defaultValue
    }

    return this.edgeValues?.[this.getEdgeValueKey(edge)] || defaultValue
  }

  async resolve(
    node: GraphNode | null,
    edges: GraphEdge[],
    utils: GraphRuntimeResolverUtils
  ): Promise<any> {
    if (!node) {
      return null
    }

    if (!this.resolvers[node.type]) {
      console.log(
        `skipping node ${node.id} because there is no resolver loaded for type ${node.type}`
      )
      return null
    }

    return this.resolvers[node.type](node, edges, utils)
  }

  addResolver(nodeType: string, resolver: GraphRuntimeResolver): GraphRuntime {
    this.resolvers[nodeType] = resolver
    return this
  }

  constructor(graph: NodeGraph) {
    this.graph = graph
    this.pathfinder = new BfsPathfinder(this.graph)
    this.edgeValues = {}
    this.resolvers = {}
  }
}
