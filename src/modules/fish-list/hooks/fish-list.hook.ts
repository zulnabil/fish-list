import { dateFormatter } from "./../../../common/helper/string.helper"
import useSWR from "swr"
import { BASE_STEIN_URL } from "common/config/env"
import {
  FishItemObjectType,
  FishListParamsType,
} from "modules/fish-list/types/fish-list.type"
import { thousandSeparator } from "common/helper/string.helper"

export default function useFishList(params?: FishListParamsType) {
  const url = `${BASE_STEIN_URL}/list${
    params ? `?${new URLSearchParams(params as Record<string, string>)}` : ""
  }`

  const { data, error } = useSWR(url)

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
