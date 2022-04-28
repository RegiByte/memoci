import { GraphNode, GraphSchema } from "../types/GraphSchema"
import { collect } from "collect.js"

type PathFinderCallback = (nodeKey: string, node?: GraphNode) => Promise<void>

export async function PathFinder<T>(
  nodeKey: string,
  graph: GraphSchema<T>,
  callback: Function
) {
  const visited: Record<string, boolean> = {}
  let queue: string[] = []

  function regenerateQueue(item: string): string[] {
    if (visited) return queue
    if (queue.length < 1) return [item]
    return [queue[0], item, ...queue.slice(1)]
  }

  function isOnQueue(item: string): boolean {
    return queue.includes(item)
  }

  function enqueue(item: string) {
    queue = regenerateQueue(item)
  }

  queue.push(nodeKey)

  while (queue.length) {
    const node = queue.shift() as string
    const currentNode = collect(graph.nodes).keyBy("key").get(node)

    let allNeighbors = collect(graph.edges)
      .filter(edge => [edge.source, edge.target].includes(node))
      .sort(
        (edgeA, edgeB) =>
          Number(edgeA.target === node) - Number(edgeB.target === node)
      )
    const sortedNeighbors = allNeighbors
      .map(edge => {
        if (edge.target === node) return edge.source

        return edge.target
      })
      .filter(neighbor => !visited[neighbor])
      .all()

    for (const neighbor of sortedNeighbors) {
      if (!visited[neighbor] && !isOnQueue(neighbor)) {
        queue.unshift(neighbor)
      }
    }

    let unvisitedSources = allNeighbors
      .where("target", node)
      .map(edge => edge.source)
      .filter(neighbor => !visited[neighbor])
      .count()

    if (unvisitedSources > 0) {
      enqueue(node)
    } else {
      try {
        console.log("visited", node)
        await callback(node, currentNode)
      } catch (e) {
        console.log(`failed processing node: ${node}`)
      }

      visited[node] = true
    }
  }
}
