import { useSyncExternalStore } from "react"

/** Store mínima compartilhada entre componentes, lida com useSyncExternalStore. */
export function createStore<T>(initial: T) {
  let state = initial
  const listeners = new Set<() => void>()

  const store = {
    get: () => state,
    set(next: T) {
      state = next
      listeners.forEach((listener) => listener())
    },
    subscribe(listener: () => void) {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    },
  }

  return {
    ...store,
    use: () => useSyncExternalStore(store.subscribe, store.get, store.get),
  }
}

export const paletteStore = createStore(false)

export const toastStore = createStore<{ id: number; message: string } | null>(null)

let toastTimer: ReturnType<typeof setTimeout> | undefined

export function showToast(message: string) {
  clearTimeout(toastTimer)
  toastStore.set({ id: Date.now(), message })
  toastTimer = setTimeout(() => toastStore.set(null), 2200)
}

export async function copyToClipboard(text: string, message: string) {
  try {
    await navigator.clipboard.writeText(text)
    showToast(message)
  } catch {
    showToast("Não foi possível copiar")
  }
}
