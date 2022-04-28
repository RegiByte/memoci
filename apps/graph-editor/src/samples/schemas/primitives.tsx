import { schemaBuilder } from "../../builders/Schema"
import { numberNodesBundle, stringNodesBundle } from "./nodesBundles"

export const primitivesSchema = schemaBuilder()
  .title("Primitives (String / Number)")
  .key("primitives")
  .description("Provides basic nodes for manipulating strings and numbers")
  .addSchemaBundle(stringNodesBundle)
  .addSchemaBundle(numberNodesBundle)

export const schemas = [primitivesSchema.build()]

export { getPrimitivesDocs } from "./docs"
