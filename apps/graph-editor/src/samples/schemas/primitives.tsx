import { schemaBuilder } from "../../builders/Schema"
import {
  booleanNodesBundle,
  jsonNodesBundle,
  numberNodesBundle,
  stringNodesBundle
} from "./nodesBundles"
import { createBundleman } from "./bundleman"

export const primitivesSchema = schemaBuilder()
  .title("Primitives (String / Number)")
  .key("primitives")
  .description("Provides basic nodes for manipulating strings and numbers")
  .addSchemaBundle(stringNodesBundle)
  .addSchemaBundle(numberNodesBundle)
  .addSchemaBundle(booleanNodesBundle)
  .addSchemaBundle(jsonNodesBundle)

export const primitivesBundleman = createBundleman(primitivesSchema.build())

export const schemas = [primitivesSchema.build()]

