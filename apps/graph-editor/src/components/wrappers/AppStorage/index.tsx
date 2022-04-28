import React, { useEffect } from "react"
import { AppStorageContext } from "./context"
import create from "zustand"
import {
  createDir,
  FileEntry,
  readDir,
  readTextFile,
  writeFile
} from "@tauri-apps/api/fs"
import { AppStorageDir, kStorageDirs } from "../../../constants/fs"
import { appDir, resolve as resolvePath } from "@tauri-apps/api/path"

interface AppStorageProps {
  children: React.ReactNode
}

type PutResourceFn = (filename: string, content: string) => Promise<FileEntry>
type ReadResourceFn = (filename: string) => Promise<string>

export interface AppStorage {
  setup: () => Promise<void>
  resolveAppPath: (path: string) => Promise<string>
  getStorageDirPath: (path: string) => Promise<string>
  readStorageDir: (path: string) => Promise<FileEntry[]>
  putResource: Record<string, PutResourceFn>
  readResource: Record<string, ReadResourceFn>
  writeAppFile: (
    fsModule: string,
    filename: string,
    content: string
  ) => Promise<FileEntry>
  readAppFile: (fsModule: string, filename: string) => Promise<string>

  appDir: string
}

const initializeAppFolder = async (storageDir: AppStorageDir) => {
  try {
    await createDir(storageDir.path, {
      dir: storageDir.dir,
      recursive: true
    })
  } catch (e) {
    console.log("failed to initialize app folder: ", storageDir.path)
  }
}

const useAppStorage = create<AppStorage>((set, get) => ({
  appDir: "",

  resolveAppPath(path: string) {
    return resolvePath(get().appDir, path)
  },

  readResource: new Proxy(
    {},
    {
      get(target, key: string) {
        if (kStorageDirs[key]) {
          return (filename: string) => {
            return get().readAppFile(key, filename)
          }
        }

        return (filename: string) => Promise.resolve(filename)
      }
    }
  ),

  putResource: new Proxy(
    {},
    {
      get(target, key: string) {
        if (kStorageDirs[key]) {
          return (filename: string, content: string) => {
            return get().writeAppFile(key, filename, content)
          }
        }

        return Promise.reject(new Error(`Invalid storage dir: ${key}`))
      }
    }
  ),

  readAppFile(fsModule, filename) {
    return get()
      .getStorageDirPath(fsModule)
      .then(fsModulePath => {
        let path = `${fsModulePath}/${filename}`

        return readTextFile(path)
      })
      .catch(e => {
        console.log(`file not found ${filename}, module ${fsModule}`)
        return Promise.resolve("")
      })
  },

  writeAppFile: (fsModule: string, filename: string, content: string) => {
    return get()
      .getStorageDirPath(fsModule)
      .then(fsModulePath => {
        let path = `${fsModulePath}/${filename}`
        return writeFile({
          path,
          contents: content
        }).then(() => ({
          path,
          name: filename
        }))
      })
  },

  readStorageDir(path: string) {
    return get()
      .getStorageDirPath(path)
      .then(result => readDir(result))
  },

  getStorageDirPath(storageDir: string) {
    if (!kStorageDirs[storageDir]) {
      return Promise.resolve(get().appDir)
    }

    return get()
      .resolveAppPath(kStorageDirs[storageDir].path)
      .then(path => path)
  },

  async setup() {
    appDir().then(currentAppDir => set({ appDir: currentAppDir }))

    await Promise.all(Object.values(kStorageDirs).map(initializeAppFolder))
  }
}))

export function AppStorageProvider({ children }: AppStorageProps) {
  const appStorage = useAppStorage()

  const { setup } = appStorage
  useEffect(() => {
    setup()
  }, [setup])

  return (
    <AppStorageContext.Provider value={appStorage}>
      {children}
    </AppStorageContext.Provider>
  )
}
