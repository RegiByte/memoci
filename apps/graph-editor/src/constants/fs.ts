import { BaseDirectory } from "@tauri-apps/api/fs"

export interface AppStorageDir {
  dir: BaseDirectory,
  path: string
}

export const kStorageDirs: Record<string, AppStorageDir> = {
  graphs: {
    dir: BaseDirectory.App,
    path: 'userData/graphs'
  },
  config: {
    dir: BaseDirectory.App,
    path: 'config/app'
  },
}