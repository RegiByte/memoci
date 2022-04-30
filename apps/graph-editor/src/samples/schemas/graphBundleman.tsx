import { GraphEdge, GraphNode, GraphSchema } from "../../types/GraphSchema"
import { collect } from "collect.js"
import { IoAttribute } from "../../types/RuntimeSchema"

export type GraphNodeBundleMan = Record<string, GraphNode | null>
export type GraphEdgeBundleMan = Record<string, GraphEdge | null>

export type GraphBundleMan = {
  node: GraphNodeBundleMan
  edge: GraphEdgeBundleMan
}

export function createGraphNodeBundleMan<T>(
  graph: Partial<GraphSchema<T>>
): GraphNodeBundleMan {
  return new Proxy(
    {},
    {
      get(target, key: string) {
        if (!graph.nodes?.length) return null

        return collect(graph.nodes).where("key", key).first() || null
      }
    }
  )
}

export function createGraphEdgeBundleMan<T>(
  graph: Partial<GraphSchema<T>>
): GraphEdgeBundleMan {
  return new Proxy(
    {},
    {
      get(target, key: string) {
        if (!graph.edges?.length) return null

        return collect(graph.edges).where("key", key).first() || null
      }
    }
  )
}

export function createGraphBundleMan<T = IoAttribute>(
  graph: Partial<GraphSchema<T>>
): GraphBundleMan {
  const graphNodeBundleman = createGraphNodeBundleMan<T>(graph)
  const edgeBundleman = createGraphEdgeBundleMan<T>(graph)

  return new Proxy(
    {},
    {
      get(target, key: keyof GraphBundleMan) {
        const handlers: Record<keyof GraphBundleMan, any> = {
          node: graphNodeBundleman,
          edge: edgeBundleman
        }

        if (!handlers[key]) {
          throw new Error(
            `Error: property ${key} is not a valid bundleMan method.`
          )
        }

        return handlers[key]
      }
    }
  ) as GraphBundleMan
}
