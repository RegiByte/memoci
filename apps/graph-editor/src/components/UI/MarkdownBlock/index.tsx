import React, { AnchorHTMLAttributes } from "react"
import ReactMarkdown from "react-markdown"
import { TwDummy } from "../TwDummy"
import { Link } from "react-router-dom"

function Index(props: any) {
  return (
    <ReactMarkdown
      components={{
        h1: TwDummy(`text-2xl text-zinc-500`).h1,
        h2: TwDummy(`text-2xl text-zinc-500`).h2,
        p: TwDummy(`text-slate-600 my-2`).p,
        b: TwDummy("text-zinc-400").b,
        strong: TwDummy("text-zinc-600").strong,
        a: TwDummy("text-sky-600 hover:text-sky-600 underline").as(
          ({ href, ...childProps }: AnchorHTMLAttributes<any>) => (
            <Link to={href!} {...childProps} />
          )
        )
      }}
    >
      {props.children}
    </ReactMarkdown>
  )
}

export default Index
