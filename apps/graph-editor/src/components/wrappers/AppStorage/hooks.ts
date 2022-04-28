import { useContext, useEffect, useState } from "react"
import { AppStorageContext } from "./context"
import { FileEntry } from "@tauri-apps/api/fs"

export function useAppStorage() {
  return useContext(AppStorageContext)
}

export function useStoragePath(path: string) {
  const [storagePath, setStoragePath] = useState(``)
  const { appDir, getStorageDirPath } = useAppStorage()

  useEffect(() => {
    if (appDir) {
      getStorageDirPath(path).then(result => setStoragePath(result))
    }
  }, [appDir, path])

  return storagePath
}

export function useStorageDirFiles(path: string) {
  const [files, setFiles] = useState<FileEntry[]>([])
  const { appDir, readStorageDir } = useAppStorage()

  useEffect(() => {
    if (appDir) {
      readStorageDir(path).then(result => {
        setFiles(result)
      })
    }
  }, [path, appDir])

  return files
}

export function useStorageResource(fsModule: string, filename: string) {
  const { readResource } = useAppStorage()
  const [fileContent, setFileContent] = useState("")

  useEffect(() => {
    readResource[fsModule](filename).then(content => setFileContent(content))
  }, [filename, setFileContent])

  return fileContent
}