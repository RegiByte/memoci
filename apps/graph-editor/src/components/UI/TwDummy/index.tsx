import React from "react"
import { twMerge } from "tailwind-merge"

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

type TailwindDummyElementProps = {
  children?: any
  className?: string
  style?: any
} & Record<string, any>

export function TwDummy<T extends TailwindDummyElementProps>(
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