import { nodeBuilder } from "../../builders/Schema/nodes"
import {
  IoAttribute,
  NodeSchema,
  RuntimeSchema
} from "../../types/RuntimeSchema"
import { collect } from "collect.js"

let nobu = nodeBuilder()

type BundleManNode = Record<string, NodeSchema<IoAttribute>>
type BundleManEdge = Record<string, NodeSchema<IoAttribute>>

type BundleMan = Record<"node", BundleManNode> & Record<"edge", BundleManEdge>

export function createBundleman(target: Partial<RuntimeSchema>): BundleMan {
  const nodeProxy = new Proxy(
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

  const edgeProxy = new Proxy(
    {},
    {
      get(proxyTarget, key: "string") {
        if (target.edges && target?.edges?.length > 0) {
          return (
            collect<NodeSchema<IoAttribute>>(target.edges)
              .where("key", key)
              .first() || null
          )
        }

        return null
      }
    }
  )

  return new Proxy(
    {},
    {
      get(proxyTarget, key: "node" | "edge") {
        if (key === "node") {
          return nodeProxy as BundleManNode
        }

        return edgeProxy as BundleManEdge
      }
    }
  ) as BundleMan
}

export const stringNodesBundle: Partial<RuntimeSchema> = {
  edges: [
    {
      key: "string",
      label: "String Edge",
      data: {
        value: "string"
      }
    }
  ],
  nodes: [
    nobu
      .key("string")
      .label("String Node")
      .data({
        value: "string"
      })
      .addTargetSocket({
        key: "value",
        label: "Value",
        type: "string"
      })
      .addSourceSocket({
        key: "output",
        label: "Output",
        type: "string"
      })
      .build(),
    nobu
      .key("join_string")
      .label("Join String")
      .data({
        string1: "string",
        string2: "string"
      })
      .addTargetSocket({
        key: "string1",
        label: "First String",
        type: "string"
      })
      .addTargetSocket({
        key: "string2",
        label: "Second String",
        type: "string"
      })
      .addSourceSocket({
        key: "output",
        label: "Output",
        type: "string"
      })
      .build(),
    nobu
      .key("reverse_string")
      .label("Reverse string")
      .data({
        value: "string"
      })
      .addTargetSocket({
        key: "value",
        label: "Value",
        type: "string"
      })
      .addSourceSocket({
        key: "output",
        label: "Output",
        type: "string"
      })
      .build(),
    nobu
      .key("trim_string")
      .label("Trim string")
      .data({
        value: "string"
      })
      .addTargetSocket({
        key: "value",
        label: "Value",
        type: "string"
      })
      .addSourceSocket({
        key: "output",
        label: "Output",
        type: "string"
      })
      .build()
  ]
}

export const stringBundleman = createBundleman(stringNodesBundle)

export const numberNodesBundle: Partial<RuntimeSchema> = {
  edges: [
    {
      key: "number",
      label: "Number Edge",
      data: {
        value: "number"
      }
    }
  ],
  nodes: [
    nobu
      .key("number")
      .label("Number Node")
      .data({
        value: "number"
      })
      .addTargetSocket({
        key: "value",
        label: "Value",
        type: "number"
      })
      .addSourceSocket({
        key: "output",
        label: "Output",
        type: "number"
      })
      .build(),
    nobu
      .key("add_number")
      .label("Add Number")
      .data({
        number1: "number",
        number2: "number"
      })
      .addTargetSocket({
        key: "number1",
        label: "First Number",
        type: "number"
      })
      .addTargetSocket({
        key: "number2",
        label: "Second Number",
        type: "number"
      })
      .addSourceSocket({
        key: "output",
        label: "Output",
        type: "number"
      })
      .build(),
    nobu
      .key("subtract_number")
      .label("Subtract Number")
      .data({
        number1: "number",
        number2: "number",
        total: "number"
      })
      .addTargetSocket({
        key: "number1",
        label: "First Number",
        type: "number"
      })
      .addTargetSocket({
        key: "number2",
        label: "Second Number",
        type: "number"
      })
      .addSourceSocket({
        key: "output",
        label: "Output",
        type: "number"
      })
      .build()
  ]
}

export const numberBundleman = createBundleman(numberNodesBundle)
