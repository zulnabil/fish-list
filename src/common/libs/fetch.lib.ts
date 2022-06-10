import axios from "axios"
import { BASE_STEIN_URL } from "common/config/env"

const options = {
  baseURL: BASE_STEIN_URL,
}

export const httpCall = axios.create(options)

const fetcher = (url: any) => httpCall.get(url).then((res) => res.data)

export default fetcher
