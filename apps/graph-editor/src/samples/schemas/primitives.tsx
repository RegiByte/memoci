import { schemaBuilder } from "../../builders/Schema"
import React from "react"
import { numberNodesBundle, stringNodesBundle } from "./nodesBundles"

let primitivesSchema = schemaBuilder()
  .title("Primitives (String / Node)")
  .key("primitives")
  .description("Provides basic primitive data manipulating strings")
  .addSchemaBundle(stringNodesBundle)
  .addSchemaBundle(numberNodesBundle)
  .createNode(builder =>
    builder
      .key("random node")
      .label("That awesome node we were talking about")
      .data({
        superSecretApiKey: "string"
      })
      .addSourceSocket({
        key: "response",
        type: "string",
        label: "Response"
      })
      .build()
  )

export const schemas = [primitivesSchema.build()]

export { getPrimitivesDocs } from "./docs"
