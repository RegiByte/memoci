import React, { useState } from "react"
import { RuntimeSchema } from "../../../types/RuntimeSchema"
import { UseFormReturn } from "react-hook-form"
import { SchemaEditorForm } from "./index"
import MarkdownBlock from "../../UI/MarkdownBlock"
import { Icons } from "ui"
import NodeSchemaVisualEditor from "./NodeSchemaVisualEditor"

interface Props {
  schema: RuntimeSchema
  setSchema: any
  form: UseFormReturn<SchemaEditorForm, any>
}

function VisualSchemaEditor({ schema, setSchema, form }: Props) {
  const [editingTitle, setEditingTitle] = useState(false)
  const [editingDescription, setEditingDescription] = useState(false)
  const toggleEditingTitle = () => setEditingTitle(current => !current)
  const toggleEditingDescription = () =>
    setEditingDescription(current => !current)

  return (
    <div className="flex w-full flex-col">
      {editingTitle ? (
        <form
          className="flex gap-4"
          onSubmit={form.handleSubmit(data => {
            setSchema(data.schema)
            toggleEditingTitle()
          })}
        >
          <input
            className="min-w-[400px] rounded-lg py-2 px-2 text-2xl shadow-md"
            placeholder="Title of your schema here..."
            type="text"
            {...form.register("schema.title")}
          />

          <div className="flex justify-end">
            <button
              className={`my-4 rounded-xl bg-sky-400 py-2 px-4 text-2xl font-bold
          text-white shadow-md transition-all hover:scale-105 hover:bg-sky-500`}
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <div
          className="flex cursor-pointer items-center gap-4"
          onClick={toggleEditingTitle}
        >
          <h1 className="text-3xl text-slate-500 underline">
            {schema.title || "Untitled Schema"}
          </h1>

          <button
            className={`my-4 flex items-center gap-2 rounded-xl bg-sky-400 py-2
          px-4 text-2xl font-bold text-white shadow-md transition-all hover:scale-105 hover:bg-sky-500`}
          >
            Edit Title <Icons.Edit />
          </button>
        </div>
      )}

      {editingDescription ? (
        <form
          className="my-2 flex flex-col py-4"
          onSubmit={form.handleSubmit(data => {
            setSchema(data.schema)
            toggleEditingDescription()
          })}
        >
          <textarea
            autoFocus
            className="min-w-[600px] rounded-lg py-4 px-2 text-2xl shadow-md"
            placeholder="Describe your schema here..."
            {...form.register("schema.description")}
          />

          <div className="flex justify-end">
            <button
              className={`my-4 rounded-xl bg-sky-400 py-2 px-4 text-2xl font-bold
          text-white shadow-md transition-all hover:scale-105 hover:bg-sky-500`}
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col">
          {schema.description && (
            <MarkdownBlock>{schema.description}</MarkdownBlock>
          )}
          <div className={"flex justify-start"}>
            <button
              className={`my-4 flex items-center gap-4 rounded-xl bg-sky-400 py-2
          px-4 text-2xl font-bold text-white shadow-md transition-all hover:scale-105 hover:bg-sky-500`}
              onClick={() => toggleEditingDescription()}
            >
              Edit Description <Icons.Edit />
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 py-4">
        <h2 className="text-3xl text-zinc-500">Nodes:</h2>
        <div className="flex w-full flex-wrap items-start gap-4">
          {([...schema.nodes])
            .sort((nodeA, nodeB) => {
              return (
                nodeA.targets.length +
                nodeA.sources.length -
                (nodeB.targets.length + nodeB.sources.length)
              )
            })
            .map(node => {
              return (
                <NodeSchemaVisualEditor
                  form={form}
                  key={node.key}
                  node={node}
                  setSchema={setSchema}
                />
              )
            })}
        </div>
      </div>

      <div className="flex flex-col gap-4 py-4">
        <h2 className="text-3xl text-zinc-500">Edges:</h2>
        <div className="flex w-full flex-wrap gap-4">
          {schema.edges.map(edge => (
            <div
              className="flex flex-col rounded-2xl bg-slate-200 p-4 shadow-md"
              key={edge.key}
            >
              <span>Key: {edge.key}</span>
              <span>Label: {edge.label}</span>
              <span>Data: {JSON.stringify(edge.data)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VisualSchemaEditor
