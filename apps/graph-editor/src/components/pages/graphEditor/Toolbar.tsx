import React from "react"

function GraphToolbar(props: any) {
  return (
    <div className="flex w-full flex-col gap-2 border-t-2 border-sky-400 bg-white shadow-md">
      <div className="flex flex-col">
        <div className="flex px-4">
          <div className="cursor-pointer py-2 px-4 hover:bg-slate-200">
            File
          </div>
          <div className="cursor-pointer py-2 px-4 hover:bg-slate-200">
            Editor
          </div>
          <div className="cursor-pointer py-2 px-4 hover:bg-slate-200">
            Schema
          </div>
        </div>
        <div className="w-full px-6">
          <div className="w-full border-b-2"/>
        </div>
      </div>
      <div className="flex items-center px-4">
        <div className="cursor-pointer px-2">Selected Schema:</div>
        <select
          className="cursor-pointer rounded-xl"
          id="selectedSchema"
          name="selectedSchema"
        >
          <option value="">Select a Runtime Schema</option>
          <option value="primitives">Primitives</option>
        </select>
      </div>
      <div className=""></div>
    </div>
  )
}

export default GraphToolbar
