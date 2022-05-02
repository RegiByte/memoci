import { graphBuilder } from "../../../builders/Schema/graph"
import { primitivesBundleman } from "../../../samples/schemas/primitives"

export const initialGraph = graphBuilder()
  .title("Basic graph")
  .key("basic_graph")
  .description("Basic graph for testing purposes")
  .docs(`# Hey nice docs 👍`)
  .addNodes([
    primitivesBundleman.graphNode
      .string!.key("string1")
      .position({
        x: 100,
        y: 30
      })
      .build(),
    primitivesBundleman.graphNode
      .string!.key("string2")
      .position({
        x: 100,
        y: 200
      })
      .build(),
    primitivesBundleman.graphNode
      .join_string!.key("join_string1")
      .position({
        x: 320,
        y: 125
      })
      .build(),
    primitivesBundleman.graphNode
      .reverse_string!.key("reverse_string1")
      .position({
        x: 550,
        y: 165
      })
      .build(),
    primitivesBundleman.graphNode
      .number!.key("number1")
      .position({
        x: 100,
        y: 400
      })
      .build(),
    primitivesBundleman.graphNode
      .add_number!.key("add_number1")
      .position({
        x: 350,
        y: 400
      })
      .build(),
    primitivesBundleman.graphNode
      .boolean!.key("boolean1")
      .position({
        x: 550,
        y: 350
      })
      .build(),
    primitivesBundleman.graphNode
      .not_boolean!.key("not_boolean1")
      .position({
        x: 750,
        y: 450
      })
      .build(),
    primitivesBundleman.graphNode
      .and_boolean!.key("and_boolean1")
      .position({
        x: 950,
        y: 350
      })
      .build(),
    primitivesBundleman.graphNode
      .parse_json!.key("parse_json1")
      .position({
        x: 750,
        y: 100
      })
      .build(),
    primitivesBundleman.graphNode
      .stringify_json!.key("stringify_json1")
      .position({
        x: 950,
        y: 20
      })
      .build(),

    primitivesBundleman.graphNode
      .path_json!.key("path_json1")
      .position({
        x: 950,
        y: 175
      })
      .build()
  ])
  .addEdges([
    {
      key: "string1_to_join_strings",
      type: "string",
      source: "string1",
      sourceSocket: "output",
      target: "join_string1",
      targetSocket: "string1"
    },
    {
      key: "string2_to_join_strings",
      type: "string",
      source: "string2",
      sourceSocket: "output",
      target: "join_string1",
      targetSocket: "string2"
    },
    {
      key: "join_strings_to_reverse_string",
      type: "string",
      source: "join_string1",
      sourceSocket: "output",
      target: "reverse_string1",
      targetSocket: "value"
    },
    {
      key: "number1_to_add_number1",
      type: "number",
      source: "number1",
      sourceSocket: "value",
      target: "add_number1",
      targetSocket: "number1"
    },
    {
      key: "boolean1_to_not_boolean1",
      type: "boolean",
      source: "boolean1",
      sourceSocket: "output",
      target: "not_boolean1",
      targetSocket: "value"
    },
    {
      key: "boolean1_to_and_boolean1",
      type: "boolean",
      source: "boolean1",
      sourceSocket: "output",
      target: "and_boolean1",
      targetSocket: "value1"
    },
    {
      key: "not_boolean1_to_and_boolean1",
      type: "boolean",
      source: "not_boolean1",
      sourceSocket: "output",
      target: "and_boolean1",
      targetSocket: "value2"
    },
    {
      key: "parse_json1_to_path_json1",
      type: "json",
      source: "parse_json1",
      sourceSocket: "output",
      target: "path_json1",
      targetSocket: "json"
    },
    {
      key: "parse_json1_to_stringify_json1",
      type: "json",
      source: "parse_json1",
      sourceSocket: "output",
      target: "stringify_json1",
      targetSocket: "json"
    },
    {
      key: "reverse_string1_to_json_path1",
      type: "string",
      source: "reverse_string1",
      sourceSocket: "output",
      target: "path_json1",
      targetSocket: "path"
    }
  ])
  .build()
