import React from "react"
import Header from "./Header"

interface EditorLayoutProps {
  children: React.ReactNode
}

function EditorLayout(props: EditorLayoutProps) {
  return (
    <>
      <Header />
      {props.children}
    </>
  )
}

export default EditorLayout
