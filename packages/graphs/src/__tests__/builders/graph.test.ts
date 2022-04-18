import { graphBuilder } from "../../builders/graph"
import { inputsNodeBuilder, outputsNodeBuilder, reverseStringNodeBuilder } from "../../builders/node"
import reverseStringGraph from '../data/graphs/reverseStringGraph.json'

describe('Graph builder capabilities', () => {
  it('Should match basic json graph', () => {
    const graph = graphBuilder()
      .addInput({
        id: "username",
        type: "string",
        required: true
      })
      .addOutput({
        id: "username",
        type: "string",
        required: true
      })
      .addOutput({
        id: "normalUsername",
        type: "string"
      })
      .addNode(
        inputsNodeBuilder()
          .sources([
            {
              id: "username",
              label: "user name",
              type: "string"
            }
          ])
          .position({
            x: 0,
            y: 0
          })
          .build()
      )
      .addNode(
        reverseStringNodeBuilder()
          .id("reverse_string_1")
          .position({
            x: 100,
            y: 0
          })
          .build()
      )
      .addNode(
        reverseStringNodeBuilder()
          .id("reverse_string_2")
          .position({
            x: 100,
            y: 150
          })
          .build()
      )
      .addNode(
        reverseStringNodeBuilder()
          .id("reverse_string_3")
          .position({
            x: 200,
            y: 150
          })
          .build()
      )
      .addNode(
        outputsNodeBuilder()
          .position({
            x: 250,
            y: 100
          })
          .targets([
            {
              id: "username",
              label: "reversed name",
              type: "string"
            },
            {
              id: "normalUsername",
              label: "normal username",
              type: "string"
            }
          ])
          .build()
      )
      .addEdge({
        id: "username_input_to_reverse_string_1",
        type: "string",
        source: "inputs",
        target: "reverse_string_1",
        sourceSocket: "username",
        targetSocket: "input"
      })
      .addEdge({
        id: "username_input_to_reverse_string_2",
        type: "string",
        source: "inputs",
        target: "reverse_string_2",
        sourceSocket: "username",
        targetSocket: "input"
      })
      .addEdge({
        id: "reverse_string_2_to_reverse_string_3",
        type: "string",
        source: "reverse_string_2",
        target: "reverse_string_3",
        sourceSocket: "result",
        targetSocket: "input"
      })
      .addEdge({
        id: "reverse_string_3_to_outputs",
        type: "string",
        source: "reverse_string_3",
        target: "outputs",
        sourceSocket: "result",
        targetSocket: "normalUsername"
      })
      .addEdge({
        id: "reverse_string_to_outputs",
        type: "string",
        source: "reverse_string_1",
        target: "outputs",
        sourceSocket: "result",
        targetSocket: "username"
      })
      .build()

    expect(graph).toEqual(reverseStringGraph)

  })
})