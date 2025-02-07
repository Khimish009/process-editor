import { create } from "zustand"
import type { Port } from "../../domain/port"

type Store = {
    selectedPort: Port | undefined
    selectedEndPort: Port | undefined
    setSelectedPort: (port: Port) => void
    setSelectedEndPort: (port: Port) => void
    unselectPorts: () => void,
}

export const useSelectedPortStore = create<Store>((set) => ({
    selectedPort: undefined,
    selectedEndPort: undefined,
    setSelectedPort: (port) => set({ selectedPort: port }),
    setSelectedEndPort: (port) => set({ selectedEndPort: port }),
    unselectPorts: () => set({ selectedPort: undefined })
}))