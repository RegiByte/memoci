import { GraphEdge, GraphNode, NodeGraph } from "../types/graph"
import { GraphPathfinder, PathfinderCallback } from "../types/graphPathfinder"

export class BfsPathfinder implements GraphPathfinder {
  graph: NodeGraph

  constructor(graph: NodeGraph) {
    this.graph = graph
  }

  async backwards(
    startNode: string,
    manual: boolean,
    callback: PathfinderCallback
  ): Promise<any> {
    const queue = [startNode]

    const addNextNode = (nextNode: string) => {
      queue.unshift(nextNode)
    }

    while (queue.length) {
      const current = queue.shift()
      const connectedTargets = this.graph.edges.filter(
        edge => edge.target === current
      )

      for (let edge of connectedTargets) {
        const source = edge.source
        await callback(edge, manual ? addNextNode : undefined)

        if (!manual) {
          addNextNode(source)
        }
      }
    }
  }

  async forwards(
    startNode: string,
    manual: boolean,
    callback: PathfinderCallback
  ): Promise<any> {
    const queue = [startNode]

    const addNextNode = (nextNode: string) => {
      queue.unshift(nextNode)
    }

    while (queue.length) {
      const current = queue.shift()
      const connectedSources = this.graph.edges.filter(
        edge => edge.source === current
      )

      for (let edge of connectedSources) {
        const target = edge.target
        await callback(edge, manual ? addNextNode : undefined)
        if (!manual) {
          queue.unshift(target)
        }
      }
    }
  }

  setGraph(graph: NodeGraph): GraphPathfinder {
    this.graph = graph
    return this
  }

  findNode(nodeId: string): GraphNode | null {
    return this.graph.nodes.find(node => node.id === nodeId) || null
  }

  findNodeEdges(nodeId: string): GraphEdge[] {
    return this.graph.edges.filter(edge =>
      [edge.source, edge.target].includes(nodeId)
    )
  }

  findNodeSources(nodeId: string): GraphEdge[] {
    return this.graph.edges.filter(edge => edge.target === nodeId)
  }

  findNodeTargets(nodeId: string): GraphEdge[] {
    return this.graph.edges.filter(edge => edge.source === nodeId)
  }
}
