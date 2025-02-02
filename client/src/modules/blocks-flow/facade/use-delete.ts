import { useDeleteRelations } from "../model/delete-relations"
import { useSelected } from "../model/use-selected"
import { useKeysHandlers } from "../view-model/use-keys-handlers"

export const useDelete = (onChanged: () => Promise<void>) => {
    const selectedRelations = useSelected(state => state.getSelectedRelationsArray)
    const resetSelectedRelations = useSelected(state => state.resetSelectedRelations)

    const deleteRelations = useDeleteRelations({
            getRelationsToDelete: selectedRelations,
            onComplete: onChanged,
            afterComplete: resetSelectedRelations
    })
    
    useKeysHandlers({
        onDelete: deleteRelations
    })
}
