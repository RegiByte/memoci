export type SearchResultType = "project" | "node" | "graph" | "runtime"

export interface SearchResult {
  type: SearchResultType
  label: string
  url: string
  createdAt?: string
  updatedAt?: string
  author?: string
}
