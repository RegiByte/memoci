import React, { Fragment, useMemo } from "react"
import { Collection } from "collect.js"
import { SearchResult } from "../../../../types/search"
import { SearchGroup } from "./index"

interface SearchResultsProps {
  searchResults: Collection<SearchResult>
  search: string

  getSearchResultsByType(type: string): Collection<SearchResult>
}

export const searchGroups: SearchGroup[] = [
  {
    groupType: "project",
    groupLabel: "Projects"
  },
  {
    groupType: "graph",
    groupLabel: "Graphs"
  },
  {
    groupType: "node",
    groupLabel: "Nodes"
  },
  {
    groupType: "runtime",
    groupLabel: "Runtimes"
  }
]

function SearchResults(props: SearchResultsProps) {
  const { searchResults, search, getSearchResultsByType } = props

  const groupedSearchResults = useMemo(() => {
    return {
      project: getSearchResultsByType("project"),
      graph: getSearchResultsByType("graph"),
      node: getSearchResultsByType("node"),
      runtime: getSearchResultsByType("runtime")
    }
  }, [search, searchResults, getSearchResultsByType])

  return (
    <>
      {searchResults.all().length > 0 && (
        <div className="absolute -bottom-[30px] left-0 w-full px-8">
          <div className="relative w-full">
            <div
              className={`absolute top-0 max-h-[600px] w-full snap-y overflow-x-hidden rounded-lg border-2
                    border-sky-200 bg-white shadow-lg
                  `}
            >
              <div className="flex flex-col p-4">
                {searchGroups.map(group => (
                  <Fragment key={group.groupType}>
                    {(groupedSearchResults as any)?.[group.groupType]?.all()
                      .length > 0 && (
                      <div className="px-2">
                        <div className="my-2">
                          <h2 className="py-2 text-2xl text-sky-500">
                            {group.groupLabel}
                          </h2>
                          <div className="w-full border-t border-gray-300" />
                        </div>
                        <ul className="flex flex-wrap gap-2 pl-4">
                          {(
                            (groupedSearchResults as any)?.[group.groupType] ||
                            ([] as SearchResult[])
                          )
                            .map((groupItem: SearchResult, index: number) => (
                              <li
                                className="m-2 flex flex-col rounded-2xl bg-gray-100 p-4"
                                key={`${groupItem.label}-${groupItem.type}-${groupItem.createdAt}-${index}`}
                              >
                                <div className="text-2xl">
                                  {groupItem.label}
                                </div>
                                {groupItem.updatedAt && (
                                  <div className="text-gray-400">
                                    <span>Last edited: </span>
                                    <span>{groupItem.updatedAt}</span>
                                  </div>
                                )}
                                {groupItem.author && (
                                  <div className="text-gray-400">
                                    <span>Author: </span>
                                    <span>{groupItem.author}</span>
                                  </div>
                                )}
                              </li>
                            ))
                            .all()}
                        </ul>
                      </div>
                    )}
                  </Fragment>
                ))}{" "}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SearchResults
