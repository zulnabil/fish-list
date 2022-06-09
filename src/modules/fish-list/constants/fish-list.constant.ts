export const DEFAULT_LIMIT = 15
export const DEFAULT_OFFSET = 130 // start with cleaner data
export const TOTAL_ITEMS = 270 // total items in the sheet
export const TOTAL_PAGE = Math.floor(
  (TOTAL_ITEMS - DEFAULT_OFFSET) / DEFAULT_LIMIT
)

export const COLUMNS = [
  {
    key: "komoditas",
    label: "Komoditas",
  },
  {
    key: "size",
    label: "Ukuran",
  },
  {
    key: "price",
    label: "Harga (Rp)",
  },
  {
    key: "tgl_parsed",
    label: "Tgl. diperbarui",
  },
]
