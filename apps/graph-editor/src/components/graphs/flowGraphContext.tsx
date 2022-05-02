import React, { useContext } from "react"
import { GraphSchema } from "../../types/GraphSchema"
import { BundleMan } from "../../samples/schemas/bundleman"
import { RuntimeSchema } from "../../types/RuntimeSchema"
import { GraphBundleMan } from "../../samples/schemas/graphBundleman"
import { FlowGraphStore } from "./hooks/useFlowGraph"

interface FlowGraphContextData {
  schema: GraphSchema<any>
  setSchema: (newSchema: GraphSchema) => void
  bundleMan: BundleMan
  graphBundleMan: GraphBundleMan
  runtimeSchema: RuntimeSchema<any>
  graphStore: FlowGraphStore
}

export const FlowGraphContext = React.createContext<FlowGraphContextData>({} as any)

export function useFlowGraphContext() {
  return useContext(FlowGraphContext)
}
