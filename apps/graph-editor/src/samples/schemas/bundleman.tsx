import {
  EdgeSchema,
  IoAttribute,
  NodeSchema,
  RuntimeSchema
} from "../../types/RuntimeSchema"
import {
  graphNodeBuilder,
  GraphNodeBuilder
} from "../../builders/Schema/graphNode"
import { collect } from "collect.js"

export type BundleManSchemaNode = Record<string, NodeSchema<IoAttribute> | null>
export type BundleManSchemaEdge = Record<string, NodeSchema<IoAttribute> | null>
export type BundleManGraphNode = Record<string, GraphNodeBuilder | null>

export type BundleMan = {
  node: BundleManSchemaNode
  edge: BundleManSchemaEdge
  graphNode: BundleManGraphNode
}

export function createRuntimeSchemaNodeProxy<T>(
  target: Partial<RuntimeSchema<T>>
): BundleManSchemaNode {
  return new Proxy(
    {},
    {
      get(proxyTarget, key: "string") {
        if (target.nodes && target?.nodes?.length > 0) {
          return (
            collect<NodeSchema<IoAttribute>>(target.nodes)
              .where("key", key)
              .first() || null
          )
        }

        return null
      }
    }
  )
}

export function createGraphNodeProxy<T = IoAttribute>(
  target: Partial<RuntimeSchema<T>>
): BundleManGraphNode {
  return new Proxy(
    {},
    {
      get(proxyTarget, key: "string") {
        if (target.nodes && target?.nodes?.length > 0) {
          let targetNode = collect<NodeSchema<T>>(target.nodes)
            .where("key", key)
            .first()

          if (!targetNode) return null

          return graphNodeBuilder<T>().fromSchema(targetNode)
        }

        return null
      }
    }
  )
}

export function createRuntimeSchemaEdgeProxy<T>(
  target: Partial<RuntimeSchema<T>>
): BundleManSchemaEdge {
  return new Proxy(
    {},
    {
      get(proxyTarget, key: "string") {
        if (target.edges && target?.edges?.length > 0) {
          return (
            collect<EdgeSchema<IoAttribute>>(target.edges)
              .where("key", key)
              .first() || null
          )
        }

        return null
      }
    }
  )
}

export function createBundleman<T = IoAttribute>(
  target: Partial<RuntimeSchema<T>>
): BundleMan {
  const nodeProxy = createRuntimeSchemaNodeProxy<T>(target)
  const edgeProxy = createRuntimeSchemaEdgeProxy<T>(target)
  const graphNodeProxy = createGraphNodeProxy<T>(target)

  return new Proxy(
    {},
    {
      get(proxyTarget, key: keyof BundleMan) {
        const handlers = {
          node: nodeProxy,
          edge: edgeProxy,
          graphNode: graphNodeProxy
        }

        if (!handlers[key]) {
          throw new Error(
            `Error: property ${key} is not a valid bundleMan method.`
          )
        }

        return handlers[key]
      }
    }
  ) as BundleMan
}

