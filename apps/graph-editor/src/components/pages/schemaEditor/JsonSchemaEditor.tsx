import React from "react"
import Editor from "@monaco-editor/react"
import { RuntimeSchema } from "../../../types/RuntimeSchema"
import * as monaco from "monaco-editor"

interface JsonSchemaEditorProps {
  schema: RuntimeSchema
  onEditorChange: (
    value: string | undefined,
    ev: monaco.editor.IModelContentChangedEvent
  ) => void
}

function JsonSchemaEditor({ schema, onEditorChange }: JsonSchemaEditorProps) {
  return (
    <Editor
      defaultLanguage="json"
      height="700px"
      value={JSON.stringify({
        $schema: 'https://regibyte.github.io/memoci/schemas/RuntimeSchema.json',
        ...schema
      }, null, 2)}
      onChange={onEditorChange}
    />
  )
}

export default JsonSchemaEditor
