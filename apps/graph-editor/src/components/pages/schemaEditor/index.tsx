import { Tab } from "@headlessui/react"
import React from "react"
import { Icons } from "ui"
import { createTabStore } from "../../../store/creators/tabs"
import { twMerge } from "tailwind-merge"
import Editor from "@monaco-editor/react"

const useSchemaEditorTabStore = createTabStore(["visual", "code", "json"])

type AsElementFn = (Element: React.FC) => React.FC<TailwindDummyElementProps>

type CustomRenderMethod = "as"

type CustomRenderElement = Record<CustomRenderMethod, AsElementFn>
type StandardHtmlRenderElement<
  T extends TailwindDummyElementProps = TailwindDummyElementProps
> = React.FC<T>

type TailwindDummyElement<T extends TailwindDummyElementProps> = Record<
  keyof JSX.IntrinsicElements,
  StandardHtmlRenderElement<T>
> &
  CustomRenderElement

interface TailwindDummyElementProps {
  children: any
  className?: string
}

function TailwindDummy<T extends TailwindDummyElementProps>(
  className: string
): TailwindDummyElement<T> {
  return new Proxy<TailwindDummyElement<any>>({} as any, {
    get(target, key) {
      if (key === "as") {
        return function (Element: any) {
          return (props: T) => (
            <Element
              {...props}
              className={twMerge(className, props?.className || "")}
            />
          )
        }
      }

      return function (props: T) {
        return React.createElement(key as string, {
          ...props,
          className: twMerge(className, props?.className || "")
        })
      }
    }
  })
}

const Card = TailwindDummy(`shadow-2 rounded-2xl bg-white p-4`).as(Tab.Panel)
const Link = TailwindDummy("text-blue-400 line-through").a

const defaultEditorCode = `
// TODO: add your schema here
export function schema() {
  return {
    edges: [],
    nodes: []
  }
}
`

const defaultJsonCode = `
{
  "edges": [],
  "nodes": []
}
`

function SchemaEditor(props: any) {
  const tabStore = useSchemaEditorTabStore()

  return (
    <div className="container mx-auto">
      <Tab.Group
        selectedIndex={tabStore.selectedIndex}
        onChange={tabStore.setSelectedIndex}
      >
        <Tab.List className="mx-40 mt-10 flex items-center gap-4">
          <Tab
            className={`flex items-center gap-2 rounded-2xl bg-white p-4 
          text-2xl shadow-2xl transition-transform hover:scale-110`}
          >
            Visual <Icons.Forms className="text-sky-400" />
          </Tab>
          <Tab
            className={`flex items-center gap-2 rounded-2xl bg-white p-4
           text-2xl shadow-2xl transition-transform hover:scale-110`}
          >
            Code{" "}
            <span className="text-blue-400">
              (<span className="underline">TS</span>)
            </span>
            <Icons.Code className="text-blue-400" />
          </Tab>
          <Tab
            className={`flex items-center gap-2 rounded-2xl bg-white p-4 
          text-2xl shadow-2xl transition-transform hover:scale-110`}
          >
            JSON <Icons.Braces className="text-blue-400" />
          </Tab>
          <div className="flex-1" />
          <div className="rounded-2xl bg-white p-4 text-2xl shadow-2xl">
            Untitled Schema
          </div>
        </Tab.List>
        <Tab.Panels className="mt-10">
          <Card>
            <Link className="underline">This is the visual editor</Link>
          </Card>
          <Card>
            <Editor
              defaultLanguage="typescript"
              defaultValue={defaultEditorCode}
              height="700px"
            />
          </Card>
          <Card>
            <Editor
              defaultLanguage="json"
              defaultValue={defaultJsonCode}
              height="700px"
            />
          </Card>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default SchemaEditor
