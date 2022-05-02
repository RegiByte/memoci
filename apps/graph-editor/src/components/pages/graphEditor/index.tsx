import React, { useCallback, useRef, useState } from "react"
import { GraphSchema } from "../../../types/GraphSchema"
import { createGraphStore } from "./graphStore"
import { Flow } from "../../graphs/flow"
import { useFlowGraph } from "../../graphs/hooks/useFlowGraph"
import { IoAttribute, RuntimeSchema } from "../../../types/RuntimeSchema"
import { FlowGraphContext } from "../../graphs/flowGraphContext"
import { createBundleman } from "../../../samples/schemas/bundleman"
import { createGraphBundleMan } from "../../../samples/schemas/graphBundleman"
import GraphContextMenu from "./GraphContextMenu"
import { initialGraph } from "./dummy.graph"
import GraphToolbar from "./Toolbar"
import { ReactFlowProvider } from "react-flow-renderer"

interface GraphFormProps<T = IoAttribute> {
  runtimeSchema: RuntimeSchema<T>
  schema: GraphSchema<T>
  setSchema: (newSchema: GraphSchema) => void
  height?: number
}

export function GraphForm<T = IoAttribute>(props: GraphFormProps<T>) {
  const graphCanvasRef = useRef<any>()
  const [{ menuX, menuY, open }, setMenuState] = useState({
    menuX: 0,
    menuY: 0,
    open: false
  })

  const {
    flow,
    graphix: { graphStore }
  } = useFlowGraph<T>({
    schema: props.schema,
    setSchema: props.setSchema,
    runtimeSchema: props.runtimeSchema
  })

  const theme = {
    "--io-string-color": "var(--tw-color-blue-500)",
    "--io-number-color": "var(--tw-color-lime-500)",
    "--io-boolean-color": "var(--tw-color-red-500)",
    "--io-json-color": "var(--tw-color-amber-500)",
    "--io-array-color": "var(--tw-color-sky-400)",
    "--io-image-color": "var(--tw-color-purple-500)",
    "--io-any-color": "var(--tw-color-fuchsia-500)"
  }

  const closeContextMenu = () =>
    setMenuState(c => ({
      ...c,
      open: false
    }))

  const onRightClick = useCallback(
    (ev: any) => {
      ev.preventDefault()

      const { clientX: x, clientY: y } = ev

      setMenuState(c => ({
        menuX: x + 50,
        menuY: y - 100,
        open: !c.open
      }))

      return false
    },
    [graphCanvasRef]
  )

  return (
    <ReactFlowProvider>
      <div
        className="relative overflow-hidden bg-sky-200"
        ref={graphCanvasRef}
        style={{ ...theme, height: props.height || `calc(100vh - 72px - 1px)` }}
        onContextMenu={onRightClick}
      >
        <FlowGraphContext.Provider
          value={{
            schema: props.schema,
            runtimeSchema: props.runtimeSchema,
            bundleMan: createBundleman<T>(props.runtimeSchema),
            graphBundleMan: createGraphBundleMan<T>(props.schema),
            graphStore,
            setSchema: props.setSchema
          }}
        >
          <GraphToolbar />

          <GraphContextMenu
            closeMenu={closeContextMenu}
            menuX={menuX}
            menuY={menuY}
            open={open}
          />

          <div className="h-full">
            <Flow {...flow} />
          </div>
        </FlowGraphContext.Provider>
      </div>
    </ReactFlowProvider>
  )
}

const useGraphCreateStore = createGraphStore(initialGraph)

export function GraphCreateForm() {
  const { schema, setSchema, runtimeSchema } = useGraphCreateStore()

  return (
    <GraphForm
      runtimeSchema={runtimeSchema}
      schema={schema!}
      setSchema={setSchema}
    />
  )
}
