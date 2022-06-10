import { httpCall } from "common/libs/fetch.lib"
import { FishItemObjectType } from "modules/fish-list/types/fish-list.type"

export const addFish = async (payload: FishItemObjectType) => {
  return await httpCall.post(`/list`, [payload])
}
