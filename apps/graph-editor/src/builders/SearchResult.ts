import { SearchResult, SearchResultType } from "../types/search"

export interface SearchResultBuilder {
  build(): SearchResult

  type(newType: SearchResultType): SearchResultBuilder

  label(label: string): SearchResultBuilder

  url(url: string): SearchResultBuilder

  createdAt(createdAt: string): SearchResultBuilder

  updatedAt(updatedAt: string): SearchResultBuilder

  author(author: string): SearchResultBuilder

  update(params: Partial<SearchResult>): SearchResultBuilder

  setSearchResult(params: SearchResult): SearchResultBuilder
}

export class SearchResultBuilderImpl implements SearchResultBuilder {
  searchResult: SearchResult

  constructor(params: Partial<SearchResult> = {}) {
    this.searchResult = {
      author: params.author || "",
      url: params.url || "",
      type: params.type || "project",
      label: params.label || "",
      createdAt: params.createdAt,
      updatedAt: params.updatedAt
    }
  }

  type(newType: SearchResultType): SearchResultBuilder {
    return this.update({
      type: newType
    })
  }

  author(author: string): SearchResultBuilder {
    return this.update({
      author
    })
  }

  build(): SearchResult {
    if (!this.label) {
      throw new Error(`missing label on search result`)
    }

    if (!this.url) {
      throw new Error(`missing url on search result`)
    }

    return this.searchResult
  }

  createdAt(createdAt: string): SearchResultBuilder {
    return this.update({
      createdAt
    })
  }

  label(label: string): SearchResultBuilder {
    return this.update({
      label
    })
  }

  setSearchResult(params: SearchResult): SearchResultBuilder {
    this.searchResult = params
    return this
  }

  update(params: Partial<SearchResult>): SearchResultBuilder {
    return new SearchResultBuilderImpl({
      ...this.searchResult,
      ...params
    })
  }

  updatedAt(updatedAt: string): SearchResultBuilder {
    return this.update({
      updatedAt
    })
  }

  url(url: string): SearchResultBuilder {
    return this.update({
      url
    })
  }
}

export function searchResultBuilder() {
  return new SearchResultBuilderImpl()
}
