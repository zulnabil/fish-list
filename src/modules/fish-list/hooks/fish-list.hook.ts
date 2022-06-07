import useSWR from "swr"
import { BASE_STEIN_URL } from "common/config/env"
import {
  FishItemObjectType,
  FishListParamsType,
} from "modules/fish-list/types/fish-list.type"

export default function useFishList(params?: FishListParamsType) {
  const url = `${BASE_STEIN_URL}/list${
    params ? `?${new URLSearchParams(params as Record<string, string>)}` : ""
  }`

  const { data, error } = useSWR(url)

  const cleanData = data?.filter(
    (item: FishItemObjectType) =>
      item.uuid && item.komoditas && item.komoditas.length > 5
  )

  return {
    fishes: cleanData,
    isLoading: !error && !data,
    isError: error,
  }
}
