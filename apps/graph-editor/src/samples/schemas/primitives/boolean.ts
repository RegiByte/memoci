import { nodeBuilder as nobu } from "../../../builders/Schema/nodes"

const nobuString = nobu().ioType("string")

export const booleanNode = nobu()
  .ioType("boolean")
  .key("boolean")
  .label("Boolean")
  .data({
    value: "boolean"
  })
  .addTargetSocket({
    key: "value",
    type: "boolean",
    label: "Value"
  })
  .addSourceSocket({
    key: "output",
    type: "boolean",
    label: "Output"
  })
  .build()

export const notBooleanNode = nobu()
  .ioType("boolean")
  .key("not_boolean")
  .label("Not Boolean")
  .data({
    value: "boolean"
  })
  .addTargetSocket({
    key: "value",
    type: "boolean",
    label: "Value"
  })
  .addSourceSocket({
    key: "output",
    type: "boolean",
    label: "Output"
  })
  .build()

export const andBooleanNode = nobu()
  .ioType("boolean")
  .key("and_boolean")
  .label("And Boolean")
  .data({
    value1: "boolean",
    value2: "boolean"
  })
  .addTargetSocket({
    key: "value1",
    type: "boolean",
    label: "First Value"
  })
  .addTargetSocket({
    key: "value2",
    type: "boolean",
    label: "Second Value"
  })
  .addSourceSocket({
    key: "output",
    type: "boolean",
    label: "Output"
  })
  .build()

export const orBooleanNode = nobu()
  .ioType("boolean")
  .key("or_boolean")
  .label("Or Boolean")
  .data({
    value1: "boolean",
    value2: "boolean"
  })
  .addTargetSocket({
    key: "value1",
    type: "boolean",
    label: "First Value"
  })
  .addTargetSocket({
    key: "value2",
    type: "boolean",
    label: "Second Value"
  })
  .addSourceSocket({
    key: "output",
    type: "boolean",
    label: "Output"
  })
  .build()

export const xorBooleanNode = nobu()
  .ioType("boolean")
  .key("xor_boolean")
  .label("Xor Boolean")
  .data({
    value1: "boolean",
    value2: "boolean"
  })
  .addTargetSocket({
    key: "value1",
    type: "boolean",
    label: "First Value"
  })
  .addTargetSocket({
    key: "value2",
    type: "boolean",
    label: "Second Value"
  })
  .addSourceSocket({
    key: "output",
    type: "boolean",
    label: "Output"
  })
  .build()

export const nandBooleanNode = nobu()
  .ioType("boolean")
  .key("nand_boolean")
  .label("Nand Boolean")
  .data({
    value1: "boolean",
    value2: "boolean"
  })
  .addTargetSocket({
    key: "value1",
    type: "boolean",
    label: "First Value"
  })
  .addTargetSocket({
    key: "value2",
    type: "boolean",
    label: "Second Value"
  })
  .addSourceSocket({
    key: "output",
    type: "boolean",
    label: "Output"
  })
  .build()

export const norBooleanNode = nobu()
  .ioType("boolean")
  .key("nor_boolean")
  .label("Nor Boolean")
  .data({
    value1: "boolean",
    value2: "boolean"
  })
  .addTargetSocket({
    key: "value1",
    type: "boolean",
    label: "First Value"
  })
  .addTargetSocket({
    key: "value2",
    type: "boolean",
    label: "Second Value"
  })
  .addSourceSocket({
    key: "output",
    type: "boolean",
    label: "Output"
  })
  .build()
