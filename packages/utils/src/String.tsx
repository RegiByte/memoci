export function kebabCase(string?: string) {
  if (!string) return string

  return string
    .trim()
    .split(" ")
    .map(word => word.toLowerCase())
    .join("-")
}

export function capitalize(string?: string) {
  if (!string) return string

  return string
    .trim()
    .split(/([- ]+)/g)
    .filter(word => !["-"].includes(word))
    .map(
      word => `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`
    )
    .join(" ")
}
