import * as React from "react"

export const Button = ({ children, className, ...others }: any) => {
  return (
    <button
      {...others}
      className={`inline-block rounded-lg border-4 border-red-500 bg-sky-400 px-4 py-2 text-white ${className}`}
    >
      {children}
    </button>
  )
}
