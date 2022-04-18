import nodeBuilder from "../../builders/node"
import { socketBuilder } from "../../builders/socket"

describe("Socket builders", () => {
  it("Should create string socket", () => {
    const stringSocket = nodeBuilder.string
      .id("stringNode")
      .data({
        value: "hiiii"
      })
      .position({
        x: 69,
        y: 420
      })
      .build()

    expect(stringSocket).toEqual({
      id: "stringNode",
      type: "string",
      data: {
        value: "hiiii"
      },
      targets: [],
      sources: [socketBuilder.string.id("value").label("value").build()],
      position: {
        x: 69,
        y: 420
      }
    })
  })

  it("Should create inputs socket", () => {
    const inputsNode = nodeBuilder.inputs
      .id("inputsNode")
      .position({
        x: 69,
        y: 420
      })
      .source({
        id: "name",
        type: "string",
        label: "name"
      })
      .build()

    expect(inputsNode).toEqual({
      id: "inputsNode",
      type: "inputs",
      data: {},
      targets: [],
      sources: [socketBuilder.string.id("name").label("name").build()],
      position: {
        x: 69,
        y: 420
      }
    })
  })
})
