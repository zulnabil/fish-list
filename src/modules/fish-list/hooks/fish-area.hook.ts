import useSWR from "swr"

export default function useFishArea(keyword?: string) {
  let searchParams

  if (keyword)
    searchParams = new URLSearchParams({
      search: JSON.stringify({ city: keyword }),
    } as Record<string, string>)

  const path = `/option_area${keyword ? `?${searchParams}` : ""}`

  const { data, error } = useSWR(path)

  return {
    optionAreas: data,
    isLoading: !error && !data,
    isError: error,
  }
}
