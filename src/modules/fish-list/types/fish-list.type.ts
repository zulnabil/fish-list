import { Nullable } from "common/types/common.type"

export type FishListParamsType = {
  limit?: number
  offset?: number
}

export type FishItemObjectType = {
  uuid: Nullable<string>
  komoditas: Nullable<string>
  area_provinsi: Nullable<string>
  area_kota: Nullable<string>
  price: Nullable<string>
  tgl_parsed: Nullable<string>
  timestamp: Nullable<string>
}
