export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(() => resolve(true), ms))
}

export function shuffle<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export function getRandomNumber(
  { max, min }: { max: number; min: number } = { max: 100, min: 1 }
) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
