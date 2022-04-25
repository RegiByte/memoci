import create from "zustand"

export interface TabStore {
  selectedIndex: number
  tabs: string[]
  setTabs: (tabs: string[]) => void
  setSelectedIndex: (nextIndex: number) => void
}

export function createTabStore(initialTabs: string[]) {
  return create<TabStore>((set, get) => ({
    selectedIndex: 0,
    tabs: initialTabs,
    setTabs(tabs: string[]) {
      set({
        tabs,
        selectedIndex: 0
      })
    },
    setSelectedIndex(nextIndex) {
      set({
        selectedIndex: nextIndex
      })
    }
  }))
}
