import { GraphSchema } from "../../../types/GraphSchema"
import create from "zustand"
import { RuntimeSchema } from "../../../types/RuntimeSchema"
import { primitivesSchema } from "../../../samples/schemas/primitives"

export interface GraphStore {
  schema?: GraphSchema
  runtimeSchema: RuntimeSchema

  setSchema(newSchema: GraphSchema): void

  setRuntimeSchema(runtimeSchema: RuntimeSchema): void
}

export function createGraphStore(defaultSchema?: GraphSchema) {
  return create<GraphStore>((set, get) => ({
    schema: defaultSchema,
    runtimeSchema: primitivesSchema.build(),
    setRuntimeSchema(runtimeSchema: RuntimeSchema) {
      set({
        runtimeSchema
      })
    },
    setSchema(newSchema: GraphSchema) {
      set({
        schema: newSchema
      })
    }
  }))
}
