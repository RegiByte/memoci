import { Route, Routes } from "react-router-dom"
import Home from "./components/pages/home"
import EditorLayout from "./components/wrappers/EditorLayout"
import SchemaEditor, { SchemaFileEditor } from "./components/pages/schemaEditor"
import { GraphCreateForm } from "./components/pages/graphEditor"

function App() {
  return (
    <div className="m-0 min-h-screen w-screen snap-y overscroll-x-none bg-sky-400 p-0 pb-40">
      <EditorLayout>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<SchemaEditor />} path="/schemas/create" />
          <Route element={<SchemaFileEditor />} path="/schemas/edit/:path" />
          <Route element={<GraphCreateForm />} path="/graphs/create" />
        </Routes>
      </EditorLayout>
    </div>
  )
}

export default App
