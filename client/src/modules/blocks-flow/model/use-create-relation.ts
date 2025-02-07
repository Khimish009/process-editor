import { blocksFlowApi } from "../api"
import type { Block, Relation } from "../domain/block"
import { isPortTypesSame, portIsAlreadyInUse, portsAreEqual, type Port } from "../domain/port"
import { create } from "zustand"

export const useUnselectPort = () => {
    const unselectPort = useCreateRelationStore((state) => state.unselectPort)
    const isSelection = useCreateRelationStore((state) => !!state.isSelection)

    return {
        isSelection,
        unselectPort
    }
}

export const useCreateRelation = create<Store>((set, get) => ({
    selectedPort: undefined,
    isSelection: () => !!get().selectedPort,
    selectPort: (port, blocks, onSuccess) => {
        if (get().getIsCanStartSelection(port, blocks)) {
            set({ selectedPort: port }) 
            return
        }

        if (get().getIsCanEndSelection(port, blocks)) {
            const params = port.type === "input" ?
            {
                inputId: port!.blockId,
                inputPort: port!.port,
                outputId: get().selectedPort!.blockId,
                outputPort: get().selectedPort!.port
            } :
            {
                inputId: get().selectedPort!.blockId,
                inputPort: get().selectedPort!.port,
                outputId: port!.blockId,
                outputPort: port!.port
            }

            return blocksFlowApi.addRelation(params).then(() => {
                set({ selectedPort: undefined })
                onSuccess?.()
            })
        }
    },
    getIsSelectedPort: (port) => !!get().isSelection && portsAreEqual(port, get().selectedPort),
    getIsCanStartSelection: (port, blocks) => !get().selectedPort && !portIsAlreadyInUse(blocks, port),
    getIsCanEndSelection: (port, blocks) => (
        !!get().selectedPort &&
        !portIsAlreadyInUse(blocks, port) && 
        !isPortTypesSame(get().selectedPort, port) &&
        !portsAreEqual(get().selectedPort, port)
    ),
    unselectPort: () => set({ selectedPort: undefined })
}))

export const useOptimisticCreateRelations = (relations: Relation[]) => {
    return relations
}

type Store = {
    selectedPort: Port | undefined
    isSelection: () => boolean,
    unselectPort: () => void,
}

const useCreateRelationStore = create<Store>((set, get) => ({
    selectedPort: undefined,
    isSelection: () => !!get().selectedPort,
    unselectPort: () => set({ selectedPort: undefined })
}))
