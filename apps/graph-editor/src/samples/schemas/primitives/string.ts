import { nodeBuilder as nobu } from "../../../builders/Schema/nodes"

const nobuString = nobu().ioType("string")

export const stringNode = nobu()
  .ioType("string")
  .key("string")
  .label("String")
  .data({
    value: "string"
  })
  .addTargetSocket({
    key: "value",
    type: "string",
    label: "Value"
  })
  .addSourceSocket({
    key: "output",
    type: "string",
    label: "Output"
  })
  .build()

export const joinStringNode = nobuString
  .key("join_string")
  .label("Join String")
  .data({
    string1: "string",
    string2: "string"
  })
  .addTargetSocket({
    key: "string1",
    label: "First String",
    type: "string"
  })
  .addTargetSocket({
    key: "string2",
    label: "Second String",
    type: "string"
  })
  .addSourceSocket({
    key: "output",
    label: "Output",
    type: "string"
  })
  .build()

export const reverseStringNode = nobuString
  .key("reverse_string")
  .label("Reverse string")
  .data({
    value: "string"
  })
  .addTargetSocket({
    key: "value",
    label: "Value",
    type: "string"
  })
  .addSourceSocket({
    key: "output",
    label: "Output",
    type: "string"
  })
  .build()

export const trimStringNode = nobuString
  .key("trim_string")
  .label("Trim string")
  .data({
    value: "string"
  })
  .addTargetSocket({
    key: "value",
    label: "Value",
    type: "string"
  })
  .addSourceSocket({
    key: "output",
    label: "Output",
    type: "string"
  })
  .build()

export const stringLengthNode = nobuString
  .key("string_length")
  .label("String Length")
  .ioType("string")
  .data({
    value: "string"
  })
  .addSourceSocket({
    key: "output",
    label: "Output",
    type: "number"
  })
  .addTargetSocket({
    key: "value",
    label: "Value",
    type: "string"
  })
  .build()

export const substringNode = nobuString
  .key("substring")
  .label("Substring Node")
  .data({
    value: "string",
    start: "number",
    end: "number"
  })
  .addSourceSocket({
    key: "output",
    label: "Output",
    type: "string"
  })
  .addTargetSocket({
    key: "value",
    label: "Value",
    type: "string"
  })
  .addTargetSocket({
    key: "start",
    label: "Start Index",
    type: "number"
  })
  .addTargetSocket({
    key: "end",
    label: "End Index",
    type: "number"
  })
  .build()

export const stringToLowercaseNode = nobuString
  .key("string_to_lowercase")
  .label("String to Lowercase")
  .data({
    value: "string"
  })
  .addSourceSocket({
    key: "output",
    label: "Output",
    type: "string"
  })
  .addTargetSocket({
    key: "value",
    label: "Value",
    type: "string"
  })
  .build()

export const stringToUppercaseNode = nobuString
  .key("string_to_uppercase")
  .label("String to Uppercase")
  .data({
    value: "string"
  })
  .addSourceSocket({
    key: "output",
    label: "Output",
    type: "string"
  })
  .addTargetSocket({
    key: "value",
    label: "Value",
    type: "string"
  })
  .build()

export const stringPadStartNode = nobuString
  .key("string_pad_start")
  .label("String Pad Start")
  .data({
    value: "string",
    padString: "string",
    pad: "number"
  })
  .addTargetSocket({
    key: "value",
    label: "Value",
    type: "string"
  })
  .addTargetSocket({
    key: "padString",
    label: "Pad String",
    type: "string"
  })
  .addTargetSocket({
    key: "pad",
    label: "Pad Length",
    type: "number"
  })
  .addSourceSocket({
    key: "output",
    label: "Output",
    type: "string"
  })
  .build()

export const stringPadEndNode = nobuString
  .key("string_pad_end")
  .label("String Pad End")
  .data({
    value: "string",
    padString: "string",
    pad: "number"
  })
  .addTargetSocket({
    key: "value",
    label: "Value",
    type: "string"
  })
  .addTargetSocket({
    key: "padString",
    label: "Pad String",
    type: "string"
  })
  .addTargetSocket({
    key: "pad",
    label: "Pad Length",
    type: "number"
  })
  .addSourceSocket({
    key: "output",
    label: "Output",
    type: "string"
  })
  .build()

