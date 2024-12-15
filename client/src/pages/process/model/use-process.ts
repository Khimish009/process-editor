import { procesApi } from "../api"
import { useLoad } from "../../../shared/use-load"

export const useProcess = (id: string) => {
	return useLoad(() => procesApi.getById(id))
}
