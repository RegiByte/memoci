import React from "react"
import Logo from "../../../../assets/images/logo.jpg"
import { Link } from "react-router-dom"
import { Icons } from "ui"
import { AnimatedTooltip } from "../../../tooltip"
import create from "zustand"
import { SearchResult, SearchResultType } from "../../../../types/search"
import { dummySearchResults } from "./dummyData"
import collect, { Collection } from "collect.js"
import { Dialog } from "@headlessui/react"
import { createModalStore, ModalStore } from "../../../../store/creators/modal"
import SearchResults from "./SearchResults"

const headerActions: HeaderAction[] = [
  {
    id: "learn",
    icon: Icons.Book,
    tooltip: () => <div>Documentation</div>,
    callback({ documentationModal }) {
      documentationModal.openModal()
    }
  },
  {
    id: "help",
    icon: Icons.Help,
    tooltip: () => <div>Help and Shortcuts</div>,
    callback({ helpModal }) {
      helpModal.openModal()
    }
  },
  {
    id: "settings",
    icon: Icons.Settings,
    tooltip: () => <div>Settings</div>,
    callback({ settingsModal }) {
      settingsModal.openModal()
    }
  }
]

interface HeaderActionCallbackProps {
  helpModal: ModalStore
  settingsModal: ModalStore
  documentationModal: ModalStore
}

type HeaderActionCallback = (props: HeaderActionCallbackProps) => void

interface HeaderAction {
  id: string
  icon: React.FC
  tooltip: React.FC
  callback: HeaderActionCallback
}

interface HeaderStore {
  search: string
  searchResults: Collection<SearchResult>

  setSearch: (newSearch: string) => void
  searchInputHandler: (ev: React.ChangeEvent<HTMLInputElement>) => void
  getSearchResultsByType: (type: SearchResultType) => Collection<SearchResult>
}

const useHeaderStore = create<HeaderStore>((set, get) => ({
  search: "",
  searchResults: collect<SearchResult>([]),

  setSearch(search) {
    set({
      search
    })
  },

  getSearchResultsByType(type: SearchResultType) {
    return get().searchResults.where("type", type)
  },

  searchInputHandler(ev) {
    ev.preventDefault()

    const search = ev?.target?.value ?? ""

    set({
      search,
      searchResults: search
        ? collect<SearchResult>(dummySearchResults)
        : collect<SearchResult>([])
    })
  }
}))

function HeaderActionButton(
  props: Omit<HeaderAction, "callback"> & { onClick: any }
) {
  const { icon: Icon, tooltip: TooltipContent, onClick } = props

  return (
    <AnimatedTooltip label={<TooltipContent />}>
      <button className="p-2 text-amber-600" onClick={onClick}>
        <Icon />
      </button>
    </AnimatedTooltip>
  )
}

export interface SearchGroup {
  groupType: string
  groupLabel: string
}

const useHelpModal = createModalStore()
const useDocumentationModal = createModalStore()
const useSettingsModal = createModalStore()

function Header(props: any) {
  const { search, searchInputHandler, searchResults, getSearchResultsByType } =
    useHeaderStore()

  const helpModal = useHelpModal()
  const documentationModal = useDocumentationModal()
  const settingsModal = useSettingsModal()

  return (
    <>
      <div className="min-h-[72px] w-full ">
        <nav className="fixed top-0 w-full bg-white py-4 px-2 text-lg shadow-lg">
          <header className="flex">
            <Link className="flex items-center px-4 text-2xl" to="/">
              <img
                alt="App Logo"
                className="mr-2 max-w-[40px] object-contain"
                src={Logo}
              />
              <span className="text-sky-400">MemoCI&nbsp;</span>
              <span className="text-pink-400">Graphix</span>
            </Link>

            <div className="relative flex flex-1 items-center px-4">
              <input
                className="w-full rounded-lg border-0 bg-sky-200 py-2 px-2 placeholder:text-gray-600"
                placeholder="Search for graphs, projects, nodes or documentation..."
                type="text"
                value={search}
                onChange={searchInputHandler}
              />

              <SearchResults
                {...{
                  searchResults,
                  search,
                  getSearchResultsByType
                }}
              />
            </div>

            <div className="flex items-center gap-2 px-4 mr-4">
              {headerActions.map(action => (
                <HeaderActionButton
                  icon={action.icon}
                  id={action.id}
                  key={action.id}
                  tooltip={action.tooltip}
                  onClick={() =>
                    action.callback({
                      helpModal,
                      documentationModal,
                      settingsModal
                    })
                  }
                />
              ))}
            </div>
          </header>
        </nav>
      </div>

      <Dialog
        className="fixed inset-0 flex h-screen w-screen items-center justify-center"
        open={helpModal.open}
        onClose={() => helpModal.closeModal()}
      >
        <Dialog.Overlay
          className="fixed inset-0 z-[10] opacity-30"
          onClick={helpModal.closeModal}
        />
        <div className="z-[11] rounded-2xl bg-white p-4">
          <Dialog.Title>You are gonna get your help</Dialog.Title>
          <div className="flex flex-col">
            <div>Here are the informations you need</div>
            <div>
              <button onClick={helpModal.closeModal}>close</button>
            </div>
          </div>
        </div>
      </Dialog>

      <Dialog
        className="fixed inset-0 flex h-screen w-screen items-center justify-center"
        open={settingsModal.open}
        onClose={() => settingsModal.closeModal()}
      >
        <Dialog.Overlay
          className="fixed inset-0 z-[10] opacity-30"
          onClick={settingsModal.closeModal}
        />
        <div className="z-[11] rounded-2xl bg-white p-4">
          <Dialog.Title>Config your app here</Dialog.Title>
          <div className="flex flex-col">
            <div>Here are your configurations settings</div>
            <div>
              <button onClick={settingsModal.closeModal}>close</button>
            </div>
          </div>
        </div>
      </Dialog>

      <Dialog
        className="fixed inset-0 flex h-screen w-screen items-center justify-center"
        open={documentationModal.open}
        onClose={() => documentationModal.closeModal()}
      >
        <Dialog.Overlay
          className="fixed inset-0 z-[10] opacity-30"
          onClick={documentationModal.closeModal}
        />
        <div className="z-[11] rounded-2xl bg-white p-4">
          <Dialog.Title>Documentation here</Dialog.Title>
          <div className="flex flex-col">
            <div>Here are your docs</div>
            <div>
              <button onClick={documentationModal.closeModal}>close</button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default Header
