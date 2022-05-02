import { GraphEdge, GraphNode, GraphSchema } from "../../../types/GraphSchema"
import { IoAttribute, RuntimeSchema } from "../../../types/RuntimeSchema"
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  ConnectionMode,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  NodePositionChange,
  ReactFlowProps
} from "react-flow-renderer"
import create from "zustand"
import { useCallback, useEffect, useMemo } from "react"
import NodeComponent from "../nodeComponent"
import { collect } from "collect.js"
import EdgeComponent from "../edgeComponent"
import { createBundleman } from "../../../samples/schemas/bundleman"
import ConnectionLine from "../ConnectionLine"

export interface FlowGraph {
  flow: ReactFlowProps
  graphix: {
    graphStore: FlowGraphStore
  }
}

type UpdateSchemaCallback = (
  schema: Pick<FlowGraphStore, "nodes" | "edges">
) => Partial<Pick<FlowGraphStore, "nodes" | "edges">>

export interface FlowGraphStore {
  nodes: Node[]
  edges: Edge[]

  syncFromSchema(schema: GraphSchema<any>): void

  updateFlow(callback: UpdateSchemaCallback): void
}

export function graphNodesToFlow(nodes: GraphNode[]): Node[] {
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

export function graphEdgesToFlow(edges: GraphEdge[]): Edge[] {
  return edges.map(
    edge =>
      ({
        id: edge.key,
        type: edge.type,
        source: edge.source,
        target: edge.target,
        sourceHandle: edge.sourceSocket,
        targetHandle: edge.targetSocket,
        data: {}
      } as Edge)
  )
}

export const createFlowGraphStore = () => {
  return create<FlowGraphStore>((set, get) => ({
    nodes: [],
    edges: [],
    syncFromSchema(schema: GraphSchema<any>) {
      set({
        nodes: graphNodesToFlow(schema.nodes),
        edges: graphEdgesToFlow(schema.edges)
      })
    },
    updateFlow(callback: UpdateSchemaCallback) {
      const { nodes, edges } = get()

      const result = callback({
        nodes,
        edges
      })

      set({
        edges: result?.edges || edges,
        nodes: result?.nodes || nodes
      })
    }
  }))
}

const useFlowGraphStore = createFlowGraphStore()

interface FlowGraphHookProps<T> {
  schema: GraphSchema<T>
  setSchema: (newSchema: GraphSchema) => void
  runtimeSchema: RuntimeSchema<T>
}

export function useFlowGraph<T = IoAttribute>(
  props: FlowGraphHookProps<T>
): FlowGraph {
  const { schema, setSchema, runtimeSchema } = props
  const graphStore = useFlowGraphStore()
  const nodeTypes = useMemo(() => {
    return collect(runtimeSchema.nodes)
      .map(node => node.key)
      .unique()
      .reduce(
        (carry, nodeType) => ({
          ...carry,
          [nodeType]: NodeComponent
        }),
        {}
      )
  }, [runtimeSchema])

  const edgeTypes = useMemo(() => {
    return collect(runtimeSchema.edges)
      .map(edge => edge.key)
      .unique()
      .reduce(
        (carry, edgeType) => ({
          ...carry,
          [edgeType]: EdgeComponent
        }),
        {
          default: EdgeComponent
        } as any
      )
  }, [runtimeSchema])

  const { nodes, edges } = graphStore
  const syncSchemaFromFlow = useCallback(() => {
    // const schemaNodesById = collect(schema.nodes)
    //   .keyBy("id")
    //   .all() as unknown as Record<string, GraphNode>
    //
    // setSchema({
    //   ...schema,
    //   nodes: nodes.map(node => {
    //     if (schemaNodesById[node.id]) {
    //       return graphNodeBuilder(schemaNodesById[node.id])
    //         .position({
    //           x: node.position.x,
    //           y: node.position.y
    //         })
    //         .build() as any
    //     }
    //
    //     return createBundleman(runtimeSchema)
    //       .graphNode[node.type!]!.position({
    //         x: node.position.x,
    //         y: node.position.y
    //       })
    //       .build() as any
    //   })
    // } as any)
  }, [schema, nodes, edges, runtimeSchema])

  useEffect(() => {
    graphStore.syncFromSchema(schema)
  }, [])

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      const positionChanges = changes
        .filter(change => change.type === "position")
        .map(change => change as NodePositionChange)

      if (positionChanges.length) {
        // console.log(positionChanges)
        // setSchema(
        //   graphBuilder<IoAttribute>(schema as any)
        //     .updateNodesPositions(
        //       positionChanges.map((change: NodePositionChange) => ({
        //         key: change.id,
        //         position: change.position as GraphNodePosition
        //       }))
        //     )
        //     .build()
        // )
      }

      graphStore.updateFlow(current => ({
        nodes: applyNodeChanges(changes, current.nodes)
      }))
    },
    [schema]
  )
  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    graphStore.updateFlow(current => ({
      edges: applyEdgeChanges(changes, current.edges)
    }))
  }, [])

  const onConnect = useCallback(
    (connection: Connection) =>
      graphStore.updateFlow(current => {
        const targetNode = collect(current.nodes).first(
          node => node.id === connection.target
        )
        const sourceNode = collect(current.nodes).first(
          node => node.id === connection.source
        )

        if (!sourceNode || !targetNode) return {}

        return {
          edges: addEdge(
            {
              type:
                createBundleman(runtimeSchema).node?.[sourceNode.type!]!
                  .ioType || "any",
              ...connection
            },
            current.edges
          )
        }
      }),
    [runtimeSchema]
  )

  return {
    flow: {
      nodes: graphStore.nodes,
      edges: graphStore.edges,
      onNodesChange,
      onEdgesChange,
      onConnect,
      nodeTypes,
      edgeTypes,
      defaultZoom: 1,
      minZoom: 1,
      maxZoom: 5,
      panOnScroll: true,
      snapToGrid: true,
      snapGrid: [15, 15],
      connectionMode: ConnectionMode.Strict,
      connectionLineComponent: ConnectionLine
    },
    graphix: {
      graphStore
    }
  }
}
