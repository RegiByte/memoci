import { GraphEdge, GraphNode, NodeGraph } from "./graph"
import { GraphPathfinder } from "./graphPathfinder"

export type GraphRuntimeResolver = (
  node: GraphNode,
  edges: GraphEdge[],
  utils: GraphRuntimeResolverUtils
) => Promise<any>

export interface GraphRuntimeResolverUtils {
  getEdgeValue(edge: GraphEdge | undefined, defaultValue: any): any

  getInput(inputKey: string, defaultValue: any): any

  resolveOutputValue(outputValue: { edge: GraphEdge; value: any }): any

  findEdgeByTargetSocket(
    edges: GraphEdge[],
    nodeId: string,
    socketId: string
  ): GraphEdge | undefined

  findEdgeBySourceSocket(
    edges: GraphEdge[],
    nodeId: string,
    socketId: string
  ): GraphEdge | undefined

  graph: NodeGraph
}

export type GraphRuntimeResolvers = Record<string, GraphRuntimeResolver>

export interface GraphRuntime {
  graph: NodeGraph
  pathfinder: GraphPathfinder
  resolvers: GraphRuntimeResolvers
  edgeValues: {
    [edgeId: string]: any
  }

  addResolver(nodeType: string, resolver: GraphRuntimeResolver): GraphRuntime

  resolve(
    node: GraphNode | null,
    edges: GraphEdge[],
    utils: GraphRuntimeResolverUtils
  ): Promise<any>

  execute(inputs: Record<string, any>): Promise<any>

  preview(inputs: Record<string, any>): Promise<any>
}
