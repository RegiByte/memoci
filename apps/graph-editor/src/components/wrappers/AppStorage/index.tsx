import React, { useEffect } from "react"
import { AppStorageContext } from "./context"
import create from "zustand"
import { createDir, FileEntry, readDir } from "@tauri-apps/api/fs"
import { AppStorageDir, kStorageDirs } from "../../../constants/fs"
import { appDir, resolve as resolvePath } from "@tauri-apps/api/path"

interface AppStorageProps {
  children: React.ReactNode
}

export interface AppStorage {
  setup: () => Promise<void>
  resolveAppPath: (path: string) => Promise<string>
  getStorageDirPath: (path: string) => Promise<string>
  readStorageDir: (path: string) => Promise<FileEntry[]>

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
