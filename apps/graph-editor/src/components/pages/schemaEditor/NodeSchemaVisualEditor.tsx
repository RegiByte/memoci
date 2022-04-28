import React from "react"
import {
  IoAttribute,
  NodeSchema,
  NodeSocketDirection,
  NodeSocketSchema
} from "../../../types/RuntimeSchema"
import { UseFormReturn } from "react-hook-form"
import { SchemaEditorForm } from "./index"
import { TwDummy } from "../../UI/TwDummy"

interface NodeSchemaEditorProps {
  node: NodeSchema<any>
  form: UseFormReturn<SchemaEditorForm, any>
  setSchema: any
}

interface SocketFieldProps extends NodeSocketSchema, NodeSchemaEditorProps {
  direction: NodeSocketDirection
}

const SocketRow = TwDummy("flex w-full items-center py-2 px-2 pointer-events-none").div

const SocketBubbleContainer = TwDummy("px-2 ").div
const SocketBubble = TwDummy("h-[45px] w-[45px] inline-block rounded-full").span

function StringSocketField(props: SocketFieldProps) {
  const isSource = props.direction === "source"

  return (
    <SocketRow>
      {!isSource && (
        <>
          <SocketBubbleContainer>
            <SocketBubble className="bg-sky-400" />
          </SocketBubbleContainer>

          <input
            disabled
            className="pointer-events-none w-4/5 flex-1 rounded-xl px-2 shadow-md"
            placeholder={props.label}
            type="text"
          />
        </>
      )}

      {isSource && (
        <>
          <h2 className="flex-1 text-right">{props.label}</h2>
          <SocketBubbleContainer>
            <SocketBubble className="bg-sky-400" />
          </SocketBubbleContainer>
        </>
      )}
    </SocketRow>
  )
}

function NumberSocketField(props: SocketFieldProps) {
  const isSource = props.direction === "source"

  return (
    <SocketRow>
      {!isSource && (
        <>
          <SocketBubbleContainer>
            <SocketBubble className="bg-lime-400" />
          </SocketBubbleContainer>
          <input
            disabled
            className="pointer-events-none w-4/5 flex-1 rounded-xl px-2 shadow-md"
            placeholder={props.label}
            type="text"
          />
        </>
      )}

      {isSource && (
        <>
          <h2 className="flex-1 text-right">{props.label}</h2>
          <SocketBubbleContainer>
            <SocketBubble className="bg-lime-400" />
          </SocketBubbleContainer>
        </>
      )}
    </SocketRow>
  )
}

function ImageSocketField(props: SocketFieldProps) {
  const isSource = props.direction === "source"

  return (
    <SocketRow>
      {!isSource && (
        <>
          <SocketBubbleContainer>
            <SocketBubble className="bg-pink-400" />
          </SocketBubbleContainer>
          <input
            disabled
            className="pointer-events-none w-4/5 flex-1 rounded-xl px-2 shadow-md"
            placeholder={props.label}
            type="text"
          />
        </>
      )}

      {isSource && (
        <>
          <h2 className="flex-1 text-right">{props.label}</h2>
          <SocketBubbleContainer>
            <SocketBubble className="bg-pink-400" />
          </SocketBubbleContainer>
        </>
      )}
    </SocketRow>
  )
}

function JsonSocketField(props: SocketFieldProps) {
  const isSource = props.direction === "source"

  return (
    <SocketRow>
      {!isSource && (
        <>
          <SocketBubbleContainer>
            <SocketBubble className="bg-amber-400" />
          </SocketBubbleContainer>
          <input
            disabled
            className="pointer-events-none w-4/5 flex-1 rounded-xl px-2 shadow-md"
            placeholder={props.label}
            type="text"
          />
        </>
      )}

      {isSource && (
        <>
          <h2 className="flex-1 text-right">{props.label}</h2>
          <SocketBubbleContainer>
            <SocketBubble className="bg-amber-400" />
          </SocketBubbleContainer>
        </>
      )}
    </SocketRow>
  )
}

function BooleanSocketField(props: SocketFieldProps) {
  const isSource = props.direction === "source"

  return (
    <SocketRow>
      {!isSource && (
        <>
          <SocketBubbleContainer>
            <SocketBubble className="bg-red-500" />
          </SocketBubbleContainer>
          <input
            disabled
            className="pointer-events-none w-4/5 flex-1 rounded-xl px-2 shadow-md"
            placeholder={props.label}
            type="text"
          />
        </>
      )}

      {isSource && (
        <>
          <h2 className="flex-1 text-right">{props.label}</h2>
          <SocketBubbleContainer>
            <SocketBubble className="bg-red-500" />
          </SocketBubbleContainer>
        </>
      )}
    </SocketRow>
  )
}

function ArraySocketField(props: SocketFieldProps) {
  const isSource = props.direction === "source"

  return (
    <SocketRow>
      {!isSource && (
        <>
          <SocketBubbleContainer>
            <SocketBubble className="bg-purple-400" />
          </SocketBubbleContainer>
          <input
            disabled
            className="pointer-events-none w-4/5 flex-1 rounded-xl px-2 shadow-md"
            placeholder={props.label}
            type="text"
          />
        </>
      )}

      {isSource && (
        <>
          <h2 className="flex-1 text-right">{props.label}</h2>
          <SocketBubbleContainer>
            <SocketBubble className="bg-purple-400" />
          </SocketBubbleContainer>
        </>
      )}
    </SocketRow>
  )
}

function AnySocketField(props: SocketFieldProps) {
  const isSource = props.direction === "source"

  return (
    <SocketRow>
      {!isSource && (
        <>
          <SocketBubbleContainer>
            <SocketBubble className="bg-zinc-300" />
          </SocketBubbleContainer>
          <input
            disabled
            className="pointer-events-none w-4/5 flex-1 rounded-xl px-2 shadow-md"
            placeholder={props.label}
            type="text"
          />
        </>
      )}

      {isSource && (
        <>
          <h2 className="flex-1 text-right">{props.label}</h2>
          <SocketBubbleContainer>
            <SocketBubble className="bg-amber-400" />
          </SocketBubbleContainer>
        </>
      )}
    </SocketRow>
  )
}

const socketFields: Record<IoAttribute, React.FC<SocketFieldProps>> = {
  string: StringSocketField,
  number: NumberSocketField,
  image: ImageSocketField,
  json: JsonSocketField,
  boolean: BooleanSocketField,
  array: ArraySocketField,
  any: AnySocketField
}

function SocketField(props: SocketFieldProps) {
  if (!socketFields[props.type]) {
    return <div>invalid socket</div>
  }

  const Field = socketFields[props.type]

  return <Field {...props} />
}

function NodeSchemaVisualEditor({
  node,
  setSchema,
  form
}: NodeSchemaEditorProps) {
  return (
    <div
      className={`bg-white-500 flex min-w-[250px] max-w-[300px] cursor-pointer flex-col 
      rounded-xl border-2 border-sky-400 transition-all hover:scale-105`}
    >
      <div className="flex items-center justify-center border-b-2 border-sky-400 px-2 py-4">
        <h2>{node.label || "Untitled node"}</h2>
      </div>
      <div className="flex-col">
        <div className="flex flex-col">
          {node.sources.map(source => (
            <SocketField
              {...source}
              direction="source"
              form={form}
              key={source.key}
              node={node}
              setSchema={setSchema}
            />
          ))}
        </div>
        <div className="flex flex-col">
          {node.targets.map(target => (
            <SocketField
              {...target}
              direction="target"
              form={form}
              key={target.key}
              node={node}
              setSchema={setSchema}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default NodeSchemaVisualEditor
