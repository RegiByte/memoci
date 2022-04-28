import { nodeBuilder as nobu } from "../../../builders/Schema/nodes"

const nobuNumber = nobu().ioType("number")

export const numberNode = nobuNumber
  .key("number")
  .label("Number")
  .data({
    value: "number"
  })
  .addTargetSocket({
    key: "value",
    label: "Value",
    type: "number"
  })
  .addSourceSocket({
    key: "output",
    label: "Output",
    type: "number"
  })
  .build()

export const addNumberNode = nobuNumber
  .key("add_number")
  .label("Add Number")
  .data({
    number1: "number",
    number2: "number"
  })
  .addTargetSocket({
    key: "number1",
    label: "First Number",
    type: "number"
  })
  .addTargetSocket({
    key: "number2",
    label: "Second Number",
    type: "number"
  })
  .addSourceSocket({
    key: "output",
    label: "Output",
    type: "number"
  })
  .build()

export const subtractNumberNode = nobuNumber
  .key("subtract_number")
  .label("Subtract Number")
  .data({
    number1: "number",
    number2: "number",
    total: "number"
  })
  .addTargetSocket({
    key: "number1",
    label: "First Number",
    type: "number"
  })
  .addTargetSocket({
    key: "number2",
    label: "Second Number",
    type: "number"
  })
  .addSourceSocket({
    key: "output",
    label: "Output",
    type: "number"
  })
  .build()
