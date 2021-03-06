import { nodeBuilder } from "../../builders/Schema/nodes"
import { RuntimeSchema } from "../../types/RuntimeSchema"
import { createBundleman } from "./bundleman"
import {
  joinStringNode,
  reverseStringNode,
  stringCharCodeAtNode,
  stringEndsWithNode,
  stringFromCharCodeNode,
  stringIncludesNode,
  stringNode,
  stringPadEndNode,
  stringPadStartNode,
  stringRawNode,
  stringRepeatNode,
  stringReplaceNode,
  stringStartsWithNode,
  stringToLowercaseNode,
  stringToUppercaseNode,
  substringNode,
  trimStringNode
} from "./primitives/string"
import {
  addNumberNode,
  numberNode,
  subtractNumberNode
} from "./primitives/number"
import {
  andBooleanNode,
  booleanNode,
  notBooleanNode,
  orBooleanNode
} from "./primitives/boolean"
import { parseJsonNode, pathJsonNode, stringifyJsonNode } from "./primitives/json"

let nobu = nodeBuilder()

export const stringNodesBundle: Partial<RuntimeSchema> = {
  edges: [
    {
      key: "string",
      label: "String Edge",
      data: {
        value: "string"
      }
    }
  ],
  nodes: [
    stringNode,
    joinStringNode,
    reverseStringNode,
    trimStringNode,
    substringNode,
    stringToLowercaseNode,
    stringToUppercaseNode,
    stringPadStartNode,
    stringPadEndNode,
    stringRepeatNode,
    stringReplaceNode,
    stringStartsWithNode,
    stringEndsWithNode,
    stringIncludesNode,
    stringCharCodeAtNode,
    stringFromCharCodeNode,
    stringRawNode
  ]
}

export const stringBundleman = createBundleman(stringNodesBundle)

export const numberNodesBundle: Partial<RuntimeSchema> = {
  edges: [
    {
      key: "number",
      label: "Number Edge",
      data: {
        value: "number"
      }
    }
  ],
  nodes: [numberNode, addNumberNode, subtractNumberNode]
}

export const numberBundleman = createBundleman(numberNodesBundle)

export const booleanNodesBundle: Partial<RuntimeSchema> = {
  edges: [
    {
      key: "boolean",
      label: "Boolean Edge",
      data: {
        value: "boolean"
      }
    }
  ],
  nodes: [booleanNode, notBooleanNode, andBooleanNode, orBooleanNode]
}

export const booleanBundleman = createBundleman(booleanNodesBundle)

export const jsonNodesBundle: Partial<RuntimeSchema> = {
  edges: [
    {
      key: "json",
      label: "Json Edge",
      data: {
        value: "json"
      }
    }
  ],
  nodes: [
    parseJsonNode,
    stringifyJsonNode,
    pathJsonNode,
  ]
}

export const jsonBundleman = createBundleman(jsonNodesBundle)
