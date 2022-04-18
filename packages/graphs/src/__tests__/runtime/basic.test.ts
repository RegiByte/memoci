import reverseStringGraph from "../data/graphs/reverseStringGraph.json"
import joinStringsGraph1 from "../data/graphs/joinStringsGraph1.json"
import joinStringsGraph2 from "../data/graphs/joinStringsGraph2.json"
import { testRuntimeBuilder } from "../../builders/runtime"

describe("Basic Node Graph Tests", () => {
  it("Should reverse string based on graph runtime inputs", async () => {
    const runtime = testRuntimeBuilder(reverseStringGraph).build()

    const result = await runtime.preview({
      username: "reginaldo"
    })

    expect(result).toEqual({
      username: "odlaniger",
      normalUsername: "reginaldo"
    })

    const result1 = await runtime.preview({
      username: "rafael"
    })

    expect(result1).toEqual({
      username: "leafar",
      normalUsername: "rafael"
    })
  })

  it("Should join strings based on input and manual string node", async () => {
    const runtime = testRuntimeBuilder(joinStringsGraph1).build()

    const result = await runtime.preview({
      name: "reginaldo"
    })
    expect(result).toEqual({
      name: "reginaldo hi!"
    })
  })

  it("Should join strings based on input", async () => {
    const runtime = testRuntimeBuilder(joinStringsGraph2).build()

    const result = await runtime.preview({
      name: "reginaldo",
      lastName: " junior"
    })

    expect(result).toEqual({
      name: "reginaldo junior"
    })
  })
})
