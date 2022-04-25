import { Dialog, Tab } from "@headlessui/react"
import React, { useEffect, useRef, useState } from "react"
import { createTabStore } from "../../../store/creators/tabs"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"

export interface SampleSelectorItem {
  key: string
  title: string
  description?: string
  content: string
  docs?: string
}

export interface SampleSelectorParams {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  selectedSample: SampleSelectorItem | null
  setSelectedSample: React.Dispatch<
    React.SetStateAction<SampleSelectorItem | null>
  >

  selectSample(samples: SampleSelectorItem[]): Promise<SampleSelectorItem>
}

interface SampleSelectorProps {
  defaultOpen: boolean

  renderDocs(schema: SampleSelectorItem): React.FC
}

const useSampleTabStore = createTabStore([])

export function SampleSelectorComponent(props: any) {
  const { Component, defaultOpen = false, renderDocs } = props
  const [open, setOpen] = useState<boolean>(defaultOpen)
  const [selectedSample, setSelectedSample] =
    useState<SampleSelectorItem | null>(null)
  const [samples, setSamples] = useState<SampleSelectorItem[]>([])
  const selectedSampleRef = useRef<SampleSelectorItem>()
  const sampleTab = useSampleTabStore()

  const selectSample = async (
    nextSamples: SampleSelectorItem[]
  ): Promise<SampleSelectorItem | null> => {
    if (!nextSamples.length) {
      return null
    }
    if (selectedSampleRef.current) {
      selectedSampleRef.current = undefined
    }

    setOpen(true)
    setSamples(nextSamples)

    while (!selectedSampleRef.current) {
      await new Promise(resolve => setTimeout(resolve, 300))
    }

    if ((selectedSampleRef.current as any)?.key === "cancel") {
      return Promise.resolve(null)
    }

    setOpen(false)
    return selectedSampleRef.current
  }

  const { setTabs } = sampleTab
  useEffect(() => {
    setTabs(samples.map(sample => sample.key))
  }, [samples])

  let closeSelector = () => {
    selectedSampleRef.current = { key: "cancel" } as any
    setOpen(false)
  }
  return (
    <>
      <Component
        {...props}
        {...{
          open,
          setOpen,
          selectedSample,
          setSelectedSample,
          selectSample
        }}
      />

      {open && (
        <Dialog
          open
          className="fixed inset-0 flex h-screen w-screen items-center justify-center"
          onClose={closeSelector}
        >
          <Dialog.Overlay className="fixed inset-0 z-[10] bg-gray-400 opacity-30 backdrop-blur-md" />
          <div className="z-[11] rounded-2xl bg-white p-4">
            <Dialog.Title className="flex justify-between items-center border-b-2">
              <div className="prose pb-4">
                <h1>Select a sample</h1>
              </div>
              <div className="pb-4">
                <button
                  className={`rounded-lg bg-sky-400 px-4 py-4 text-md text-white transition-all
                            hover:scale-110 hover:bg-sky-600`}
                  onClick={() => {
                    setSelectedSample(samples[sampleTab.selectedIndex])
                    selectedSampleRef.current = samples[sampleTab.selectedIndex]
                  }}
                >
                  Choose Sample
                </button>
              </div>
            </Dialog.Title>

            <div className="flex">
              <Tab.Group
                vertical
                selectedIndex={sampleTab.selectedIndex}
                onChange={sampleTab.setSelectedIndex}
              >
                <div className="min-w-[250px] grow-0">
                  <Tab.List className="flex flex-col gap-4 py-4 px-4">
                    {samples.map((sample, index) => (
                      <Tab
                        key={sample.key}
                        className={`flex cursor-pointer flex-col rounded-2xl border-2 px-2 py-4
                      text-center transition-all hover:scale-105 hover:bg-gray-300 
                      ${
                        index === sampleTab.selectedIndex
                          ? "border-sky-400 bg-gray-300"
                          : "bg-gray-200"
                      }`}
                      >
                        <h2 className="text-2xl text-zinc-500">{sample.title}</h2>
                        <span className="text-sm">{sample.description}</span>
                      </Tab>
                    ))}
                  </Tab.List>
                </div>
                <div className="border-r-2" />
                <Tab.Panels className="max-h-[600px] min-w-[700px] max-w-[700px] snap-y overflow-x-hidden p-2">
                  {samples.map(sample => {
                    const Docs = props.renderDocs(sample)
                    return (
                      <Tab.Panel
                        className="flex flex-col overflow-x-hidden p-2 pb-4"
                        key={sample.key}
                      >
                        <div className="py-8 prose">
                          <Docs />
                        </div>

                        <SyntaxHighlighter
                          className="my-4 min-h-[400px] rounded-2xl shadow-xl transition-all hover:shadow-2xl"
                          language="json"
                        >
                          {sample.content}
                        </SyntaxHighlighter>

                        <div className="mt-10 flex justify-end">
                          <button
                            className={`rounded-lg bg-sky-400 px-4 py-4 text-2xl text-white transition-all
                            hover:scale-110 hover:bg-sky-600`}
                            onClick={() => {
                              setSelectedSample(
                                samples[sampleTab.selectedIndex]
                              )
                              selectedSampleRef.current =
                                samples[sampleTab.selectedIndex]
                            }}
                          >
                            Choose Sample
                          </button>
                        </div>
                      </Tab.Panel>
                    )
                  })}
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </Dialog>
      )}
    </>
  )
}

export function SampleSelector(selectorProps: SampleSelectorProps) {
  return function <T extends SampleSelectorParams>(Component: React.FC<T>) {
    return (props: any) => (
      <SampleSelectorComponent
        Component={Component}
        {...props}
        {...selectorProps}
      />
    )
  }
}
