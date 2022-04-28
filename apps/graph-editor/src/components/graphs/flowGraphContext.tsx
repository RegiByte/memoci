import React, { useContext } from "react"
import { GraphSchema } from "../../types/GraphSchema"
import { BundleMan } from "../../samples/schemas/bundleman"
import { RuntimeSchema } from "../../types/RuntimeSchema"

interface FlowGraphContextData {
  schema: GraphSchema<any>
  bundleMan: BundleMan
  runtimeSchema: RuntimeSchema<any>
}

export const FlowGraphContext = React.createContext<FlowGraphContextData>({} as any)

export function useFlowGraphContext() {
  return useContext(FlowGraphContext)
}
