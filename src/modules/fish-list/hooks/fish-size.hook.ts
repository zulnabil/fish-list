import useSWR from "swr"

export default function useFishSize() {
  const path = `/option_size`

  const { data, error } = useSWR(path)

  return {
    optionSizes: data,
    isLoading: !error && !data,
    isError: error,
  }
}
