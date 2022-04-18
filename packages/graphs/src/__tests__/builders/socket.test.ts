import { socketBuilder, SocketBuilder, sourceSocketBuilder } from "../../builders/socket"

describe("Socket builders", () => {
  it("Should create string socket", () => {
    const stringSocket = (socketBuilder.string as SocketBuilder)
      .id("stringSocket")
      .build()

    expect(stringSocket).toEqual({
      id: "stringSocket",
      type: "string",
      label: "basic",
      direction: "source"
    })

    const stringSocket2 = socketBuilder.string
      .id("stringSocket2")
      .target()
      .label("test label")
      .build()

    expect(stringSocket2).toEqual({
      id: "stringSocket2",
      direction: "target",
      label: "test label",
      type: "string"
    })

    const sourceSocket = sourceSocketBuilder.string
      .id("sourceStringSocket")
      .label("source socket")
      .build()

    expect(sourceSocket).toEqual({
      id: "sourceStringSocket",
      label: "source socket",
      direction: "source",
      type: "string"
    })
  })
})