export const stringRepeatNode = nobuString
  .key("string_repeat")
  .label("String Repeat")
  .data({
    value: "string",
    repeat: "number"
  })
  .addTargetSocket({
    key: "value",
    label: "Value",
    type: "string"
  })
  .addTargetSocket({
    key: "repeat",
    label: "Repeat Count",
    type: "number"
  })
  .addSourceSocket({
    key: "output",
    label: "Output",
    type: "string"
  })
  .build()

export const stringReplaceNode = nobuString
  .key("string_replace")
  .label("String Replace")
  .data({
    value: "string",
    search: "string",
    replace: "string"
  })
  .addTargetSocket({
    key: "value",
    label: "Value",
    type: "string"
  })
  .addTargetSocket({
    key: "search",
    label: "Search String",
    type: "string"
  })
  .addTargetSocket({
    key: "replace",
    label: "Replace String",
    type: "string"
  })
  .addSourceSocket({
    key: "output",
    label: "Output",
    type: "string"
  })
  .build()

export const stringNormalizeNode = nobuString
  .key("string_normalize")
  .label("String Normalize")
  .data({
    value: "string",
    form: "string"
  })
  .addTargetSocket({
    key: "value",
    label: "Value",
    type: "string"
  })
  .addTargetSocket({
    key: "form",
    label: "Normalization Form",
    type: "string"
  })
  .addSourceSocket({
    key: "output",
    label: "Output",
    type: "string"
  })
  .build()

export const stringStartsWithNode = nobuString
  .key("string_starts_with")
  .label("String Starts With")
  .data({
    value: "string",
    search: "string"
  })
  .addTargetSocket({
    key: "value",
    label: "Value",
    type: "string"
  })
  .addTargetSocket({
    key: "search",
    label: "Search String",
    type: "string"
  })
  .addSourceSocket({
    key: "output",
    label: "Output",
    type: "boolean"
  })
  .build()

export const stringEndsWithNode = nobuString
  .key("string_ends_with")
  .label("String Ends With")
  .data({
    value: "string",
    search: "string"
  })
  .addTargetSocket({
    key: "value",
    label: "Value",
    type: "string"
  })
  .addTargetSocket({
    key: "search",
    label: "Search String",
    type: "string"
  })
  .addSourceSocket({
    key: "output",
    label: "Output",
    type: "boolean"
  })
  .build()

export const stringIncludesNode = nobuString
  .key("string_includes")
  .label("String Includes")
  .data({
    value: "string",
    search: "string"
  })
  .addTargetSocket({
    key: "value",
    label: "Value",
    type: "string"
  })
  .addTargetSocket({
    key: "search",
    label: "Search String",
    type: "string"
  })
  .addSourceSocket({
    key: "output",
    label: "Output",
    type: "boolean"
  })
  .build()

export const stringCharCodeAtNode = nobuString
  .key("string_char_code_at")
  .label("String Char Code At")
  .data({
    value: "string",
    index: "number"
  })
  .addTargetSocket({
    key: "value",
    label: "Value",
    type: "string"
  })
  .addTargetSocket({
    key: "index",
    label: "Index",
    type: "number"
  })
  .addSourceSocket({
    key: "output",
    label: "Output",
    type: "number"
  })
  .build()

export const stringFromCharCodeNode = nobuString
  .key("string_from_char_code")
  .label("String From Char Code")
  .data({
    charCode: "number"
  })
  .addTargetSocket({
    key: "charCode",
    label: "Character Code",
    type: "number"
  })
  .addSourceSocket({
    key: "output",
    label: "Output",
    type: "string"
  })
  .build()

export const stringRawNode = nobuString
  .key("string_raw")
  .label("String Raw")
  .data({
    template: "string",
    substitutions: "array"
  })
  .addTargetSocket({
    key: "template",
    label: "Template",
    type: "string"
  })
  .addTargetSocket({
    key: "substitutions",
    label: "Substitutions",
    type: "array"
  })
  .addSourceSocket({
    key: "output",
    label: "Output",
    type: "string"
  })
  .build()