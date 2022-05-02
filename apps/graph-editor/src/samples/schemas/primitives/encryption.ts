import { nodeBuilder as nobu } from "../../../builders/Schema/nodes"

export const decryptNode = nobu()
  .ioType("string")
  .key("decrypt")
  .label("Decrypt")
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
    type: "string",
    label: "Output"
  })
  .build()

export const encryptNode = nobu()
  .ioType("string")
  .key("encrypt")
  .label("Encrypt")
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
    type: "string",
    label: "Output"
  })
  .build()
