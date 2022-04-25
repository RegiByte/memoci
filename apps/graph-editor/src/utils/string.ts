
export function ellipsis(string: string, maxLength: number) {
  if (!string || !string.length) {
    return ""
  }

  if (string.length > maxLength) {
    return string.slice(0, maxLength - 3) + "..."
  }

  return string
}