export function randomElement(arr: any[]) {
  if (!arr.length) return null
  return arr[Math.floor(Math.random() * arr.length)]
}
