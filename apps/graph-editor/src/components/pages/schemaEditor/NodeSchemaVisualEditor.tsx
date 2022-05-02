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
  form?: UseFormReturn<SchemaEditorForm, any>
  setSchema: any
  onClick?: any
}

interface SocketFieldProps extends NodeSocketSchema, NodeSchemaEditorProps {
  direction: NodeSocketDirection
}

const SocketRow = TwDummy("flex w-full items-center py-2 px-2 pointer-events-none").div

const SocketBubbleContainer = TwDummy("px-2 ").div
const SocketBubble = TwDummy("h-[45px] w-[45px] inline-block rounded-full").as(
  (props: any) => (
    <span {...props} style={{ background: `var(--io-${props.type}-color)` }} />
  )
)

function StringSocketField(props: SocketFieldProps) {
  const isSource = props.direction === "source"

  const socketBubble = (
    <SocketBubbleContainer>
      <SocketBubble type={props.type} />
    </SocketBubbleContainer>
  )

  return (
    <SocketRow>
      {!isSource && (
        <>
          {socketBubble}

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
          {socketBubble}
        </>
      )}
    </SocketRow>
  )
}

function NumberSocketField(props: SocketFieldProps) {
  const isSource = props.direction === "source"

  const socketBubble = (
    <SocketBubbleContainer>
      <SocketBubble type={props.type} />
    </SocketBubbleContainer>
  )

  return (
    <SocketRow>
      {!isSource && (
        <>
          {socketBubble}
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
          {socketBubble}
        </>
      )}
    </SocketRow>
  )
}

function ImageSocketField(props: SocketFieldProps) {
  const isSource = props.direction === "source"

  const socketBubble = (
    <SocketBubbleContainer>
      <SocketBubble type={props.type} />
    </SocketBubbleContainer>
  )

  return (
    <SocketRow>
      {!isSource && (
        <>
          {socketBubble}

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
          {socketBubble}
        </>
      )}
    </SocketRow>
  )
}

function JsonSocketField(props: SocketFieldProps) {
  const isSource = props.direction === "source"
  const socketBubble = (
    <SocketBubbleContainer>
      <SocketBubble type={props.type} />
    </SocketBubbleContainer>
  )
  return (
    <SocketRow>
      {!isSource && (
        <>
          {socketBubble}

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
          {socketBubble}
        </>
      )}
    </SocketRow>
  )
}

function BooleanSocketField(props: SocketFieldProps) {
  const isSource = props.direction === "source"
  const socketBubble = (
    <SocketBubbleContainer>
      <SocketBubble type={props.type} />
    </SocketBubbleContainer>
  )
  return (
    <SocketRow>
      {!isSource && (
        <>
          {socketBubble}

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
          {socketBubble}
        </>
      )}
    </SocketRow>
  )
}

function ArraySocketField(props: SocketFieldProps) {
  const isSource = props.direction === "source"
  const socketBubble = (
    <SocketBubbleContainer>
      <SocketBubble type={props.type} />
    </SocketBubbleContainer>
  )
  return (
    <SocketRow>
      {!isSource && (
        <>
          {socketBubble}

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
          {socketBubble}
        </>
      )}
    </SocketRow>
  )
}

function AnySocketField(props: SocketFieldProps) {
  const isSource = props.direction === "source"

  const socketBubble = (
    <SocketBubbleContainer>
      <SocketBubble type={props.type} />
    </SocketBubbleContainer>
  )

  return (
    <SocketRow>
      {!isSource && (
        <>
          {socketBubble}
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
          {socketBubble}
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
  any: AnySocketField,
  csv_collection: AnySocketField,
  csv_transform: AnySocketField,
  json_collection: AnySocketField,
  json_transform: AnySocketField
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
  form,
  onClick
}: NodeSchemaEditorProps) {
  const theme = {
    "--io-string-color": "var(--tw-color-blue-500)",
    "--io-number-color": "var(--tw-color-lime-500)",
    "--io-boolean-color": "var(--tw-color-red-500)",
    "--io-json-color": "var(--tw-color-amber-500)",
    "--io-array-color": "var(--tw-color-sky-400)",
    "--io-image-color": "var(--tw-color-purple-500)"
  }

  return (
    <div
      style={{ ...theme, borderColor: `var(--io-${node.ioType}-color)` }}
      className={`bg-white-500 flex min-w-[250px] max-w-[300px] cursor-pointer flex-col 
      rounded-xl border-2 transition-all hover:scale-105`}
      onClick={onClick}
    >
      <div
        className="flex items-center justify-center border-b-2 px-2 py-4"
        style={{
          borderColor: `var(--io-${node.ioType}-color)`
        }}
      >
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
