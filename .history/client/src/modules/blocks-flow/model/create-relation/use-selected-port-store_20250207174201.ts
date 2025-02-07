import { create } from "zustand"
import type { Port } from "../../domain/port"

type Store = {
    selectedPort: Port | undefined
    setSelectedPort: (port: Port) => void
    unselectPort: () => void,
}

export const useSelectedPortStore = create<Store>((set) => ({
    selectedPort: undefined,
    setSelectedPort: (port) => set({ selectedPort: port }),
    unselectPort: () => set({ selectedPort: undefined })
}))