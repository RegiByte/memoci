import { graphBuilder } from "../../builders/Schema/graph"
import { GraphNode } from "../../types/GraphSchema"
import { stringBundleman } from "../../samples/schemas/nodesBundles"
import { IoAttribute } from "../../types/RuntimeSchema"
import { PathFinder } from "../graphPathfinder"

describe("BFS Pathfinder", () => {
  it("Should iterate through graph", () => {
    const graph = graphBuilder()
      .key("nice_graph")
      .title("Nice graph")
      .addNodes([
        stringBundleman.graphNode.string!.key("string1").build(),
        stringBundleman.graphNode.string!.key("string2").build(),
        stringBundleman.graphNode.join_string!.key("join_string").build(),
        stringBundleman.graphNode.reverse_string!.key("reverse_string").build()
      ])
      .addEdges([
        {
          key: "string1_join_string",
          type: "string",
          source: "string1",
          target: "join_string",
          sourceSocket: "output",
          targetSocket: "string1"
        },
        {
          key: "string2_join_string",
          type: "string",
          source: "string2",
          target: "join_string",
          sourceSocket: "output",
          targetSocket: "string2"
        },
        {
          key: "join_string_to_reverse_string",
          type: "string",
          source: "join_string",
          target: "reverse_string",
          sourceSocket: "output",
          targetSocket: "value"
        }
      ])
      .build()

    PathFinder<IoAttribute>("string1", graph, (nodeKey: string, node: GraphNode) => {
      return null
    })
    expect(true).toBe(false)
  })
})
