import { Tab } from "@headlessui/react"
import React, { Suspense, useCallback, useEffect, useMemo } from "react"
import { Icons } from "ui"
import { createTabStore } from "../../../store/creators/tabs"
import { RuntimeSchema } from "../../../types/RuntimeSchema"
import create, { Mutate } from "zustand"
import * as monaco from "monaco-editor"
import VisualSchemaEditor from "./VisualSchemaEditor"
import { collect } from "collect.js"
import { TwDummy } from "../../UI/TwDummy"
import { useForm } from "react-hook-form"
import JsonSchemaEditor from "./JsonSchemaEditor"
import {
  SampleSelector,
  SampleSelectorItem,
  SampleSelectorParams
} from "../../wrappers/SampleSelector"
import { getPrimitivesDocs, schemas } from "../../../samples/schemas/primitives"
import { $string, ellipsis } from "../../../utils/string"
import {
  numberBundleman,
  stringBundleman
} from "../../../samples/schemas/nodesBundles"
import { schemaBuilder } from "../../../builders/Schema"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import {
  useAppStorage,
  useStorageDirFiles,
  useStorageResource
} from "../../wrappers/AppStorage/hooks"
import { kebabCase } from "memo-utils"
import dayjs from "dayjs"

const useSchemaEditorTabStore = createTabStore(["visual", "json"])

const Card = TwDummy(`shadow-md rounded-2xl bg-white p-4`).as(Tab.Panel)
let EditorActionBase =
  TwDummy<any>(`flex items-center gap-2 rounded-2xl bg-white p-4 
          text-2xl shadow-2xl transition-transform hover:scale-110`)
const EditorTab = EditorActionBase.as(Tab)
const EditorAction = EditorActionBase.button

/*{
  key: "untitled_schema",
  title: "Untitled schema",
  description: "Yay! 🎉 My first schema",
  edges: [stringBundleman.edge.string, numberBundleman.edge.number],
  nodes: [stringBundleman.node.string, numberBundleman.node.number],
  ioAttributes: ["string", "number"]
}*/

const defaultJsonSchema = schemaBuilder()
  .key("untitled_schema")
  .title("Untitled schema")
  .description("Yay! 🎉 My first schema")
  .setIoAttributes(['string', 'number'])
  .addNode(stringBundleman.node.string)
  .addNode(numberBundleman.node.number)
  .addEdge(stringBundleman.edge.string)
  .addEdge(numberBundleman.edge.number)
  .build()

const defaultJsonCode = JSON.stringify(defaultJsonSchema, null, 2)

interface SchemaStore {
  schema: RuntimeSchema
  schemaJson: string

  setSchema(newSchema: Partial<RuntimeSchema> | Mutate<RuntimeSchema, []>): void

  onEditorChange(
    newSchema: string | undefined,
    ev: monaco.editor.IModelContentChangedEvent
  ): void

  resetSchemaToDefault(): void
}

const useSchemaStore = create<SchemaStore>((set, get) => ({
  schema: defaultJsonSchema as any,
  schemaJson: defaultJsonCode,

  resetSchemaToDefault() {
    set({
      schema: defaultJsonSchema,
      schemaJson: defaultJsonCode
    })
  },

  setSchema(newSchema: Partial<RuntimeSchema> | Mutate<RuntimeSchema, []>) {
    set(current => {
      let original = collect<RuntimeSchema>(current.schema)

      if (typeof newSchema === "function") {
        return {
          schema: original.merge((newSchema as any)(current.schema)).all()
        }
      }

      let merged = original.merge(newSchema)
      let all = merged.all()

      return {
        schema: all as any
      }
    })
  },
  onEditorChange(newSchema, ev) {
    try {
      set({
        schema: JSON.parse(newSchema ?? JSON.stringify({})),
        schemaJson: newSchema
      })
    } catch (e) {
      set({
        schemaJson: newSchema
      })
    }
  }
}))

export interface SchemaEditorForm {
  schema: RuntimeSchema
}

interface SchemaEditorProps extends SampleSelectorParams {
  schema?: Partial<RuntimeSchema>
  path?: string
}

