import { nodeBuilder as nobu } from "../../../builders/Schema/nodes"

const nobuString = nobu().ioType("string")

export const jsonToJsonCollectionNode = nobu()
  .ioType("json")
  .key("json_to_collection")
  .label("JSON to JSON Collection")
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
    type: "json_collection",
    label: "Output"
  })
  .build()

export const transformJsonCollectionNode = nobu()
  .ioType("json_collection")
  .key("transform_collection")
  .label("Transform JSON Collection")
  .data({
    json_collection: "json_collection",
    json_transform: "json_transform"
  })
  .addTargetSocket({
    key: "json_collection",
    type: "json_collection",
    label: "JSON Collection"
  })
  .addTargetSocket({
    key: "json_transform",
    type: "json_transform",
    label: "JSON Transform"
  })
  .addSourceSocket({
    key: "output",
    type: "json_collection",
    label: "Output"
  })
  .build()

export const jsonCollectionToCsvCollectionNode = nobu()
  .ioType("json_collection")
  .key("collection_to_csv")
  .label("JSON Collection to CSV Collection")
  .data({
    json_collection: "json_collection",
    headers: "string"
  })
  .addTargetSocket({
    key: "json_collection",
    type: "json_collection",
    label: "JSON Collection"
  })
  .addTargetSocket({
    key: "headers",
    type: "string",
    label: "Headers"
  })
  .addSourceSocket({
    key: "output",
    type: "csv_collection",
    label: "Output"
  })
  .build()

export const transformCsvCollectionNode = nobu()
  .ioType("csv_collection")
  .key("transform_csv_collection")
  .label("Transform CSV Collection")
  .data({
    csv_collection: "csv_collection",
    csv_transform: "csv_transform"
  })
  .addTargetSocket({
    key: "csv_collection",
    type: "csv_collection",
    label: "CSV Collection"
  })
  .addTargetSocket({
    key: "csv_transform",
    type: "csv_transform",
    label: "CSV Transform"
  })
  .addSourceSocket({
    key: "output",
    type: "csv_collection",
    label: "Output"
  })
  .build()
