import React, { useCallback, useEffect, useMemo } from "react"
import { useFlowGraphContext } from "../../graphs/flowGraphContext"
import { useForm } from "react-hook-form"
import NodeSchemaVisualEditor from "../schemaEditor/NodeSchemaVisualEditor"
import { IoAttribute, NodeSchema } from "../../../types/RuntimeSchema"
import { useReactFlow, useUpdateNodeInternals } from "react-flow-renderer"
import { graphBuilder } from "../../../builders/Schema/graph"
import { graphNodesToFlow } from "../../graphs/hooks/useFlowGraph"

interface GraphContextMenuProps {
  open: boolean
  menuX: number
  menuY: number
  closeMenu: () => void
}

function GraphContextMenu({
  open,
  menuX,
  menuY,
  closeMenu
}: GraphContextMenuProps) {
  const reactFlowInstance = useReactFlow()
  const { runtimeSchema, graphStore, schema, setSchema, bundleMan } =
    useFlowGraphContext()
  const { register, watch, setFocus } = useForm({
    defaultValues: {
      search: ""
    }
  })
  const search = watch("search")

  useEffect(() => {
    if (open) {
      setFocus("search")
    }
  }, [open, setFocus])

  const { nodes } = runtimeSchema
  const filteredNodes = useMemo(() => {
    return nodes.filter(node => {
      if (!search) return true
      return [node.label, node.key, node.ioType].some(token =>
        new RegExp(search, "gi").test(token)
      )
    })
  }, [nodes, search])

  const updateNodeInternals = useUpdateNodeInternals()

  const addNode = useCallback(
    (node: NodeSchema<IoAttribute>) => {
      console.log("adding node", node)
      const xyPosition = reactFlowInstance.project({
        x: menuX,
        y: menuY - 100
      })
      console.log(node.key, xyPosition)
      const newNode = bundleMan.graphNode[node.key]!.key(
        `${node.key}_${new Date().getTime()}`
      )
        .position({
          x: xyPosition.x,
          y: xyPosition.y
        })
        .build()
      const updatedSchema = graphBuilder(schema)
        .addNode({ ...newNode })
        .build()
      setSchema(updatedSchema)
      graphStore.updateFlow(current => ({
        nodes: [...current.nodes, ...graphNodesToFlow([newNode])]
      }))

      setTimeout(() => {
        updatedSchema.nodes.forEach(updatedNode =>
          updateNodeInternals(updatedNode.key)
        )
      }, 200)
    },
    [schema, menuX, menuY]
  )

  return (
    <>
      <div
        className="absolute inset-0 z-[10] h-full w-full backdrop-blur-sm"
        style={{
          display: open ? "flex" : "none"
        }}
        onClick={closeMenu}
      />

      <div
        className={`absolute bottom-0 left-0 z-[10] w-full
          rotate-[180deg] bg-white p-4 shadow-lg shadow-sky-300`}
        style={{
          display: open ? "flex" : "none"
        }}
      >
        <div className="flex w-full rotate-[180deg] flex-col">
          <div className="w-full px-2">
            <input
              {...register("search")}
              autoFocus={true}
              className="w-full rounded-full px-4 py-2"
              placeholder={"Search Nodes"}
              type="text"
            />
          </div>

          <div className="flex max-w-full snap-x items-start gap-8 overflow-y-hidden py-8 px-4">
            {filteredNodes.map(node => (
              <NodeSchemaVisualEditor
                key={node.key}
                node={node}
                setSchema={null}
                onClick={() => {
                  addNode(node)
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default GraphContextMenu
