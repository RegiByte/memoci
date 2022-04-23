import create from "zustand"

export interface TabStore {
  selectedIndex: number
  tabs: string[]
  setSelectedIndex: (nextIndex: number) => void
}

export function createTabStore(initialTabs: string[]) {
  return create<TabStore>((set, get) => ({
    selectedIndex: 0,
    tabs: initialTabs,
    setSelectedIndex(nextIndex) {
      set({
        selectedIndex: nextIndex
      })
    }
  }))
}
