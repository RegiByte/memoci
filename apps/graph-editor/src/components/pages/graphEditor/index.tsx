import React from "react"
import { GraphSchema } from "../../../types/GraphSchema"
import { createGraphStore } from "./graphStore"
import { graphBuilder } from "../../../builders/Schema/graph"
import {
  numberBundleman,
  stringBundleman
} from "../../../samples/schemas/nodesBundles"
import { Flow } from "../../graphs/flow"
import { useFlowGraph } from "../../graphs/hooks/useFlowGraph"
import { IoAttribute, RuntimeSchema } from "../../../types/RuntimeSchema"
import { FlowGraphContext } from "../../graphs/flowGraphContext"
import { createBundleman } from "../../../samples/schemas/bundleman"

interface GraphFormProps<T = IoAttribute> {
  runtimeSchema: RuntimeSchema<T>
  schema: GraphSchema<T>
  setSchema: (newSchema: GraphSchema) => void
}

export function GraphForm<T = IoAttribute>(props: GraphFormProps<T>) {
  const { flow } = useFlowGraph<T>(props.schema, props.setSchema)

  return (
    <div className="relative" style={{ height: `calc(100vh - 100px)` }}>
      <FlowGraphContext.Provider
        value={{
          schema: props.schema,
          runtimeSchema: props.runtimeSchema,
          bundleMan: createBundleman<T>(props.runtimeSchema)
        }}
      >
        <Flow {...flow} />
      </FlowGraphContext.Provider>
    </div>
  )
}

const useGraphCreateStore = createGraphStore(
  graphBuilder()
    .title("Basic graph")
    .key("basic_graph")
    .description("Basic graph for testing purposes")
    .docs(`# Hey nice docs 👍`)
    .addNodes([
      numberBundleman.graphNode
        .number!.key("number1")
        .position({
          x: 250,
          y: 200
        })
        .build(),
      stringBundleman.graphNode
        .string!.key("string1")
        .position({
          x: 100,
          y: 200
        })
        .build(),
      stringBundleman.graphNode
        .string!.key("string2")
        .position({
          x: 400,
          y: 200
        })
        .build()
    ])
    .build()
)

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
