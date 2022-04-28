import React, { useMemo } from "react"
import { Icons } from "ui"
import { Link, useNavigate } from "react-router-dom"
import { useStorageDirFiles } from "../../wrappers/AppStorage/hooks"
import collect from "collect.js"

function Home(props: any) {
  const schemaFiles = useStorageDirFiles("schemas")
  const navigate = useNavigate()

  const recentFiles = useMemo(() => {
    return collect([...schemaFiles])
      .map(file => {
        const name = collect(file.name!.split("--")).last()
        const fileParts = file.path.split("/")
        const filePath = fileParts.slice(fileParts.length - 2)

        return {
          name,
          fullPath: file.path,
          type: filePath[0],
          filename: filePath[1],
          path: filePath.join("/")
        }
      })
      .all()
  }, [schemaFiles])

  return (
    <div className="container mx-auto">
      <div className="mt-32 flex gap-6">
        <div className="shadow-2 basis-2/3 rounded-2xl bg-white p-4">
          <h2 className="text-2xl">What do you want to do?</h2>
          <ul className="mt-2 flex flex-wrap gap-4 text-xl text-white">
            <li className="flex cursor-pointer flex-col items-center rounded-2xl bg-sky-400 p-4 transition-transform hover:scale-110 hover:bg-sky-500">
              <div>
                <Icons.FilePlus />
              </div>
              <span>Create a Project</span>
            </li>
            <li className="flex cursor-pointer flex-col items-center rounded-2xl bg-sky-400 p-4 transition-transform hover:scale-110 hover:bg-sky-500">
              <div>
                <Icons.BrandAsana />
              </div>
              <span>Create a Node</span>
            </li>
            <Link
              to="/graphs/create"
              className="flex cursor-pointer flex-col items-center rounded-2xl bg-sky-400 p-4 transition-transform hover:scale-110 hover:bg-sky-500"
            >
              <div>
                <Icons.GitMerge />
              </div>
              <span>Create a Graph</span>
            </Link>
            <li className="flex cursor-pointer flex-col items-center rounded-2xl bg-sky-400 p-4 transition-transform hover:scale-110 hover:bg-sky-500">
              <div>
                <Icons.Atom />
              </div>
              <span>Create a Runtime</span>
            </li>
            <Link
              className="flex cursor-pointer flex-col items-center rounded-2xl bg-sky-400 p-4 transition-transform hover:scale-110 hover:bg-sky-500"
              to="/schemas/create"
            >
              <div>
                <Icons.BrandNetbeans />
              </div>
              <span>Create a Schema</span>
            </Link>
          </ul>
        </div>
        <div className="shadow-2 flex-auto flex-auto rounded-2xl bg-white p-4">
          <h2 className="text-2xl">Recent Files</h2>
          <ul className="flex flex-col gap-2">
            {recentFiles.map(file => (
              <li
                key={file.path}
                className={`flex w-full cursor-pointer flex-col gap-2 rounded-lg border-2 py-4
              px-2 hover:bg-slate-200`}
                onClick={() =>
                  navigate(
                    `/schemas/edit/${encodeURIComponent(
                      file.filename.replace(".json", "")
                    )}`
                  )
                }
              >
                <span className="capitalize">{file.type}</span>
                <span className="font-bold">{file.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home
