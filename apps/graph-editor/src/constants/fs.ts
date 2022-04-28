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
  schemas: {
    dir: BaseDirectory.App,
    path: 'userData/schemas'
  },
  config: {
    dir: BaseDirectory.App,
    path: 'config/app'
  },
}