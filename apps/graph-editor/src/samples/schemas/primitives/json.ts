import { nodeBuilder as nobu } from "../../../builders/Schema/nodes"

export const parseJsonNode = nobu()
  .ioType("json")
  .key("parse_json")
  .label("Parse JSON")
  .data({
    string: "string"
  })
  .addTargetSocket({
    key: "string",
    type: "string",
    label: "String"
  })
  .addSourceSocket({
    key: "output",
    type: "json",
    label: "Output"
  })
  .build()

export const stringifyJsonNode = nobu()
  .ioType("string")
  .key("stringify_json")
  .label("Stringify JSON")
  .data({
    json: "json"
  })
  .addTargetSocket({
    key: "json",
    type: "json",
    label: "JSON"
  })
  .addSourceSocket({
    key: "output",
    type: "string",
    label: "Output"
  })
  .build()

export const pathJsonNode = nobu()
  .ioType("json")
  .key("path_json")
  .label("Path JSON")
  .data({
    json: "json",
    path: "string"
  })
  .addTargetSocket({
    key: "path",
    type: "string",
    label: "Path"
  })
  .addTargetSocket({
    key: "json",
    type: "json",
    label: "JSON"
  })
  .addSourceSocket({
    key: "output",
    type: "any",
    label: "Output"
  })
  .build()
