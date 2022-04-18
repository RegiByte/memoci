import { GraphEdge, GraphNode, NodeGraph } from "./graph"

export interface GraphPathfinder {
  graph: NodeGraph

  setGraph(graph: NodeGraph): GraphPathfinder

  findNode(nodeId: string): GraphNode | null

  findNodeEdges(nodeId: string): GraphEdge[]

  findNodeSources(nodeId: string): GraphEdge[]

  findNodeTargets(nodeId: string): GraphEdge[]

  forwards(
    startNode: string,
    manual: boolean,
    callback: PathfinderCallback
  ): Promise<any>

  backwards(
    startNode: string,
    manual: boolean,
    callback: PathfinderCallback
  ): Promise<any>
}

export type AddNextNodeFn = (nextNode: string) => void
export type PathfinderCallback = (edge: GraphEdge, addNextNode?: AddNextNodeFn) => Promise<void>

