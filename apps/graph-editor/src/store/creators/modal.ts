import create from "zustand"

export interface ModalStore {
  open: boolean

  setOpen(nextOpen: boolean): void

  toggleOpen(nextOpen: boolean): void

  closeModal(): void

  openModal(): void
}

export const createModalStore = () =>
  create<ModalStore>((set, get) => ({
    open: false,
    closeModal() {
      set({
        open: false
      })
    },
    openModal() {
      set({
        open: true
      })
    },
    setOpen(nextOpen: boolean) {
      set({
        open: nextOpen
      })
    },
    toggleOpen(nextOpen: boolean) {
      set(current => ({
        open: !current.open
      }))
    }
  }))
