import { GraphEdge, GraphNode, GraphSchema } from "../../../types/GraphSchema"
import { IoAttribute } from "../../../types/RuntimeSchema"
import { Edge, Node, ReactFlowProps } from "react-flow-renderer"
import create from "zustand"
import { useEffect, useMemo } from "react"
import NodeComponent from "../nodeComponent"
import { collect } from "collect.js"

export interface FlowGraph {
  flow: ReactFlowProps
}

export interface FlowGraphStore {
  nodes: Node[]
  edges: Edge[]

  initSchema(schema: GraphSchema<any>): void
}

function graphNodesToFlow(nodes: GraphNode[]): Node[] {
  return nodes.map(
    node =>
      ({
        id: node.key,
        type: node.type,
        data: {},
        position: node.position,
        draggable: true
      } as Node)
  )
}

function graphEdgesToFlow(edges: GraphEdge[]): Edge[] {
  return edges.map(
    edge =>
      ({
        id: edge.key,
        type: edge.type,
        data: {}
      } as Edge)
  )
}

export const createFlowGraphStore = () => {
  return create<FlowGraphStore>((set, get) => ({
    nodes: [],
    edges: [],
    initSchema(schema: GraphSchema<any>) {
      set({
        nodes: graphNodesToFlow(schema.nodes),
        edges: graphEdgesToFlow(schema.edges)
      })
    }
  }))
}

const useFlowGraphStore = createFlowGraphStore()

const nodeMaker = new Proxy(
  {},
  {
    get(target, key: string) {
      return NodeComponent
    }
  }
)

export function useFlowGraph<T = IoAttribute>(
  schema: GraphSchema<T>,
  setSchema: (newSchema: GraphSchema) => void
): FlowGraph {
  const graphStore = useFlowGraphStore()
  const nodeTypes = useMemo(() => {
    return collect(schema.nodes)
      .map(node => node.type)
      .unique()
      .reduce(
        (carry, nodeType) => ({
          ...carry,
          [nodeType]: NodeComponent
        }),
        {}
      )
  }, [schema])

  useEffect(() => {
    graphStore.initSchema(schema)
  }, [])

  return {
    flow: {
      defaultNodes: graphStore.nodes,
      defaultEdges: graphStore.edges,
      nodeTypes,
      defaultZoom: 1.5
    }
  }
}