function SchemaEditor(props: SchemaEditorProps) {
  const tabStore = useSchemaEditorTabStore()
  const { schema, setSchema, onEditorChange, resetSchemaToDefault } =
    useSchemaStore()
  const dirFiles = useStorageDirFiles("schemas")
  const { putResource } = useAppStorage()

  const form = useForm<SchemaEditorForm>({
    defaultValues: {
      schema
    }
  })

  let location = useLocation()

  React.useEffect(() => {
    if (location.pathname === "/schemas/create") {
      resetSchemaToDefault()
    }
  }, [location])

  const { schema: fileSchema, path: filePath } = props

  useEffect(() => {
    if (fileSchema && filePath) {
      setSchema(fileSchema)
    }
  }, [fileSchema, filePath])

  const onSelectSample = useCallback(
    (ev: any) => {
      ev.preventDefault()

      props
        .selectSample(
          schemas.map(sampleSchema => ({
            description: sampleSchema.description,
            key: sampleSchema.key,
            title: sampleSchema.title,
            content: JSON.stringify(sampleSchema, null, 2)
          }))
        )
        .then(result => {
          if (result) {
            let schemaContent = JSON.parse(result.content)
            let updatedSchema = {
              ...schemaContent,
              key: schema.key,
              title: schema.title,
              description: schema.description
            }
            setSchema(updatedSchema)
            form.setValue(`schema`, updatedSchema)
          }
        })
    },
    [schema]
  )

  const onSave = useCallback(() => {
    if (!schema.title || schema.title.toLowerCase() === "untitled schema") {
      alert("Missing schema title!")
      return
    }

    let newFilePath = `${dayjs().format("DD-MM-YYYY")}--${
      $string(schema.title).slugify().s
    }.json`

    let resolvedFilePath = filePath ? filePath + ".json" : undefined

    putResource
      .schemas(resolvedFilePath ?? newFilePath, JSON.stringify(schema, null, 2))
      .then(result => console.log({ result }))
  }, [dirFiles, schema, filePath])

  useEffect(() => {
    form.setValue("schema", schema)
    form.setValue("schema.key", kebabCase(schema.title)!)
  }, [schema])

  const title = form.watch("schema.title")

  useEffect(() => {
    form.setValue("schema.key", kebabCase(title)!)
  }, [title])

  const navigate = useNavigate()

  return (
    <>
      <div className="container mx-auto">
        <Tab.Group
          selectedIndex={tabStore.selectedIndex}
          onChange={tabStore.setSelectedIndex}
        >
          <Tab.List className="mx-40 mt-10 flex items-center gap-4">
            <EditorAction onClick={() => navigate("/")}>
              <span>Go Back</span>
              <Icons.ArrowBack className="text-sky-400" />
            </EditorAction>
            <EditorTab>
              Visual <Icons.Forms className="text-sky-400" />
            </EditorTab>
            <EditorTab>
              JSON <Icons.Braces className="text-blue-400" />
            </EditorTab>
            <div className="flex-1" />
            <EditorAction onClick={onSelectSample}>Select sample</EditorAction>
            <EditorAction>
              {ellipsis(schema.title, 20) || "Untitled Schema"}
            </EditorAction>
            <EditorAction onClick={onSave}>
              Save <Icons.DeviceFloppy className="text-blue-400" />
            </EditorAction>
          </Tab.List>
          <Tab.Panels className="mt-10">
            <Card className="w-full">
              <VisualSchemaEditor
                form={form}
                schema={schema}
                setSchema={setSchema}
              />
            </Card>
            <Card className="overflow-hidden rounded-lg p-2">
              <JsonSchemaEditor
                schema={schema}
                onEditorChange={onEditorChange}
              />
            </Card>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  )
}

const defaultDocs = () => <></>

const CodeEditorProvider = React.lazy(() => import("../../wrappers/CodeEditor"))

function LoadingComponent() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="min-h-[300px] min-w-[300px]">
        <span>loading...</span>
      </div>
    </div>
  )
}

let SchemaEditorWithSampleSector = SampleSelector({
  defaultOpen: false,
  renderDocs: (schema: SampleSelectorItem) => {
    const primitivesDocs = getPrimitivesDocs()

    if (primitivesDocs[schema.key]) {
      return primitivesDocs[schema.key]
    }

    return defaultDocs
  }
})((props: any) => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <CodeEditorProvider>
        <SchemaEditor {...props} />
      </CodeEditorProvider>
    </Suspense>
  )
})

export default SchemaEditorWithSampleSector

function SchemaEditorWithParams({ component: Component, ...props }: any) {
  const { path } = useParams()
  const file = useStorageResource("schemas", `${path!}.json`)

  const schema = useMemo(() => {
    if (!file || file === "") return {}

    try {
      return JSON.parse(file)
    } catch (e) {
      return {}
    }
  }, [file])

  return <Component path={path} schema={schema} {...props} />
}

export const SchemaFileEditor = (Component => {
  return (props: any) => (
    <SchemaEditorWithParams {...props} component={Component} />
  )
})(SchemaEditorWithSampleSector) as React.FC<any>