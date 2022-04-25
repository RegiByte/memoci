import { Route, Routes } from "react-router-dom"
import Home from "./components/pages/home"
import { useEffect } from "react"
import { appWindow } from "@tauri-apps/api/window"
import EditorLayout from "./components/wrappers/EditorLayout"
import SchemaEditor from "./components/pages/schemaEditor"

function App() {
  useEffect(() => {
    appWindow.maximize()
  }, [])

  return (
    <div className="m-0 pb-40 min-h-screen w-screen snap-y overscroll-x-none bg-sky-400 p-0">
      <EditorLayout>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<SchemaEditor />} path="/create/schema" />
        </Routes>
      </EditorLayout>
    </div>
  )
}

export default App
