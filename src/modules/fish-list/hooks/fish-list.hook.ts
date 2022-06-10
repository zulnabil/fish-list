import { dateFormatter } from "./../../../common/helper/string.helper"
import useSWR from "swr"
import { BASE_STEIN_URL } from "common/config/env"
import {
  FishItemObjectType,
  ObjectStringType,
  FishListParamsType,
} from "modules/fish-list/types/fish-list.type"
import { thousandSeparator } from "common/helper/string.helper"

export default function useFishList(
  params?: FishListParamsType,
  search?: ObjectStringType
) {
  const searchParams = new URLSearchParams(params as Record<string, string>)

  if (search) searchParams.append("search", JSON.stringify(search))

  const url = `${BASE_STEIN_URL}/list${params ? `?${searchParams}` : ""}`

  const { data, error } = useSWR(decodeURIComponent(url))

  const formattedData = data?.map((fish: FishItemObjectType) => ({
    ...fish,
    ...(fish.price && { price: thousandSeparator(fish.price) }),
    ...(fish.tgl_parsed && { tgl_parsed: dateFormatter(fish.tgl_parsed) }),
  }))

  return {
    fishes: formattedData,
    isLoading: !error && !data,
    isError: error,
  }
}
