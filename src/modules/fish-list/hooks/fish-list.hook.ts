import { dateFormatter } from "./../../../common/helper/string.helper"
import useSWR from "swr"
import {
  FishItemObjectType,
  FishListParamsType,
} from "modules/fish-list/types/fish-list.type"
import { thousandSeparator } from "common/helper/string.helper"

export default function useFishList(
  params?: FishListParamsType,
  keyword?: string
) {
  let searchParams = new URLSearchParams(params as Record<string, string>)

  if (keyword)
    searchParams = new URLSearchParams({
      search: JSON.stringify({ komoditas: keyword }),
    } as Record<string, string>)

  const path = `/list${params ? `?${searchParams}` : ""}`

  const { data, error } = useSWR(path)

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
