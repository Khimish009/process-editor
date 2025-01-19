import { create } from "zustand"
import { RelationId } from "../domain/block"

type Store = {
	selectedRelations: Record<RelationId, boolean>
	toggleRelation: (id: RelationId) => void
	getSelectedRelationsArray: () => RelationId[]
	resetSelectedRelations: () => void
}

export const useSelected = create<Store>((set, get) => ({
	selectedRelations: {},
	toggleRelation: (id) => {
		set({ 
			selectedRelations: {
				...get().selectedRelations,
				[id]: !get().selectedRelations[id]
			}
		})
	},
	getSelectedRelationsArray: () => {
		return Object.keys(get().selectedRelations).filter(id => {
			return get().selectedRelations[id]
		})
	},
	resetSelectedRelations: () => set({ selectedRelations: {} })
}))
