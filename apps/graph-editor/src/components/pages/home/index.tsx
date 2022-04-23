import React from "react"
import { Icons } from "ui"
import { Link } from "react-router-dom"

function Home(props: any) {
  return (
    <div className="container mx-auto">
      <div className="mt-32 flex gap-6">
        <div className="shadow-2 basis-2/3 rounded-2xl bg-white p-4">
          <h2 className="text-2xl">What do you want to do?</h2>
          <ul className="mt-2 flex flex-wrap gap-4 text-white text-xl">
            <li className="hover:scale-110 transition-transform flex cursor-pointer flex-col items-center rounded-2xl bg-sky-400 p-4 hover:bg-sky-500">
              <div>
                <Icons.FilePlus />
              </div>
              <span>Create a Project</span>
            </li>
            <li className="hover:scale-110 transition-transform flex cursor-pointer flex-col items-center rounded-2xl bg-sky-400 p-4 hover:bg-sky-500">
              <div>
                <Icons.BrandAsana />
              </div>
              <span>Create a Node</span>
            </li>
            <li className="hover:scale-110 transition-transform flex cursor-pointer flex-col items-center rounded-2xl bg-sky-400 p-4 hover:bg-sky-500">
              <div>
                <Icons.GitMerge />
              </div>
              <span>Create a Graph</span>
            </li>
            <li className="hover:scale-110 transition-transform flex cursor-pointer flex-col items-center rounded-2xl bg-sky-400 p-4 hover:bg-sky-500">
              <div>
                <Icons.Atom />
              </div>
              <span>Create a Runtime</span>
            </li>
            <Link to="/create/schema" className="hover:scale-110 transition-transform flex cursor-pointer flex-col items-center rounded-2xl bg-sky-400 p-4 hover:bg-sky-500">
              <div>
                <Icons.BrandNetbeans />
              </div>
              <span>Create a Schema</span>
            </Link>
          </ul>
        </div>
        <div className="shadow-2 flex-auto flex-auto rounded-2xl bg-white p-4">
          <h2 className="text-2xl">Recent Files</h2>
          <ul>
            <li>Project 1</li>
            <li>Node 2</li>
            <li>Graph 1</li>
            <li>Node 1</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home
