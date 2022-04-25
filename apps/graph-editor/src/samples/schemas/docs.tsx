import React from "react"
import MarkdownBlock from "../../components/UI/MarkdownBlock"

const descriptions = import.meta.globEager("./descriptions/*.md")

const defaultDocs = () => <></>

export function getPrimitivesDocs(): Record<string, React.FC<any>> {
  const mappedDescriptions: Record<string, any> = Object.entries(
    descriptions
  ).reduce((payload, [key, value]) => {
    let fileKey = key
      .split("/")
      .find(part => part.endsWith(".md"))!
      .replace(".description.md", "")
    return {
      ...payload,
      [fileKey]: value
    }
  }, {})

  return new Proxy(
    {},
    {
      get(target, key: string) {
        if (mappedDescriptions[key]) {
          return () => (
            <MarkdownBlock>{mappedDescriptions[key].html!}</MarkdownBlock>
          )
        }

        return defaultDocs
      }
    }
  )
}
